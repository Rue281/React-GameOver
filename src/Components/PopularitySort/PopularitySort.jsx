import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
// import './RelevanceSort.css'

export default function PopularitySort() {
  let [gamesList,setGamesList] = useState([]);

  const tabContentDefaultState = {
    opacity: 0,
  }
  const cardDefaultState = {
    opacity: 0,
    y: 10,
      transition: {
        duration: 0.5
      }
  }

  const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2
      }
    },
    inactive: {
      display: "block"
    }
  };
  const cardVariant = {
    active: {
      opacity: 1,
      y: -100,
      transition: {
        duration: 0.5
      }
    },
    inactive: {
      opacity: 1,
      y: 10,
      transition: {
        duration: 0.5
      }
    }
  };
  

  useEffect(()=> {
    getAllGames();
  },[])

  async function getAllGames(){
    let config = {
      headers :{
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68'
      }
    }
    
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity`,config);

    console.log(data);
    setGamesList(data);
  }
  return (
    <motion.div
    // role="tabpanel"
    // id={id}
    className="popularitySort container pt-5"
    // variants={tabContentVariant}
    animate={{opacity:1}}

    transition={{staggerChildren: 0.2}}
    initial={tabContentDefaultState}
  >
    {/* <div className="container"> */}
      <div className="row cards g-4">
        {gamesList.map((item, index) => (
          <motion.div key={index} className=" col-md-4 content-card "
          animate = {{opacity: 1,
            y: 0,
            transition: {
              duration: 0.5
            }}}
          initial={cardDefaultState}
          exit={cardDefaultState}>
            <img className='rounded-3' src={item.thumbnail} alt="view of mountain" />
            <div className="info">
              <h3>{`${item.title}`}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    {/* </div> */}
  </motion.div>
  )
}
