import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function ProtectedRoutes({Component}) {
    const navigate = useNavigate()

    useEffect(()=>{
        let checklogin = localStorage.getItem("Token")
        

        if (!checklogin){
            navigate("/")
        }
    },[])
  return (
    <div>
        <Component />
    </div>
  )
}

export default ProtectedRoutes