import { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom'


export const useFetchGameDetails = () =>{
    
    const [data, setData] = useState(null); 
    let navigate = useNavigate();
    // async function getGameDetails(){
    //     let config = {
    //       headers :{
    //         'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
    //         'x-rapidapi-key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68'
    //       }
    //     }
    
    //     let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,config);
    
    //     console.log(data);
    //     return data;
    //   }
    //   setData(getGameDetails(id));
      navigate('.gameDetails');

} 
// export function goToComponent(){
//     let navigate = useNavigate();
// }

export async function getGameDetails(id){

    let config = {
      headers :{
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com',
        'x-rapidapi-key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68'
      }
    }

    let {data} = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,config);

    console.log(data);
    return data;
  }