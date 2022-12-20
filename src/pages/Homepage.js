import React from 'react'
import { getAuth ,onAuthStateChanged} from 'firebase/auth'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Getinfo from '../components/Getinfo';
import { getDatabase, ref, child, get } from "firebase/database";
import { Audio } from 'react-loader-spinner'
import { useDispatch } from 'react-redux';
import { setinfo } from '../store/auth';
import { useNavigate } from 'react-router-dom';
import { toggleOpen } from '../store/auth';
import { doc,getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Homepage() {
  
  const [value,setvalue] = useState();
  const [name,setname]= useState();
  const [phoneNumber,setphoneNumber]= useState();
  const auth= getAuth();
  const dispatch=useDispatch()
  const navigate=useNavigate()
  
  
  const personinfo = useSelector((state) => state.authh.infos);
  useEffect(()=>{
    
   
    
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        dispatch(toggleOpen(true))
        
        // ...
      } else {
        dispatch(toggleOpen(false))
        // User is signed out
        // ...
      }

    });
    setTimeout(async() => {
      // const dbRef = ref(getDatabase());
// get(child(dbRef, `usersinfos/${auth.currentUser.uid}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//     console.log(snapshot.val());
//     setname(snapshot.val())
//     dispatch(setinfo(snapshot.value))
//     setvalue("merhaba")
//   } else {
//     setname("")
//     setvalue("merhaba")
//     console.log("No data available");
    
//   }
// }).catch((error) => {
//   console.error(error);
// });

  
  const docRef = doc(db, "users",auth.currentUser.uid );
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    
    setname(docSnap.data())
    setvalue("merhaba")
  } else {
    setname("")
    setvalue("merhaba")
    // doc.data() will be undefined in this case
   
  }
  
    
    },1000);

  },[])

  return (
    <div>
     { !value ? (<div  style={{
    background:"#E6E6FA"
    ,width:"100%",
    height:"100%"
   }} className="position-absolute top-50 start-50 translate-middle"><div className="position-absolute top-50 start-50 translate-middle"><Audio
   
   height="200"
   width="200"
   radius="9"
   color="#323232"
   ariaLabel="loading"
   wrapperStyle
   wrapperClass
 /></div></div>):(<div>{name ? (navigate("/menu")):(<Getinfo></Getinfo>)}</div>)}


      









































































    </div>
    )

 



}

export default Homepage
