import React from "react";
import "../CSS/Sidebar.css"
import "../CSS/SidebarChat.css"
import Avatar from '@mui/material/Avatar';
import {db} from "../firebase"


function SidebarChat ({id, name,addNewChat}){
    const [messages, setMessages] = React.useState("")

    // React.useEffect(() =>{
    //     setSeed(Math.floor(Math.random()*100))
    // }, [])


    const createChat = ()=>{
        const roomName = prompt("Please Enter name to chat")

        if(roomName){
            db.collection("rooms").add({
                name: roomName
            })
        }
    }

    React.useEffect(()=>{
        if(id){
            db.collection("rooms").doc(id).collection("messages")
                .orderBy("timestamp", 'desc')
                .onSnapshot((snapshot)=>{
                    setMessages(snapshot.docs.map((doc)=>{
                        doc.data()
                    }))
                })
        }
    }, [id])

    return !addNewChat ? (
        <div className="sidebarChat">
              <Avatar alt="Remy Sharp" src ={`https://avatars.dicebear.com/api/human/12145.svg`}/>
              
              <div className="sidebarChat_info">
                    <h2>Name</h2>
                    <p>last Message...</p>
              </div>
        </div>
    ) :
    (
        <div onClick= {createChat}
            className="sidebarChat">
                <h2>Add New Chat</h2>
        </div>
    )
}


export default SidebarChat