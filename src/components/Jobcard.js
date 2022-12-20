import React from 'react'
import { Button, Col, Row ,Card,CardBody,CardTitle,CardSubtitle,CardText,CardLink,Collapse} from 'reactstrap'
import {ImHeart} from  "react-icons/im"
import { useState } from 'react';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { doc, getDoc ,setDoc ,addDoc,updateDoc,arrayRemove,arrayUnion} from "firebase/firestore";
import { useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setfavoritejoblist } from '../store/filteroperation';
import alertify from 'alertifyjs';




function Jobcard(props) {
  const auth =getAuth()
  const dispatch =useDispatch()
  const favoritelist =useSelector((state) => state.filteropera.favoritejoblist)
  const setdocument= async (item) => {
   
const washingtonRef = doc(db, "favorites", auth.currentUser.uid);

// Atomically add a new region to the "regions" array field.try {
  await updateDoc(washingtonRef, {
    idler: arrayUnion(item)
})


// Atomically remove a region from the "regions" array field.
// await updateDoc(washingtonRef, {
//     regions: arrayRemove("east_coast")
// });
    
  }
  const addarray = async ()=>{
    await setDoc(doc(db, "favorites", auth.currentUser.uid), {
     idler:{}
    });
  }
  const getfavoritedataa = async () => {
    const docRef = doc(db, "favorites", auth.currentUser.uid);
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

  const addtofavorite = ()=> {
    
   
     
      if(favoritelist === ""){
      addarray()
      setTimeout(() => {
        setdocument(props.uid)
        
        getfavoritedataa()
        alertify.success("favorilere eklendi")
      }, 500);
       
        
      }else{
        // let array=favorite.ids
        // const sayi1=props.uid
        // array.push({array,sayi1})
        // setdocument(array)
        
        setdocument(props.uid)
       
        getfavoritedataa()
        alertify.success("favorilere eklendi")
    
     
          
       
        
      }
      
    

    

  }
  return (
    <div   style={{
      
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
    }} onClick={addtofavorite} color='danger'><ImHeart></ImHeart></Button>
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
      
    </div>
  )
}

export default Jobcard
