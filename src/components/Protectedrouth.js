import React from 'react'
import { Navigate } from 'react-router-dom';
 import { useDispatch,useSelector } from "react-redux";
import { Children } from 'react';
import { getAuth } from 'firebase/auth';
import { useEffect } from 'react';

function Protectedrouth({children}) {
const auth =getAuth();
     const isopen = useSelector((state)=> state.authh.isopen)
     const user=auth.currentUser
    
      if (!user) {
        return <Navigate to={"/"} replace />;
        
      }
     
    
    
   

      return children
}

export default Protectedrouth
