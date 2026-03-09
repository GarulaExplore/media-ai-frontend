import { useState } from "react"

export default function Sidebar(){

 const [sources,setSources]=useState([])
 const [input,setInput]=useState("")

 const addSource=()=>{

  if(!input) return

  setSources([...sources,input])
  setInput("")
 }

 return(

  <div className="sidebar">

   <h3>News Sources</h3>

   <input
    placeholder="Paste RSS or website URL"
    value={input}
    onChange={(e)=>setInput(e.target.value)}
   />

   <button onClick={addSource}>
    Add Source
   </button>

   <ul>

    {sources.map((s,i)=>(
     <li key={i}>{s}</li>
    ))}

   </ul>

  </div>

 )

}