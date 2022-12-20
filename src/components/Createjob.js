import React , { useState ,useEffect}  from 'react'
import { FaCity } from 'react-icons/fa'
import { Label,Input, Button } from 'reactstrap'
import { doc } from 'firebase/firestore'
import { db } from '../firebase'
import { getAuth } from 'firebase/auth'
import { getDoc,setDoc ,updateDoc,arrayUnion} from 'firebase/firestore'
import { useDispatch,useSelector } from 'react-redux'
import { createjoboperation } from '../store/auth'
import { sharejobid } from '../store/filteroperation'
import { getDatabase, ref, set } from "firebase/database";
import alertify from 'alertifyjs';


function Createjob(props) {
  const dispatch = useDispatch()
  const Turkiye = ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 
'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce']
const category=[ "inşaat ","tekstil","bahçe","tamir","mevsimlik","sanat","zanaat","market","atölye","hurda"]
  const [title,setTitle] = useState('')
  const [country,setcountry] = useState('Türkiye')
  const [description,setDescription] = useState('')
  const [categories,setcategories] = useState('')
  
  const [city,setcity]= useState('')
  const sharejobids =useSelector((state)=> state.filteropera.sharejobids)
 
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
  const addarray = async ()=>{
    await setDoc(doc(db, "ownjobs", auth.currentUser.uid), {
     idler:[]
    });
  }
  useEffect(()=>{
    getfavoritedataa()

  },[])
  const setdocument= async (item) => {
   
    const washingtonRef = doc(db, "ownjobs", auth.currentUser.uid);
    
    // Atomically add a new region to the "regions" array field.try {
      await updateDoc(washingtonRef, {
        idler: arrayUnion(item)
    })
    
    
    // Atomically remove a region from the "regions" array field.
    // await updateDoc(washingtonRef, {
    //     regions: arrayRemove("east_coast")
    // });
        
      }
      const addtofavorite = ()=> {
    
   
        
        if(sharejobids === ""){
        addarray()
        setTimeout(() => {
          setdocument(auth.currentUser.uid + props.persondata.joboffer)
          
          
        }, 500);
         
          
        }else{
          // let array=favorite.ids
          // const sayi1=props.uid
          // array.push({array,sayi1})
          // setdocument(array)
          
          setdocument(auth.currentUser.uid + props.persondata.joboffer)
         
          
      
       
            
         
          
        }
        
      
  
      
  
    }
  const auth= getAuth()
  
  const godatatbase = async ()=>{
    if(title && country && description && categories && city){
      await setDoc(doc(db, "joboffers", auth.currentUser.uid + props.persondata.joboffer), {
        title:title,
        country:country,
        description:description,
        categories:categories,
        city:city,
        joboffer:props.persondata.joboffer,
        jobuid:auth.currentUser.uid + props.persondata.joboffer,
        jobphonenumber:props.persondata.number,
        jobusername:props.persondata.username,
        joboffere:props.persondata.joboffer + 1
        ,jobofferid:auth.currentUser.uid 
        
      });
      await setDoc(doc(db, "users", auth.currentUser.uid ), {
        username:props.persondata.username,
            age:props.persondata.age,
            gender:props.persondata.gender,
            number:props.persondata.number,
            
            joboffer:props.persondata.joboffer + 1
      });
      dispatch(createjoboperation())
      addtofavorite()
      alertify.success("ilan başarıyla yayınlandı")

    }else{
      
      alertify.error("lütfen tüm alanları doldurun")
    }


  }
  


  return (
    <div style={{
      marginTop:"5rem",
      marginBottom:"1rem",
      border: "1px solid #363636",
      padding: "1rem",
      borderRadius: "0.5rem",
      background:"#E6E6FA"


    }} className="text-center">
      <h2>iş ilanı oluştur</h2>
      <hr></hr>
      <Label>kategoriler</Label>
<Input
id="exampleSelect"
name="select"
type="select"
onChange={(e) => setcategories(e.target.value)}

>
  <option>

  </option>
{category.map((data) => (
    <option>{data}</option>
  ))}
</Input>

<br></br>
<Label >ülke</Label>
<Input
id="exampleSelect"
name="select"
type="select"
onChange={(e) => setcountry(e.target.value)}

>

<option>
  Türkiye
</option>

</Input>

<br></br>
<Label >şehir</Label>
<Input
id="exampleSelect"
name="select"
type="select"
onChange={(e) => setcity(e.target.value)}
>
<option>
  
</option>
{country === "Türkiye" ? 
  Turkiye.map((data) => (
    <option>{data}</option>
  ))
 : (<option></option>)}
</Input>
<br></br>

<Label >başlık</Label>
<Input  maxLength={50} type='text' onChange={(e) => setTitle(e.target.value)}></Input>
<br></br>

<Label >açıklama</Label>
<Input maxLength={600} type='textarea' onChange={(e) => setDescription(e.target.value)}></Input>
<br></br>


<Button onClick={godatatbase} style={{
 width: '100px',
 height: '40px',
 fontSize: '14px',
 }}



color='dark' outline>paylaş</Button>







    </div>
  )
}

export default Createjob
