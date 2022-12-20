import React from 'react'
import { Link } from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import {FaHome} from 'react-icons/fa'
import {GrLogout} from 'react-icons/gr'
import { getAuth,signOut } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { toggleclose } from '../store/auth'
import { setfavoritejoblist } from '../store/filteroperation'
import { sharejobid } from '../store/filteroperation'


function Navbar() {
  const dispatch = useDispatch()
  
    const logouthandle = () => {
        const auth = getAuth();
      signOut(auth).then(() => {
        dispatch(toggleclose(false))
        // Sign-out successful.
      
        dispatch(setfavoritejoblist(""))
        dispatch(sharejobid({idler:null}))

      }).catch((error) => {
        // An error happened.
      });
       
        
      }
  return (
    
      
    <div className=' align-items-center ' style={{
        width: "100%",
        height: "70px",
        background: "#171712",
        
        
        

    }} ><p className="position-absolute   " style={{
        fontSize: "2.8rem",
        fontWeight: "bold",
        fontFamily:'Myriad Pro Regular'
        ,color:"#FFD700",
        marginLeft: "0.5rem",




    }}>likeBee</p>
    
    <div className='position-absolute end-0'  style={{
        backgroundColor:"#E6E6FA",
        width:"200px",
        height:"50px",
        marginTop  :"8px",
        borderRadius:"9px",
        marginRight:"10px"
        

        
    }}><Link style={{
      color:"black"
    }} to={"/menu"}><FaHome className='position-absolute  start-0'  style={{
      fontSize: "2.5rem",
      marginTop:"0.4rem",
      marginLeft:"0.9rem",

        
    }}> </FaHome></Link>
    <Link style={{
      color:"black"
    }} to={"/profile"}>
      <CgProfile className='position-absolute  start-50' style={{
        fontSize:"2.5rem",
        marginTop:"0.4rem",
        marginLeft:"-1.1rem"
        

        
       
      }}></CgProfile></Link>
      <Link to={"/"} onClick={logouthandle} >
       <GrLogout  className='position-absolute  end-0'  color='white'   style={{
fontSize: "2.5rem",
marginTop: "0.4rem",
marginRight: "0.5rem",




}}></GrLogout></Link></div>


    </div>
  )
}

export default Navbar
