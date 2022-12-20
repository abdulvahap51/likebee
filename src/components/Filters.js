import React,{useState} from 'react'
import { Button ,Input,Label} from 'reactstrap'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../firebase';
import { useDispatch } from 'react-redux';
import { joblisthupidis } from '../store/filteroperation';


function Filters() {
  
  const dispatch = useDispatch();

  
  const [category,setcategory] = useState("")
  const [city,setcity] = useState("")
  const [country,setcountry] = useState("Türkiye")
  function halve(x){
    return x.filter((i, idx) => idx < Math.floor(x.length / 2))
  }
  let arrray = []
  const categories=[ "inşaat ","tekstil","bahçe","tamir","mevsimlik","sanat","zanaat","market","atölye","hurda"]
  const Turkiye = ['Adana', 'Adıyaman', 'Afyon', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin',
'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale',
'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir',
'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 
'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 
'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya',
'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale', 'Batman', 'Şırnak',
'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce']

  const filter = async () => {

    if(category && city && country){
      
      const q = query(collection(db, "joboffers"), where("country", "==", country) ,where("city","==", city),where("categories","==", category)) ;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      arrray.push({...doc.data(), id : doc.id})
    
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
    }
    else if(category && country){
      
      const q = query(collection(db, "joboffers"), where("country", "==", country) ,where("categories","==", category)) ;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      
        arrray.push({...doc.data(), id : doc.id})
     
     
      });
      dispatch(joblisthupidis(arrray.reverse()))

    }
    else if(city && country){
      
      const q = query(collection(db, "joboffers"), where("country", "==", country) ,where("city","==", city)) ;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        
        arrray.push({...doc.data(), id : doc.id})
     
     
      });
      dispatch(joblisthupidis(arrray.reverse()))
    } else if(category && city){
     
      const q = query(collection(db, "joboffers"), where("categories", "==", category) ,where("city","==", city)) ;

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        
        arrray.push({...doc.data(), id : doc.id})
     
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
    }else if(country){
   
      const q = query(collection(db, "joboffers"), where("country", "==", country));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        
        arrray.push({...doc.data(), id : doc.id})
     
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
    }else if(city){
     
      const q = query(collection(db, "joboffers"), where("city", "==", city));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       
        arrray.push({...doc.data(), id : doc.id})
     
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
    }else if(category){
     
      const q = query(collection(db, "joboffers"), where("categories", "==", category));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
       
        arrray.push({...doc.data(), id : doc.id})
     
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
    }else{
    
      const q = query(collection(db, "joboffers"));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
        
        arrray.push({...doc.data(), id : doc.id})
     
      
      });
      dispatch(joblisthupidis(arrray.reverse()))
     
    }
    arrray=[]







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

      <h2>filter</h2>
      <hr></hr>

<Label>kategoriler</Label>
<Input
onChange={(e)=> setcategory(e.target.value)}
id="exampleSelect"
name="select"
type="select"

>
<option>
  
</option>
{categories.map((data) => (
    <option>{data}</option>
  ))}

</Input>
<br></br>
<br></br>
<Label >ülke</Label>
<Input
onChange={(e)=> setcountry(e.target.value)}
id="exampleSelect"
name="select"
type="select"

>


<option>
  Türkiye
</option>

</Input>
<br></br>
<br></br>
<Label >şehir</Label>
<Input
onChange={(e)=> setcity(e.target.value)}
id="exampleSelect"
name="select"
type="select"

>
<option>
  
</option>
{country === "Türkiye" ? 
  Turkiye.map((data) => (
    <option>{data}</option>
  ))
 : (<option>naber</option>)}
</Input>
<br></br>
<Button  onClick={filter} color='dark' outline style={{
   width: '100px',
   height: '40px',
   fontSize: '14px',
}}>filter</Button>







    </div>
    
  )
}

export default Filters
