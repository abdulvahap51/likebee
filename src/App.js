import { Row ,Col,Input,Label,Form,FormGroup,Button} from "reactstrap";
import Protectedrouth from "./components/Protectedrouth";
import { getAuth } from "firebase/auth";

import {FcGoogle} from "react-icons/fc"
import { Routes,Route } from "react-router-dom";


import Signup_page from "./pages/Signup_page";
import Homepage from "./pages/Homepage";
import Loginpage from "./pages/Loginpage";
import Menu from "./pages/Menu";
import Profile from "./pages/Profile";

function App() {


  return (
    <Routes>
      <Route path="/" element={
        <Loginpage></Loginpage>
      } />
      <Route path="/home" element={<Protectedrouth>
        <Homepage></Homepage>
      </Protectedrouth>} />
      <Route path="/signin" element={<Signup_page/>} />
      <Route path="/profile" element={<Protectedrouth >
        <Profile></Profile>
      </Protectedrouth>} />
      
      {/* <Route path="/menu" element={<Protectedrouth >
        <Menu></Menu>
      </Protectedrouth>} /> */}
      <Route path="/menu" element={
       <Protectedrouth><Menu></Menu></Protectedrouth> 
      } />

      
      
      
    </Routes>
  );
}

export default App;
