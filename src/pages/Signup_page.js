import { Row ,Col,Input,Label,Form,FormGroup,Button} from "reactstrap";

import {FcGoogle} from "react-icons/fc"
import { setinfo } from "../store/auth";

import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { toggleOpen } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import alertify from 'alertifyjs';
import { getAuth ,createUserWithEmailAndPassword ,signInWithPopup,GoogleAuthProvider} from "firebase/auth";

function Signup_page() {
  const dispatch = useDispatch();
  
  const navigate=useNavigate()
const [email, setEmail] = useState("")
const [password, setPassword] = useState("")
const [repassword,setrePassword] = useState("")


const provider = new GoogleAuthProvider();
const gosignup = ()=>{
  navigate("/signin")
}


const submithandler= async ()=>{
  
 if(password === repassword){
   
  const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
   
    dispatch(setinfo({
      email:user.email,
      name:user.displayName,
      phonenumber:user.phoneNumber

    }))

    navigate("/home")
    dispatch(toggleOpen(true))
    // ...

  })
  .catch((error) => {
    
alertify.error(error.message)
    // ..
  });
  

 }else{
 alertify.error("şifreler eşleşmiyor")

  
 }
 
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
    <div className="position-absolute top-50 start-50 translate-middle" style={{
      width:"200px",
      height:"850px"
    }}>
      <img style={{width:"200px"}} src="https://egitimgrafik.com/wp-content/uploads/2019/03/ari.png" alt="none"></img>
    </div>
    </div>
    <Helmet>
                <style>{'body { background-color: #E6E6FA; }'}</style>
            </Helmet>
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
      <Label for="Email">
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
      <Label for="Password">
        Şifre
      </Label>
    </FormGroup>
    {' '}
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
        onChange={(e)=> setrePassword(e.target.value)}

      />
      <Label for="rePassword">
        Şifre-tekrar
      </Label>
    </FormGroup>
    {' '}
    <Button onClick={submithandler} color="dark" outline style={{width:"380px",
  marginTop:"2rem"}}>
      Sign In
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
      
  </div>
  
  <div style={{
    marginTop:"50px",
  }}></div>
    </div>
    
    

   </div>
   </>
  );
}

export default Signup_page
