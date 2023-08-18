import React from 'react'
import './Home.css'
import banner from '../../assets/banner.jpg'
import { useNavigate } from 'react-router-dom'
import './HomeResponsive.css'

export default function Home({userData}) {
  let navigate = useNavigate();
  return (
    <div className='home-container'  >
      <div className="text m-auto text-center">
          <h3>GAMEWORLD DISTRIBUTORS</h3>
          <h1>FORGE YOUR PATH TO VICTORY WITH GAMER</h1>
          <p>With Gamer, immerse yourself in a world of endless possibilities. Our innovative gaming technology is designed to take your gaming experience to new heights. Join the Gamer community today and explore your true gaming potential.</p>
          {/* when a user signin hide registration button */}
          {!userData ? <button className='btn px-4 mt-5 rounded-pill registerBtn' onClick={()=>{navigate('/signup')}}>Become a member for free!</button> : ""}
          
        </div>
      <div className='overlay d-flex'>
      </div>
    </div>
  )
}
