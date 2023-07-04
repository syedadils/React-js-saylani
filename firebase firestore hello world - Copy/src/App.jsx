  import './App.css';
  import logo from './logo.png'
  import avatar from './avatar.png'
  import { useState, useEffect } from 'react';
  import moment from 'moment';
  import { initializeApp } from "firebase/app";
  import { useFormik } from 'formik';
  import * as yup from 'yup';

  import { getFirestore, 
          collection, addDoc, 
          getDocs, doc, 
          onSnapshot, query, 
          serverTimestamp, 
          orderBy ,deleteDoc,
          updateDoc  } 
          from "firebase/firestore";




  const firebaseConfig = {
    apiKey: "AIzaSyDq8qbztqxlSfFOr_Rw_AXxQrwGUUxVrN0",
    authDomain: "helloworldfirebase-92822.firebaseapp.com",
    projectId: "helloworldfirebase-92822",
    storageBucket: "helloworldfirebase-92822.appspot.com",
    messagingSenderId: "630287988347",
    appId: "1:630287988347:web:a4acc1b9f489c35a9b14de",
    measurementId: "G-58SGHTE78Q"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);



  function App() {

    const [posts, setPosts] = useState([]);
    const [postText, setPostText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    // const [isEditing, setIsEditing] = useState(null);
    // const [editingText, setEditingText] = useState("");

    const [editing, setEditing] = useState({
      editingId: null,
      editingText: ""
    })


    const formik = useFormik({
      initialValues: {
        title: "",
        text: "",
      },
      validationSchema: yup.object({
        title: yup
          .string('Enter Title')
          .required('Title is requird')
          .max(20, "limit exceed : 20 Characters")
          .min(5, 'Please enter atleast 5 character in post title'),

        text: yup
          .string('Please enter your post text')
          .max(300, 'limilt exceed: 300 Characters')
          .min(10, 'Please enter atleast 10 character in post title')
          .required('Post text is required'),
          
      }),

      onSubmit: async (values) => {
        console.log("value: ", values);
        
   try {
    const docRef = await addDoc(collection(db, "posts"), {
      title: values.title,
      text: values.text,
      // createdOn: new Date().getTime(),
      createdOn: serverTimestamp(),

    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
      },
    });





    useEffect(() => {

    let unsubscribe = null;
    const getrealtimeData = async () => {
      
      const q = query(collection(db, "posts"), orderBy("createdOn", "desc"));
      unsubscribe = onSnapshot(q, (querySnapshot) => {
    const posts = [];

    
    querySnapshot.forEach((doc) => {
        // posts.push(doc.data());
        
        // let data = doc.data();
        // data.id = doc.id;
        
        
        // posts.push(data);


        posts.push({ ...doc.data(), id: doc.id});

    });

    setPosts(posts);
    console.log("posts: ", posts);
  });

  }
    getrealtimeData();
    
    return () => {

      console.log("cleanUp function");
      unsubscribe();
    }

    }, [])



    const savePost = async (e) => {
      e.preventDefault();

    console.log("postText: ", postText);

    
    
    
    }

    const deletePost = async (postId) => {

      // console.log("postId: ", postId);

      await deleteDoc(doc(db, "posts", postId));
      
    }

    const updatePost = async (e) => {
      e.preventDefault();

      await updateDoc(doc(db, "posts", editing.editingId), {
        text: editing.editingText
      });

      setEditing({
        editingId: null,
        editingText: ""  
      })

    }



    return (
      <div className='content'>

  <div className='head'>
      <img src={logo} alt="logo" height={70} /><h1 className='logo'>facebook</h1>
      </div>

        <form className='f1' onSubmit={formik.handleSubmit}>

          <div className='post-bar'>
              <img className='dp' src={avatar} alt="profile img" height={40} />

            
          Title:
          <input 
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            placeholder="Title"
          />
           
          {
            (formik.touched.title)
              ?
          <span style={{color: 'red'}}>{formik.errors.title}</span>
              :
              null
          }

          <br />
          
          
          Text:
          <textarea
          type="text" 
          name='text'
          value={formik.values.text}
          onChange={formik.handleChange}
          placeholder="What's in your mind..." 
          />
       <span style={{color: 'red'}}>
        {formik.touched.text && formik.errors.text}
       </span>

              <div className="btn">
                <button className='b1' type='submit'>Post</button>
              </div> 
          
      </div>
          

        </form>

        <div className='content'>

          <div className='loader'>
          {(isLoading) ? "Loading..." : ""}
          </div>

          {posts.map((eachPost, i)=> (
            <div className='post' key={i}>

              <h2>{eachPost.title}</h2>

              <p
                className="tittle"
                href={eachPost.url}
                target="_blank" rel='noreferrer'
                >
                { (eachPost.id === editing.editingId) ? 
                <form onSubmit={updatePost}>
                  
                  <input 
                    type="text" 
                    value={editing.editingText} 
                    onChange={(e) => {
                      setEditing({ 
                        ...editing,
                        editingText: e.target.value
                      })
                    }}
                    placeholder="please enter updated value" />
                    <button className='b2' type='submit'>Update</button>
                </form>
                : 
                eachPost?.text}
              </p>

              <span>{

            moment(
              (
                eachPost?.createdOn?.seconds) ? eachPost?.createdOn?.seconds * 1000
                :
                undefined)
              .format('Do MMMM, h:mm: a')
              
            }</span>

            <br />
            <br />

            {/* delete button function */}

            <button className='btns' onClick={ () => {
              
              deletePost(eachPost?.id)

            }}><i class="fa-solid fa-trash-can" ></i></button>

            {/* edit button function */}

            {(editing.editingId === eachPost.id) ? null :
              <button className='btns' onClick={() => {

              setEditing ({
                editingId: eachPost?.id,
                editingText: eachPost?.text
              })
              
              }}><i class="fa-solid fa-pencil"></i></button>
            }
            
          </div>))}
        </div>

      </div>
    );
  }

  export default App;
