// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged,getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { toggleOpen } from "./store/auth";
import { getFirestore } from "firebase/firestore";



// import {getAuth ,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  // "!!!!!!!!!!!!!!!!!!!!!!!!!önemli!!!!!!!!!!!!!!!!!!!!!!!!!!!"
  // buraya firebase keylerinizi ekleyin
  // ve firebasede açmış oldugunuz projede email/password ve google ile girişi aktif edin ve  firebase firestore aktif edin
};

// Initialize Firebase


 const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

 export const db = getFirestore(app);


// export const signin = async (email, password) => {
    
//     const auth=getAuth(app)
//     createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     console.log(user)
//     return user
//     // ...
//   })
//   .catch((error) => {
//     console.log(error.code);
//     console.log(error.message);
//     // ..
//   });

// }
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  const dispatch=useDispatch()

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