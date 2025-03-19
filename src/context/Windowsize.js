import { createContext, useEffect, useState } from "react";

export const window_WI=createContext(null);
export default function Contextwidth({children}){
    const [widthwindow,setWidthwido]=useState(window.innerWidth)
    useEffect(()=>{
        function setwidth(){
            setWidthwido(window.innerWidth)
        }
        window.addEventListener('resize',setwidth)
        return ()=>{
            window.removeEventListener('resize',setwidth)
            }
    },[])
    return(
        <window_WI.Provider value={{widthwindow,setWidthwido}}>{children}</window_WI.Provider>
    )

}
