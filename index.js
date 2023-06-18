const express=require("express")
const app=express()

const path=require("path")
const http=require("http")
const {Server}=require("socket.io")


const server=http.createServer(app)

const io=new Server(server)
app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]

io.on("connection",(socket)=>{
    console.log("rahul");
    socket.on("he",(e)=>{
        console.log("rahulpoddar")
        console.log(e.name)
    })
    socket.on("left",(e)=>{
        io.emit("left",e)
    })
    socket.on("right",(e)=>{
        io.emit("right",e)
    })
    socket.on("up",(e)=>{
        io.emit("up",e)
    })
    socket.on("down",(e)=>{
        io.emit("down",e)
    })
    socket.on("w",(e)=>{
        io.emit("w",e)
    })
    socket.on("a",(e)=>{
        io.emit("a",e)
    })
    socket.on("s",(e)=>{
        io.emit("s",e)
    })
    socket.on("d",(e)=>{
        io.emit("d",e)
    })
    socket.on("space",(e)=>{
        io.emit("space",e)
    })
    socket.on("k",(e)=>{
        io.emit("k",e)
    })
    socket.on("r",(e)=>{
        io.emit("r",e)
    })
    socket.on("/",(e)=>{
        io.emit("/",e)
    })
})



app.get("/",(req,res)=>{
    return res.sendFile("index.html")
})

server.listen(3000,()=>{
    console.log("port connected to 3000")
})