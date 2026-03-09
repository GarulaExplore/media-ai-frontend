import { createContext, useContext, useState } from "react"

const ChatContext = createContext()

export function ChatProvider({ children }) {

 const [messages,setMessages] = useState([])

 const addMessage = (msg)=>{
  if(!msg || !msg.text) return
  setMessages(prev => [...prev,msg])
 }

 return (
  <ChatContext.Provider value={{messages,addMessage}}>
   {children}
  </ChatContext.Provider>
 )
}

export function useChat(){
 return useContext(ChatContext)
}