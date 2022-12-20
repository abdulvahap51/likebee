import React ,{useState}from "react";
import { doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { setfavoritejoblist } from "../store/filteroperation";
import Favoritejobcard from "./Favoritejobcard.js";
import { useEffect } from "react";
import Masonry from "react-masonry-css";
import Jobslist from "./Jobslist";
import { favoritejoblistdetailes } from "../store/filteroperation";
import { sharejobid } from "../store/filteroperation";
import Ownjobcard from "./Ownjobcard";

function Ownjoblist() {
  const auth = getAuth();
  
  const dispatch = useDispatch();
  const [favorlist,setfavorlist]=useState([])
  const [mother,setmother]=useState([])
  const [favor,setfavor]=useState([])
  const favoritelist = useSelector(
    (state) => state.filteropera.sharejobids
  );
  


// const getdata =async (data) =>{
    // const docRef = doc(db, "joboffers", data);
    // const docSnap = await getDoc(docRef);

    // if (docSnap.exists()) {
      
    //   arrayy.push(docSnap.data());
    // } else {
    //   // doc.data() will be undefined in this case
    //   console.log("No such document!");
    // }
// }


useEffect(()=>{
    getfavoritedataa()
    
        favoritelistvalues()
     setTimeout(() => {
      setfavor(favoritelist.idler)
     }, 300);

},[])
let array2 =[]
  const favoritelistvalues = () => {
    let array =[]
    if(favoritelist.idler === null){array2=[]
    
  }
    else{
      
      
      favoritelist.idler.map(async (data)=>{
      const docRef = doc(db, "joboffers", data);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        
        array.push(docSnap.data());
      } else {
        // doc.data() will be undefined in this case
       
      }
  })}
    
array2=array

    setTimeout(() => {
      setmother(array2)
      dispatch(favoritejoblistdetailes(array2))
    }, 1500);


  };

   const  getfavoritedataa = async () => {
    const docRef = doc(db, "ownjobs", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      dispatch(sharejobid(docSnap.data()));
      // setfavorite(docSnap.data());
    } else {
      // doc.data() will be undefined in this case
    }
  };

  return <div>

{mother ? (<div>
        {/* {mother.map((dataa) => (
          <h1>{dataa.title}</h1>
        ))} */}
        <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {mother?.map((data) => (
          <Ownjobcard
            title={data.title}
            uid={data.jobuid}
            description={data.description}
            username={data.jobusername}
            country={data.country}
            city={data.city}
            phonenumber={data.jobphonenumber}
            categories={data.categories}
          >
            {" "}
          </Ownjobcard>
        ))}
      </Masonry>
    </div>  ):(<div><h1>dont have favorite</h1></div>)}
  </div>;
}

export default Ownjoblist;
