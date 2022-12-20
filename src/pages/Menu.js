import { async } from '@firebase/util'
import React from 'react'
import {GrLogout} from 'react-icons/gr'
import { Button ,Row,Col, Container ,FormGroup,Label,Input} from 'reactstrap'
import { Link, useNavigate  } from 'react-router-dom'
import { getAuth,deleteUser,signOut, onAuthStateChanged } from 'firebase/auth'
import {CgProfile} from 'react-icons/cg'
import {FaHome} from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Filters from '../components/Filters'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { toggleOpen } from '../store/auth'
import { setDoc,doc ,getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import {BsPlusSquare} from 'react-icons/bs'
import Createjob from '../components/Createjob'
import { Helmet } from 'react-helmet'
import { useState } from 'react'
import { createjoboperation } from '../store/auth'
import Jobslist from '../components/Jobslist'
import { getDatabase, ref, onValue,child,get} from "firebase/database";
import Carosel from '../components/Carosel'
import Newfavoritelist from '../components/Newfavoritelist'






function Menu() {

    const navigate = useNavigate()
    const dispatch=useDispatch()
    const auth = getAuth()
    // const [isopen,setisopen] =useState(false)
    const isopen = useSelector((state) => state.authh.createjobisopen);
    const [data,setdata]=useState("")
    const [jobdata,setjobdata]=useState([])

    

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
    
      const auth = getAuth()
      const docRef = doc(db, "users",auth.currentUser.uid );
      const docSnap = await getDoc(docRef);
      
      
      if (docSnap.exists()) {
       
        setdata(docSnap.data())
      
      } else {
        setdata("")
        
        // doc.data() will be undefined in this case
        
      }
      
          
        },100);
    
  
      });
      
  
    },[])

// const getdata= async ()=>{
  
// const docRef = doc(db, "users",auth.currentUser.uid );
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }
// }

const goesto= async ()=> {
  await setDoc(doc(db, "users", auth.currentUser.uid ), {
    first: "kelahmet",
    last: "Lovelace",
    born: 1815
  });
}
const yinele= async ()=> {
  const auth = getAuth()
  const docRef = doc(db, "users",auth.currentUser.uid );
  const docSnap = await getDoc(docRef);
  
  
  if (docSnap.exists()) {
    
    setdata(docSnap.data())
  
  } else {
    setdata("")
    
    // doc.data() will be undefined in this case
   
  }
  

}


  
//     }
  return (
    <div style={{
      

    }}>
       <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
    <div  style={{
        background:"white"//en dışkı sım 
        ,width:"100%",
        height:"100%"
       }}  className="position-absolute top-50 start-50 translate-middle  ">
        <Navbar style={{
          
        }}></Navbar>
        <div style={{marginTop:"3rem"}} className=' text-center'>
        <Carosel ></Carosel>
        </div>
      
        
        <div  className='position-absolute  start-50 translate-middle ' style={{
          background:"white",
            width:"85%",
            height:"85%",

           
            marginTop:"30rem"
            

        }}>
          <Row style={{
            background:"white"
            ,
            height:"100%",
            margin:"20px",
            marginRight:"30px"
          }}>
          <Col style={{
              background:"#171712",//category arka plan
              border: "1px solid black",
              borderRadius:"5px"
            }} sm="3"> <div style={{
              marginTop:"3rem"

            }} className=''><Button className='d-flex justify-content-center text-align-center' color='warning' outline  style={{
             
             
              
             
             
              width:"150px"


              
            
             
              
            
          }}  onClick={() => {dispatch(createjoboperation())
          yinele()}} >{ isopen ? (<p style={{marginTop:"7px"}}><BsPlusSquare style={{fontSize:"1.5rem"}}></BsPlusSquare> ilan oluştur</p>) : (<p style={{marginTop:"7px"}}><BsPlusSquare style={{fontSize:"1.5rem"}}></BsPlusSquare> filtrele</p>)} </Button></div>
          {!isopen  ?  <Createjob  persondata={data}></Createjob>   : <Filters ></Filters>}
          
          
          
          
          
          
          </Col>
          
          
            <Col style={{
              background:"#171712"//job offers background,,
              
            }} sm="9">
              <div style={{
               
                margin: "0.5rem",
                marginTop:"3rem"


              }}> <Jobslist  data={jobdata}></Jobslist>  </div>
            </Col>
            
         

</Row>






        </div> 



       
        
        </div>

    </div>
  )
}

export default Menu
