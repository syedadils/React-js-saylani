import React from 'react'
import avatar from './avatar.png'




const Body = () => {
  return (
    <div className='main'>
        <div className='post-bar'>
            <img src={avatar} alt="profile img" height={40} />
              <input type="text" placeholder="What's in your mind ?" />
            <div className="btn">
              <button className='b1'>Post</button>
            </div> 
        </div>


        
    </div>
  )
}

export default Body