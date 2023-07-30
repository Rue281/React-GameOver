import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import './AllGames.css'
import './AllGamesResponsive.css'
import {getGameDetails} from '../../utils.js'
// import {useFetchGameDetails} from '../../utils.js'
import {NavLink, useNavigate } from 'react-router-dom'

export default function AllGames({userData}) {
  let [gamesList,setGamesList] = useState([]);
  const navigate = useNavigate();

  const tabContentDefaultState = {
    opacity: 0
  }
  const cardDefaultState = {
    opacity: 0,
    y: 10,
      transition: {
        duration: 0.5
      }
  }

  
  
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
    
    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/games`,config);

    console.log(data);
    setGamesList(data);
  }
  return (
    
    <motion.div
    className="allGames container pt-5"
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
          exit={cardDefaultState}
          
          >
            <NavLink to="/gameDetails" onClick={()=>{
            getGameDetails(item.id)
          }}>
            <img className='rounded-3' src={item.thumbnail} alt="view of mountain" />
            <div className="info">
              <h3>{`${item.title}`}</h3>
            </div>
            </NavLink>
          </motion.div>
          
        ))}
      </div>
    {/* </div> */}
  </motion.div>
  
  )
}
