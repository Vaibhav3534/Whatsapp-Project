
import "../CSS/Sidebar.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import SidebarChat from "./SidebarChat";
import React from "react";
import {db} from "../firebase";


function Sidebar() {

    const [rooms, setRooms] = React.useState([])


    React.useEffect(()=>{
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>
            setRooms(snapshot.docs.map((doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
        ))

        return ()=>{
            unsubscribe()
        }

    }, [])


    return (
        <div className="sidebar">

            <div className="sidebar_header">
                <AccountCircleIcon />
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>

            <div className="sidebar_chat">
                <SidebarChat addNewChat />
                {rooms.map(room=><SidebarChat key={room.id} id={room.id} name={room.data.name} />)}
            </div>
        </div>
    )
}

export default Sidebar