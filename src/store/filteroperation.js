import { createSlice } from "@reduxjs/toolkit";

const initialState={
    country:"",
    city:"",
    category:"",
    joblist:[],
    favoritejoblist:{idler:null},
    namert:[],
    sharejobids:{idler:null},
}

export const filteroperation= createSlice({
    name:"filteroperation",
    initialState,

    reducers:{
        joblisthupidis:(state,action)=>{
            state.joblist=action.payload;

        },
        countryhupidis:(state,action)=>{
            state.country=action.payload;
        },
        cityhupidis:(state,action)=>{
            state.city=action.payload;
        },
        categoryhupidis:(state,action)=>{
            state.category=action.payload;
        },
        setfavoritejoblist:(state,action)=>{
            state.favoritejoblist=action.payload;
        },
        deletefavoritejoblist:(state,action)=>{
            let a=state.favoritejoblist
            const i=0
            a.idler.map((data)=>{
                if(data === action.payload ){
                    delete a.idler[i]
                    state.favoritejoblist= a
                    console.log(a)

                }
                i = i + 1
            })
        }
        ,
        favoritejoblistdetailes:(state,action)=>{
state.namert=action.payload;
        },
        sharejobid:(state,action)=>{
            state.sharejobids=action.payload
        },

    },
})


export const {joblisthupidis,categoryhupidis,cityhupidis,countryhupidis,setfavoritejoblist,favoritejoblistdetailes,deletefavoritejoblist,sharejobid}=filteroperation.actions

export default filteroperation.reducer