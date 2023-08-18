import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom';

export default function BattleRoyaleCategory({id,active}) {
  let[gamesList,setGamesList] = useState([]);

  const tabContentVariant = {
    active: {
      display: "block",
      transition: {
        staggerChildren: 0.2
      }
    },
    inactive: {
      display: "none"
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
        duration: 0.5
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
    
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=battle-royale`,config);

    console.log(data);
    setGamesList(data);
  }
  return (
    <motion.div
    role="tabpanel"
    id={id}
    className="tab-content"
    variants={tabContentVariant}
    animate={active ? "active" : "inactive"}
    initial="inactive"
  >
    <div className="container">
      <div className="row cards g-4">
        {gamesList.map((item, index) => (
          <motion.div key={index} className=" col-md-4 content-card "
          variants={cardVariant}>
            <NavLink to={"/gameDetails/"+item.id} className="card">
            <img className='rounded-3' src={item.thumbnail} alt="view of mountain" />
            <div className="info layer">
              <h3>{`${item.title}`}</h3>
            </div>
            </NavLink>
          </motion.div>
        ))}
      </div>
    </div>
  </motion.div>
  )
}
