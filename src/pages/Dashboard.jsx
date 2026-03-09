import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import ChatPanel from "../components/ChatPanel"
import StudioPanel from "../components/StudioPanel"
import "./dashboard.css"

export default function Dashboard(){

 return(

  <div>

   <Header/>

   <div className="container">

    <Sidebar/>
    <ChatPanel/>
    <StudioPanel/>

   </div>

  </div>

 )
}