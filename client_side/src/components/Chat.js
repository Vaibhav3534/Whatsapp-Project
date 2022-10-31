import React from "react";
import "../CSS/Chat.css"
import Avatar from '@mui/material/Avatar';
import { IconButton } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from "@mui/icons-material/Search"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import axios from "../axios";

export default function Chat({messages}) {

    const [seed, setSeed] = React.useState("");
    React.useEffect(() => {
        setSeed(Math.floor(Math.random() * 100))
    }, [])

    const [input, setInput] = React.useState("")

    const sendMessage =async (e)=>{
        e.preventDefault()

        await axios.post("/messages/new",{
            message:input,
            name:"demo user",
            timestamp:"demo time",
            received: true
        } )

        setInput("")
    }

    return (

        <div className="chat">
            <div className="chat_header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

                <div className="chat_headerInfo">
                    <h3>Name</h3>
                    <p>Last seen at ...</p>
                </div>

                <div className="chat_headerRight">

                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages.map(message =>(
                    <p className= {`chat_message ${message.received && "chat_receiver"}`}>

                    <span className="chat_name">{message.name}</span>
                    {message.message}
                    <span className="chat_timestamp">
                        {message.timestamp}
                    </span> 
                </p>
                ))}


            </div>

            <div className="chat_footer">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon />
            </div>
        </div>

    )
}