import React from "react";
import { Col, Container, Row, Button } from "reactstrap";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Audio } from "react-loader-spinner";
import { db } from "../firebase";
import Favoritelist from "../components/Favoritelist";
import Favoritejobcard from "../components/Favoritejobcard";
import { setfavoritejoblist } from "../store/filteroperation";
import { useDispatch,useSelector } from "react-redux";
import Masonry from "react-masonry-css";
import Jobcard from "../components/Jobcard";
import { favoritejoblistdetailes } from "../store/filteroperation";
import Newfavoritelist from "../components/Newfavoritelist";
import { Helmet } from 'react-helmet'
import {ImHeart} from  "react-icons/im"
import {MdHomeWork} from  "react-icons/md"
import Ownjoblist from "../components/Ownjoblist";




function Profile() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [show, setshow] = useState(false);
  const [showother, setshowother] = useState(false);
  const favoritelist = useSelector(
    (state) => state.filteropera.favoritejoblist
  );
    const dispatch =useDispatch()

  const getprofiledata = async () => {
    const docRef = doc(db, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      
      setUser(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      
    }
  };

  useEffect(() => {
    getprofiledata();
    setTimeout(() => {
      setshow(true)
    }, 500);
    getfavoritedataa()
    setTimeout(() => {
        favoritelistvalues()
    }, 500);
  }, []);
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
    
    



  };

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

  return (<div>
    {show ? (<div
      style={{
        background: "#F5F5F5",
        width: "100%",
        height: "100%",
      }}
      className="position-absolute top-50 start-50 translate-middle"
    >
      <Helmet>
                <style>{'body { background-color: white; }'}</style>
            </Helmet>
      <Navbar></Navbar>
      <Container>
        <Row
          style={{
            marginTop: "50px",
          }}
        >
          <div className="text-center" style={{
            width: "100%",
            height:"70px",
            
          }}>


            <Button onClick={()=> setshowother(false)} style={{
              width:"100px",
              height:"60px",
              marginRight:"20px"
            }} color="danger" outline><ImHeart></ImHeart></Button>
            <Button onClick={()=> setshowother(true)} outline style={{
              width:"100px",
              height:"60px",
              marginLeft:"20px"
            }} color="dark"><MdHomeWork></MdHomeWork></Button>
          </div>
          
         
          <hr style={{
            marginTop:"10px"
          }}></hr>
          {!showother ? (<Favoritelist></Favoritelist>) : (<Ownjoblist></Ownjoblist>)}
          
        </Row>
      </Container>
  </div>) : (<div  style={{
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
   /></div></div>)}
    </div>
  );
}

export default Profile;
