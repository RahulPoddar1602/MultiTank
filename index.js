const express=require("express")
const app=express()
// const cin=require("circular-json")

const path=require("path")
const http=require("http")
const {Server}=require("socket.io")
const port = process.env.PORT || 3000;

const server=http.createServer(app)

const io=new Server(server)
app.use(express.static(path.resolve("")))

let arr=[]
let playingArray=[]
let roomId="";
// let val=0;
io.on("connection",async(socket)=>{
    console.log("rahul");
    socket.on("he",(e)=>{
        console.log("rahulpoddar")
        console.log(e.name)
    })
    // await socket.on("joinRoom",(e)=>{
    //     if(e.roomId!=null)
    //     {
    //         socket.join(e.roomId);
    //         roomId=e.roomId
    //     }
    // })
    // val++;
    // if(val>=2)
    // {
    //     val=0;
    //     roomId++;    
    // }
    // socket.join(roomId)
    // io.emit("roomno",{no:roomId})
    socket.on("moving",(e)=>{
        // io.emit("left",e)
        // console.log(e)
        io.emit("moving",e)
    })
    socket.on("moving1",(e)=>{
        // io.emit("left",e)
        // console.log(e)
        io.emit("moving1",e)
    })
    socket.on("right",(e)=>{
        io.emit("right",e)
    })
    socket.on("left",(e)=>{
        io.emit("left",e)
        // console.log(e)
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
    socket.on("bulletbreak",(e)=>{
        io.emit("bulletbreak",e)
    })
    socket.on("bullet1break",(e)=>{
        io.emit("bulletbreak",e)
    })
    socket.on("tankIron",(e)=>{
        io.emit("tankIron",e)
    })
    socket.on("tank2death",(e)=>{
        io.emit("tank2death",e)
    })
    socket.on("tank1death",(e)=>{
        io.emit("tank1death",e)
    })

})



app.get("/",(req,res)=>{
    return res.sendFile("index.html")
})

server.listen(port,()=>{
    console.log("port connected to 3000")
})