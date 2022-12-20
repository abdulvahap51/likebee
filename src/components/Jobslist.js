import React, { useEffect, useState } from "react";
import { arrayRemove, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, child, get } from "firebase/database";
import Jobcard from "./Jobcard";
import { async } from "@firebase/util";
import { Button } from "reactstrap";
import { collection, query, where } from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Masonry from "react-masonry-css";
import { useSelector, useDispatch } from "react-redux";
import { joblisthupidis } from "../store/filteroperation";
import { setfavoritejoblist } from "../store/filteroperation";
import Favoritejobcard from "./Favoritejobcard";

function Jobslist(props) {
  let arrray = [];
  const dispatch = useDispatch();
  const auth = getAuth();
  const joblist = useSelector((state) => state.filteropera.joblist);
  const [dataaa, setdataaa] = useState();
  const getthedata = async () => {
    const querySnapshot = await getDocs(collection(db, "joboffers"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots

      arrray.push({ ...doc.data(), id: doc.id });
      setdataaa(halve(arrray).reverse());
    });

    dispatch(joblisthupidis(arrray.reverse()));
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
  // const [jobs]=useCollectionData(collection(db,"joboffers"))
  function halve(x) {
    return x.filter((i, idx) => idx < Math.floor(x.length / 2));
  }
  useEffect(() => {
    getfavoritedataa();

    getthedata();
  }, []);

  return (
    <div style={{}}>
      <Masonry
        breakpointCols={2}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {joblist?.map((data) => (
          <Jobcard
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
          </Jobcard>
        ))}
      </Masonry>
    
    </div>
  );
}

export default Jobslist;
