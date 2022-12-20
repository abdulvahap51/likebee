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

function Newfavoritelist() {
    const auth = getAuth();
  
  const dispatch = useDispatch();
  const [favorlist,setfavorlist]=useState([])
  const [motherer,setmotherer]=useState([])
  const favoritelist = useSelector(
    (state) => state.filteropera.favoritejoblist
  );




let array2=[]
const favoritelistvalues = () => {
    let array =[]
    favoritelist.idler.map(async (data)=>{
        const docRef = doc(db, "joboffers", data);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          
          array.push(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
    })
array2=array
setmotherer(array2)

    


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







  useEffect(()=>{
    getfavoritedataa()
    setTimeout(() => {
        favoritelistvalues()
      
    }, 1000);

},[])






  return (
    <div>
        {motherer?.map((mother)=>{
            <h1>{mother.title}</h1>

        })}
      
    </div>
  )
}

export default Newfavoritelist
