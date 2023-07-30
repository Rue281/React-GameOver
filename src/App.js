import React, { useEffect, useState } from 'react'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx'
import Home from './Components/Home/Home.jsx'
import AllGames from './Components/AllGames/AllGames.jsx'
import AllPlatforms from './Components/AllPlatforms/AllPlatforms.jsx'
import AllCategories from './Components/AllCategories/AllCategories.jsx'
import NotFound from './Components/NotFound/NotFound.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Signin from './Components/Signin/Signin.jsx'
import jwtDecode from 'jwt-decode'
import ProtectedRouting from './Components/ProtectedRouting.jsx'
import Forgetpassword from './Components/ForgetPassword/Forgetpassword.jsx'
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import tabs from './Components/AllCategories/tabs.js'
import platformsTabs from './Components/AllPlatforms/platformsTabs.js'
import RelevanceSort from './Components/RelevanceSort/RelevanceSort.jsx'
import ReleaseDateSort from './Components/ReleaseDateSort/ReleaseDateSort.jsx'
import PopularitySort from './Components/PopularitySort/PopularitySort.jsx'
import AlphabeticalSort from './Components/AlphabeticalSort/AlphabeticalSort.jsx'
import GameDetails from './Components/GameDetails/GameDetails.jsx'

export default function App() {
  //to send user data between signup & signin
  let[userData,setUserData] = useState(null);

  useEffect(()=>{
    if(localStorage.getItem("token")){
      let decodedData = jwtDecode(localStorage.getItem("token"));
      console.log(decodedData);
      saveUserData(decodedData)
    }
  },[])

  function saveUserData(data){
    console.log(data);
    setUserData(data);
  }

  // function ProtectRouting(props){
  //   if(localStorage.getItem("token")){
  //     console.log(props.children)
  //     return props.children
  //   }else{
  //     return <Navigate to="/signin"/>
  //   }
  // }

  //logout
  function logout(){
    localStorage.removeItem("token");
    setUserData(null);
    return <Navigate to="/signin"/>
  }

  let routes = createBrowserRouter([
    {path:"/",element:<Layout userData = {userData} logout = {logout}/>,children:[
      {index:true,element:<Home/>},
      {path:"allGames",element:<ProtectedRouting><AllGames userData = {userData}/></ProtectedRouting>},
      {path:"allPlatforms",element:<ProtectedRouting><AllPlatforms platformsTabs={platformsTabs}/></ProtectedRouting>},
      {path:"allCategories",element:<ProtectedRouting><AllCategories tabs={tabs}/></ProtectedRouting>},
      {path:"relevanceSort",element:<ProtectedRouting><RelevanceSort/></ProtectedRouting>},
      {path:"releaseDateSort",element:<ProtectedRouting><ReleaseDateSort/></ProtectedRouting>},
      {path:"popularitySort",element:<ProtectedRouting><PopularitySort/></ProtectedRouting>},
      {path:"alphabeticalSort",element:<ProtectedRouting><AlphabeticalSort/></ProtectedRouting>},
      {path:"gameDetails",element:<ProtectedRouting><GameDetails/></ProtectedRouting>},
      {path:"*",element:<NotFound/>},
      {path:"signup",element:<Signup saveUserData = {saveUserData}/>},
      {path:"signin",element:<Signin saveUserData = {saveUserData}/>},
      {path:"forgetPassword",element:<Forgetpassword/>},
      {path:"resetPassword",element:<ResetPassword/>}
    ]}
  ])
  return (
    <RouterProvider router={routes}/>
  )
}
