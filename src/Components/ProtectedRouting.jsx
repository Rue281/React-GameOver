import React from 'react'
import { Navigate }from 'react-router-dom'

export default function ProtectedRouting(props) {
    if(localStorage.getItem("token")){
        console.log(props.children)
        return props.children
      }else{
        return <Navigate to="/signin"/>
      }
}
