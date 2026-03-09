import { useState, useEffect, useRef } from "react"
import ReactMarkdown from "react-markdown"
import { useChat } from "../context/ChatContext"
import Editor from "./Editor"

export default function ChatPanel(){

 const {messages,addMessage} = useChat()

 const [input,setInput] = useState("")
 const [showEditor,setShowEditor] = useState(false)

 const chatContainerRef = useRef(null)

 useEffect(()=>{
  if(chatContainerRef.current){
   chatContainerRef.current.scrollTop =
   chatContainerRef.current.scrollHeight
  }
 },[messages])

 const sendMessage = async () => {

  if(!input.trim()) return

  addMessage({
   role:"user",
   text:input
  })

  try{

   const response = await fetch("http://127.0.0.1:8000/chat",{
    method:"POST",
    headers:{
     "Content-Type":"application/json"
    },
    body:JSON.stringify({
     message:input
    })
   })

   const data = await response.json()

   addMessage({
    role:"ai",
    text:data.reply
   })

  }catch(err){

   addMessage({
    role:"ai",
    text:"Backend connection error"
   })

  }

  setInput("")
 }

 const handleKeyDown=(e)=>{
  if(e.key==="Enter" && !e.shiftKey){
   e.preventDefault()
   sendMessage()
  }
 }

 return(

  <div className="chat">

   <div className="chat-box" ref={chatContainerRef}>

    {messages.filter(Boolean).map((m,i)=>(
     <div
      key={i}
      className={m.role==="user"?"user-msg":"ai-msg"}
     >
      <ReactMarkdown>{m.text}</ReactMarkdown>
     </div>
    ))}

   </div>

   <div className="chat-input">

    <button
     className="draft-btn"
     onClick={()=>setShowEditor(true)}
    >
     ✍ Add Editorial Draft
    </button>

    <textarea
     value={input}
     placeholder="Ask about news trends..."
     onChange={(e)=>setInput(e.target.value)}
     onKeyDown={handleKeyDown}
    />

    <button onClick={sendMessage}>
     Send
    </button>

   </div>

   {showEditor && (
    <Editor close={()=>setShowEditor(false)} />
   )}

  </div>

 )
}