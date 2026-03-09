import { useChat } from "../context/ChatContext"

export default function StudioPanel(){

 const { addMessage } = useChat()

 const runTool = async (tool)=>{

  let url=""
  let method="POST"
  let body={}

  if(tool==="trends"){
   url="http://127.0.0.1:8000/trends"
   method="GET"
  }
	if(tool==="events"){
	 url="http://127.0.0.1:8000/events"
	 method="GET"
	}

  if(tool==="analyze"){
   url="http://127.0.0.1:8000/analyze"
   body={message:"global"}
  }

  if(tool==="summary"){
   url="http://127.0.0.1:8000/summary"
   body={message:"global"}
  }

  if(tool==="export"){
   url="http://127.0.0.1:8000/export"
   body={message:"global"}
  }

  if(tool==="coverage"){
   url="http://127.0.0.1:8000/global_coverage"
   method="GET"
  }

  if(tool==="infographic"){
   url="http://127.0.0.1:8000/infographic"
   body={message:"global"}
  }

  try{

   // show loading message
   addMessage({
    role:"ai",
    text:`⏳ Running ${tool.replace("_"," ")} tool...`
   })

   const res = await fetch(url,{
    method:method,
    headers:{
     "Content-Type":"application/json"
    },
    body: method==="GET" ? null : JSON.stringify(body)
   })

   const data = await res.json()

   console.log("TOOL RESPONSE:",data)

   let message=""

   // 📊 Source analysis
   if(tool==="analyze"){

    const rows = Object.entries(data.sources || {})
     .map(([k,v],i)=>`${i+1}. **${k}** — ${v} articles`)
     .join("\n")

    message =
`## 📊 Source Activity

${rows}
`
   }
	if(tool==="events"){

	 const rows = (data.events || [])
	   .map(e => `${e.event} — ${e.count} articles`)
	   .join("\n\n")

	 message =
	`## 🌍 Major Global Events

	${rows}
	`
	}
   // 🔥 Trends (supports clustering or keyword lists)
   if(tool==="trends"){

    const clusters =
      data.trends?.trends ||
      data.trends ||
      data.clusters ||
      []

    const rows = clusters.map((c,i)=>{

      if(typeof c === "string"){
       return `${i+1}. ${c}`
      }

      const articles = (c.articles || [])
       .map(a=>`   • ${a}`)
       .join("\n")

      return `${i+1}. 🔥 ${c.topic || "News Trend"}\n${articles}`

    }).join("\n\n")

    message =
`## 🔥 Top Global News Trends

${rows}
`
   }

   // 📰 Summary
   if(tool==="summary"){

    const s = data.summary || {}

    message =
`## 📰 ${s.headline || "News Summary"}

${s.short_summary || ""}

### Key Points
${(s.key_points || []).map(p=>`• ${p}`).join("\n")}

### Why It Matters
${s.why_it_matters || ""}
`
   }

   // 🌍 Global coverage
   if(tool==="coverage"){

    const rows = Object.entries(data.coverage || {})
     .map(([k,v])=>`• **${k}** — ${v} articles`)
     .join("\n")

    message =
`## 🌍 Global Coverage

${rows}
`
   }

   // 📊 Infographic
   if(tool==="infographic"){

    const chart = data.chart || {}

    message =
`## 📊 News Infographic

**Top Trend:** ${chart.top_trend || "N/A"}

**Top Region:** ${chart.top_region || "N/A"}

**Top Topic:** ${chart.top_topic || "N/A"}
`
   }

   // 🌐 WordPress export
   if(tool==="export"){

    message =
`## 🌐 WordPress Article Generated

The article HTML has been generated.

📂 File Location:
${data.file || "exports/article.html"}

You can upload this file directly into **WordPress editor**.
`
   }

   addMessage({
    role:"ai",
    text: message || JSON.stringify(data,null,2)
   })

  }catch(err){

   console.error(err)

   addMessage({
    role:"ai",
    text:"⚠️ Tool execution failed"
   })

  }

 }

 return(

  <div className="studio">

   <h3>AI Tools</h3>

   <button onClick={()=>runTool("analyze")}>
    Analyze Sources
   </button>
   
   <button onClick={()=>runTool("events")}>
	Detect Global Events
   </button>
   
   <button onClick={()=>runTool("trends")}>
    Detect Trends
   </button>

   <button onClick={()=>runTool("coverage")}>
    Global Coverage
   </button>

   <button onClick={()=>runTool("summary")}>
    Generate Summary
   </button>

   <button onClick={()=>runTool("infographic")}>
    Create Infographic
   </button>

   <button onClick={()=>runTool("export")}>
    Export WordPress HTML
   </button>

  </div>

 )
}