import { createSlice } from "@reduxjs/toolkit";




const initialState={
    
    isopen:JSON.parse(localStorage.getItem("user")),
    createjobisopen:"false",

    infos:[]
}

export const auth = createSlice({
    name: "auth",
    initialState,

    reducers: {
        toggleOpen: (state) => {
            state.isopen =!state.isopen;
            localStorage.setItem("user",JSON.stringify(true));

            
        },
        toggleclose:(state)=> {
            state.isopen =!state.isopen;
            localStorage.setItem("user",JSON.stringify(false));
        }
        ,setinfo:(state,action) => {
            state.infos=action.payload
        },
        createjoboperation:(state)=>{
            state.createjobisopen=!state.createjobisopen;

        }


    },
})

export const {setinfo,toggleOpen,toggleclose,createjoboperation} = auth.actions

export default auth.reducer