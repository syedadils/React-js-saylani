import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Post = (props) => (
    <div className="display">
        <div className="mainDiv">
            <div className="profile">
                <div className="profileimg">
                    <img src={props.img} alt="" width={40} height={40} />
                </div>
                <div className="profiletittle">
                    <span>{props.author}</span>
                    <span className="time">{props.time}</span>
                </div>
            </div>
            <div className="postrdescription">
                <p>{props.description}</p>
            </div>
            <div className="postimg">
                <img src={props.img} width={675} height={260} />
            </div>
            <div className="likeShow"></div>
        </div>
    </div>

)

let Display = () => (
     (
        
        <div>
            <Post author="Vishwam Sankaran"
                description="SpaceX has reportedly written to US Pentagon asking the US military to cover its satellite internet costs in Ukraine"
                img="https://static.independent.co.uk/2022/10/15/20/GettyImages-1243505882.jpg?quality=75&width=1200&auto=webp"
                time="2022-10-14"
            />
            <Post author="SPHERICAL INSIGHTS LLP"
                description="In 2021, the size of the Global Automotive Power Window Market was estimated to be USD 12.13 billion and the market is anticipated to increase by 4.1% CAGR during the forecast period that is 2021 to 2030. Companies Covered:Aisin Seiki(Japan), Grupo Antolin(Sp…"
                img= "https://ml.globenewswire.com/Resource/Download/b27a94e8-407e-46ae-a5c2-47bb2a1c8a2e?size=1"
                time="2022-10-14"
            />
            <Post author="TechRadar"
                description="Sound quality is king when it comes to headphones and that's a fact – an inescapable one which pains me given the sonic mediocrity of some otherwise beautiful audio products. But wouldn't it be nice …"
                img="https://cdn.mos.cms.futurecdn.net/mjhqLhJQqkxhNLYkGg8ib9-1200-80.jpg"
                url= "https://www.techradar.com/news/beyerdynamics-new-wireless-earbuds-are-high-end-audible-jewelry-and-i-need-them"
                time="2022-10-14"
            />
            <Post author="Pypi.org"
                description="Ready, Steady, Go!\r\nIts fall 2022, and for the first time in years, buying a GPU for Deep\r\nLearning experiments does not sound too crazy.\r\nNow, how do we pick one?\r\nKeep in mind, performance depends …"
                img="https://pypi.org/static/images/twitter.6fecba6f.jpg"
                url="https://pypi.org/project/ready-steady-go/"
                time="2022-10-14"
            />
            <Post author="Chloe Taylor"
                description="Elon Musk has said it is unreasonable to expect SpaceX to provide its Starlink internet service in Ukraine indefinitely amid reports the company asked the Pentagon to foot the half-a-billion-dollar b… "
                img="https://content.fortune.com/wp-content/uploads/2022/10/GettyImages-1242798333-1-1-e1665751309936.jpg?resize=1200,600"
                url="https://fortune.com/2022/10/14/elon-musk-unreasonable-for-spacex-to-continue-funding-ukraine-starlink/"
                time="2022-10-14"
            />
            <Post author="Radiant Offshore Consultancy LLP"
                description="Energy Storage Systems market is expected to reach 440.71 GW in 2028, growing at a CAGR of 11.1% during 2022- 2028, reports Stratview Research. Energy Storage Systems market is expected to reach 440.71 GW in 2028, growing at a CAGR of 11.1% during 2022- 2028,…"
                img="https://ml.globenewswire.com/Resource/Download/0b13b3bb-ce12-4d7e-b698-1d1a9fe7f607?size=1"
                url="https://www.globenewswire.com/news-release/2022/10/14/2534728/0/en/Energy-Storage-System-Market-demand-is-Projected-to-Reach-440-71-GW-in-2028.html"
                time="2022-10-14"
            />
        </div>
    )
)

ReactDOM.render(<Display />, document.querySelector("#root"));