import logo from "../assets/logical-indian.jpeg"

export default function Header(){

 return(

  <div style={{

   height:"70px",
   background:"#6d28d9",   // exact purple tone
   color:"white",
   display:"flex",
   alignItems:"center",
   justifyContent:"space-between",
   padding:"0 25px",
   fontWeight:"600",
   fontSize:"18px"

  }}>

   {/* Title */}
   <div>
     AI Newsroom Assistant
   </div>

   {/* Logo */}
   <img
    src={logo}
    alt="Logical Indian"
    style={{
      height:"45px",
      objectFit:"contain"
    }}
   />

  </div>

 )

}