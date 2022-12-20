import React from 'react'
import { Form,FormGroup,Input,Label,Button } from 'reactstrap'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useState } from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase ,ref,set} from "firebase/database";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setinfo } from '../store/auth'
import { collection, setDoc,doc } from "firebase/firestore"; 
import { db } from '../firebase'
import alertify from 'alertifyjs';

function Getinfo() {
    const [name, setName] = useState()
    const [mobile, setMobile] = useState()
    const [gender, setgender] = useState()
    const [age, setAge] = useState()
    const auth=getAuth()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const addarray = async ()=>{
      await setDoc(doc(db, "favorites", auth.currentUser.uid), {
       idler:null
      });
    }

    const addarrayy = async ()=>{
      await setDoc(doc(db, "ownjobs", auth.currentUser.uid), {
       idler:null
      });
    }
    
    const database = getDatabase();
const submithandler = async ()=>{
    if(name && mobile &&   gender && age){
      await setDoc(doc(db, "users", auth.currentUser.uid ), {
        username: name,
            age:age,
            gender:gender,
            number:mobile,
            joboffer:0
      });
      addarray()
      addarrayy()
      
        // set(ref(database, 'usersinfos/' + auth.currentUser.uid), {
        //     username: name,
        //     age:age,
        //     gender:gender,
        //     number:mobile
        //   });
          navigate("/menu")

    }else{
        alertify.error("lütfen tüm alanları doldurunuz")
    }
    

   


}
  return (
    
      <div style={{
    background:"#E6E6FA"
    ,width:"100%",
    height:"100%"
   }}  className="position-absolute top-50 start-50 translate-middle">

      
<div className="position-absolute top-50 start-50 translate-middle text-center" style={{
    width:"300px"
}}>
<Form>
<FormGroup floating>
      <Input
        id="name"
        name="name"
        placeholder="name"
        type="name"
        onChange={(e)=> setName(e.target.value)}
      />
      <Label for="name">
       UserNamee
      </Label>
    </FormGroup>
    {" "}
<FormGroup floating>
      <Input
        id="age"
        name="age"
        placeholder="age"
        type="number"
        onChange={(e)=> setAge(e.target.value)}
      />
      <Label for="age">
        Age
      </Label>
    </FormGroup>
    {" "}
    <FormGroup floating>
    <Input
      id="exampleSelectMulti"
      
      name="selectMulti"
      type="select"
      onChange={(e)=> setgender(e.target.value)}
    >
        <option>
        
      </option>
      <option>
        male
      </option>
      <option>
        female
      </option>
      
    </Input>
      <Label for="name">
       Gender
      </Label>
    </FormGroup>
    
    {' '}
    <FormGroup floating>
    <PhoneInput style={{
        
   
   

  }}
  value={mobile}
  onChange={(phone)=> setMobile(phone)}
  country="tr"
         
              />
      
    </FormGroup>
    {' '}
    <Button onClick={submithandler} color='dark' outline style={{
        width:"300px"
    }}>
      Go on
    </Button>
  </Form>
  
</div>
  













     
    </div>
  )
}

export default Getinfo
