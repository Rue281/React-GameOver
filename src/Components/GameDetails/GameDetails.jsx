import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import CoverflowEffect from './CoverflowEffect';
import './GameDetails.css'
import './GameDetailsResponsive.css'

export default function GameDetails() {
  //to recieve id from url
  let {id} = useParams();
  console.log(id);

  let [gameDetails,setGameDetails] = useState();

  useEffect(()=>{getGameDetails()},[]);

  async function getGameDetails(){

    let config = {
      headers :{
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68'
      }
    }

    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,config);

    console.log(data);
    setGameDetails(data);
    return data;
  }

  // if(gameDetails != null){
  //   Object.keys(gameDetails.screenshots[1]).map(item => (
  //     console.log([item,gameDetails[item]])
  //   ));
  // }else{
  //   return false;
  // }
  
  // console.log(typeof(gameDetails));



  return (
    <div className="row">
      
      {gameDetails? <>
        <div className="col-md-4">
          <img src={gameDetails.thumbnail} alt="game banner"/>
          <Link to={gameDetails.game_url} target='_blank' className='gameWebsite'>
            <button className='playBtn btn rounded-pill mt-3'>
              Play now
            </button>
          </Link>
          
          
        </div>
        <div className="col-md-8">
          <h1>{gameDetails.title}</h1>
          <p>{gameDetails.description}</p>
          <h2>{gameDetails.title} Screenshots</h2>

          <CoverflowEffect shots={gameDetails.screenshots}className="mb-5"></CoverflowEffect>
          <h2>Additional Information</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="row">
                <h5>Title</h5>
                <p>{gameDetails.title}</p>
              </div>
              <div className="row">
              <h5>Release Date</h5>
                <p>{gameDetails.release_date}</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <h5>Developer</h5>
                  <p>{gameDetails.developer}</p>
                </div>
                <div className="row">
                <h5>Genre</h5>
                  <p>{gameDetails.genre}</p>
                </div>
            </div>
            <div className="col-md-4">
            <div className="row">
              <h5>Publisher</h5>
                <p>{gameDetails.publisher}</p>
              </div>
              <div className="row">
              <h5>Platform</h5>
                <p>{gameDetails.platform}</p>
              </div>
            </div>
          </div>

        </div>
      </> : ""}
      
    </div>
  )
}
