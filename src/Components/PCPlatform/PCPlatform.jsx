import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion,AnimatePresence,useAnimationControls } from "framer-motion";

export default function PCPlatform({id,active}) {
  let[gamesList,setGamesList] = useState([]);
  // const transition = { staggerChildren:0.2 };


  // const controls = useAnimationControls()
  // useEffect(()=>{
  //   controls.start(()=>({
  //         display: "block",
  //         transition: {
  //           staggerChildren: 0.2
  //       }
  //   }))
  // },[])

  const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2
      }
    },
    inactive: {
      display: "none"
    },
    exit:{
      transition: { staggerChildren: 0.1 }
    }
  };
  const cardVariant = {
    active: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    },
    inactive: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.5,
        
      }
    }
  };
  useEffect(()=> {
    getAllGames();
  },[]);

  
  async function getAllGames(){
    let config = {
      headers :{
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68'
      }
    }
    
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?platform=pc`,config);

    console.log(data);
    setGamesList(data);
  }
  return (
        <motion.div
    role="tabpanel"
    id={id}
    // key={transition}
    className="tab-content"
    variants={tabContentVariant}
    animate={active ? "active" : "inactive"}
    initial="inactive"
    exit =  "exit"
    
  >
    {gamesList ? <div className="container">
      <div className="row cards g-4">
        {gamesList.map((item, index) => (
          <motion.div key={index} className=" col-md-4 content-card "
          variants={cardVariant}
          >
            <img className='rounded-3' src={item.thumbnail} alt="view of mountain" />
            <div className="info">
              <h3>{`${item.title}`}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div> : ""}
    
  </motion.div>
    
  )
}
