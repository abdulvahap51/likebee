import React from 'react'
import { Button, Col, Row ,Card,CardBody,CardTitle,CardSubtitle,CardText,CardLink,Collapse} from 'reactstrap'
import {CgClose} from  "react-icons/cg"
import { useState } from 'react';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc ,setDoc ,addDoc,updateDoc,arrayRemove,arrayUnion,deleteDoc} from "firebase/firestore";
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { deletefavoritejoblist, setfavoritejoblist } from '../store/filteroperation';
import { favoritejoblistdetailes } from '../store/filteroperation';
import {AiFillDelete} from "react-icons/ai"
 import alertify from 'alertifyjs';
 import { ToastContainer, toast } from 'react-toastify';




function Ownjobcard(props) {
  const auth =getAuth()
  const dispatch =useDispatch()
  const [ackapa,setackapa]= useState(false)
  const favoritelist =useSelector((state) => state.filteropera.favoritejoblist)
  const setdocument= async (item) => {
   
const washingtonRef = doc(db, "ownjobs", auth.currentUser.uid);

// Atomically add a new region to the "regions" array field.try {
  await updateDoc(washingtonRef, {
    idler: arrayRemove(item)
})


// Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//     regions: arrayRemove("east_coast")
// });
    
  }
 
  let array2 =[]
  const favoritelistvalues = () => {
    let array =[]
    favoritelist.idler.map(async (data)=>{
        const docRef = doc(db, "joboffers", data);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          
          array.push(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
       
        }
    })
array2=array

    setTimeout(() => {
      
      dispatch(favoritejoblistdetailes(array2))
    }, 1000);


  };



  const getfavoritedataa = async () => {
    const docRef = doc(db, "ownjobs", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(setfavoritejoblist(docSnap.data()));
      // setfavorite(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const [favorite,setfavorite] = useState("")
  

  const toggle = () => setIsOpen(!isOpen); 
  
  const deletejob= async (item) => {
    await deleteDoc(doc(db, "joboffers", item));
  }

  const deletetofavorite = ()=> {
    
    
    
      
        // let array=favorite.ids
        // const sayi1=props.uid
        // array.push({array,sayi1})
        // setdocument(array)
        
        setdocument(props.uid)
       
        deletejob(props.uid)
        
        setTimeout(() => {
          getfavoritedataa()
          setackapa(true)
        }, 300);
        setTimeout(() => {
          favoritelistvalues()
        }, 100);
    
     
      
       
        
      
      
    

    

  }
  return (
    <>
    {!ackapa  ?  (<div   style={{
      
    }} >
     <Card
  style={{
    width: '100%',
    background:"#E6E6FA"
  }}
>
  <CardBody>
    <CardTitle tag="h5">
      {props.title}
     
      
    </CardTitle>
    
 
    <CardText>
     
      {props.country} <b>/</b> {props.city}
      <br></br>
      
      <b>category</b> : <b>{props.categories}</b>
    </CardText>
    {/* <CardLink href="#">
      Card Link
    </CardLink>
    <CardLink href="#">
      Another Link
    </CardLink> */}
    <Button style={{
      marginLeft:"5px",
      marginTop:"5px",
      width:"70px"
    }} onClick={()=> {
      alertify.confirm('emin misin', 'ilanı silmek istediğinden eminmisin', function(){ deletetofavorite() 
      alertify.success("ilan başarıyla silindi") }
                , function(){alertify.warning("işlem iptal edildi") });
    }} color='danger'><AiFillDelete></AiFillDelete></Button>
    <Button onClick={toggle}  style={{
      marginLeft:"5px",
      marginTop:"5px",
      width:"70px"
    }}>incele</Button>
    <Collapse isOpen={isOpen} >
      <hr></hr>
    <CardText>
      <b>açıklama : </b>
      
      {props.description}
    </CardText>
    <hr></hr>
    <CardTitle>

      {props.username}
      <br></br>
      iletişim : {props.phonenumber}</CardTitle>
    </Collapse>
  </CardBody>
</Card>
      
    </div>)  :  (null)}
    </>
  )
}

export default Ownjobcard
