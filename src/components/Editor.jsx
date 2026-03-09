import { useState } from "react"

export default function Editor({close}){

 const [text,setText] = useState("")

 const words = text.trim()===""
 ?0
 :text.trim().split(/\s+/).length

 return(

  <div className="editor-popup">

   <h3>Editorial Draft</h3>

   <textarea
    rows="8"
    value={text}
    onChange={(e)=>setText(e.target.value)}
   />

   <p>{words}/600 words</p>

   <div className="editor-actions">

    <button className="add-btn">
     Add Draft
    </button>

    <button
     className="cancel-btn"
     onClick={close}
    >
     Cancel
    </button>

   </div>

  </div>

 )

}