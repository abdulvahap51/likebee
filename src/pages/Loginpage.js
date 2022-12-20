import { Row ,Col,Input,Label,Form,FormGroup,Button, NavbarToggler} from "reactstrap";

import {FcGoogle} from "react-icons/fc"
import { useDispatch,useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { signin } from "../firebase";
import { useNavigate } from "react-router-dom";
import { async } from "@firebase/util";
import { getAuth ,signInWithEmailAndPassword ,signInWithPopup,GoogleAuthProvider} from "firebase/auth";
import { setinfo } from "../store/auth";
import { toggleOpen } from "../store/auth";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import alertify from 'alertifyjs';





function Loginpage() {


const dispatch= useDispatch()
const navigate=useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")

const provider = new GoogleAuthProvider();
const gosignup = ()=>{
  navigate("/signin")
}
const auth = getAuth();
const gotohome=()=>{
 navigate("/home")
}
useEffect(()=>{
  document.body.style.zoom="100%"

},[])
const googlelogin= async (e)=>{
  e.preventDefault()

  const auth = getAuth();
  
signInWithPopup(auth, provider)
  .then((result) => {
   
    
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    const token = credential.accessToken;
    
    // The signed-in user info.
    const user = result.user;
    
    dispatch(toggleOpen(true))
   
   
    gotohome()
    

    
    // ...
  }).catch((error) => {
    console.log(error.message)
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
  
  

}

const submithandler= async () => {
  
  
  const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    
    
    navigate("/home")
    dispatch(toggleOpen(true))
    
    // ...
  })
  .catch((error) => {
    
    alertify.error("e-posta veya şifre hatalı")

    // ..
  });
    
}

  return (
   <>
   <div style={{
    
    width:"100%",
    height:"100%"
   }} className="position-absolute top-50 start-50 translate-middle">
    {/* <Row>
      <Col ></Col>
      <Col ></Col>
      <Col ></Col>
    </Row> */}
    <div>
    <Helmet>
                <style>{'body { background-color: #E6E6FA; }'}</style>
            </Helmet>
    <div className="position-absolute top-50 start-50 translate-middle" style={{
      width:"200px",
      height:"850px",
     
    }}>
      <img style={{width:"200px"}} src="https://egitimgrafik.com/wp-content/uploads/2019/03/ari.png" alt="none"></img>
    </div>
    </div>

    <div  className=" position-absolute top-50 start-50 translate-middle " style={{width:"380px"}} >
    <Form className="text-center">
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
        onChange={(e)=> setEmail(e.target.value)}

      />
      <Label for="exampleEmail">
        Email
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e)=> setPassword(e.target.value)}

      />
      <Label for="examplePassword">
        Password
      </Label>
    </FormGroup>
    {' '}
    <Button onClick={submithandler} color="dark" outline style={{width:"380px"}}>
      Log In
    </Button>
    
  </Form>
  <div style={{
    marginTop:"20px",
  }}>
    {/* <Row>
      <Col style={{
        
      }} sm="5"><hr></hr></Col>
      <Col sm="2" style={{
        
      }} className="text-center"><p style={{
        fontSize: "1.2rem",
        fontWeight: "bold",
      }}>Or</p></Col>
      <Col sm="5"><hr></hr></Col>
      </Row> */}
      <p style={{fontSize:"1.2rem",
    fontWeight:"bold"}}>----------------------  OR  ----------------------</p>
  </div>
  <div className="text-center">
    <button onClick={googlelogin} style={{
      background:"#E6E6FA",
      border:"none"
    }} >
    <p style={{
      fontSize: "1.2rem",
      fontStyle: "italic",
    }}>
    < FcGoogle style={{
      fontSize:"1.5rem"
    }} /> you can login with Google
    </p>
    </button>
  </div>
  <div style={{
    marginTop:"50px",
  }}><div style={{}} className="text-center">
    <p>if you dont have an account</p>
  <Button onClick={gosignup}  color="dark" outline style={{width:"300px"
,fontWeight:"bold"}}>
      you can sign Up here
    </Button>
  </div></div>
    </div>
    
    

   </div>
   </>
  );
}

export default Loginpage;
