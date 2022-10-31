import React from "react"
import Pusher from "pusher-js"
// import Router from "react-router-dom"
import {Router, Route} from "react-router-dom"
import { Switch } from "@mui/material";

import './App.css';

import Sidebar from "./components/Sidebar"
// import SidebarChat from "./components/SidebarChat";
import Chat from "./components/Chat";
import axios from "./axios";


function App() {

  const [messages, setMessages] = React.useState([])

  React.useEffect(() => {
    axios.get('/messages/sync')
      .then(res => {
        console.log(res.data)
        setMessages(res.data)
      })
    // console.log("first")
  }, [])

  const pusherCode = '10ae10ee0f1371253926'
  React.useEffect(() => {

    const pusher = new Pusher(`${pusherCode}`, {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind("inserted", function (newMessage) {
      // alert(JSON.stringify(newMessage));
      // console.log("check")
      setMessages([...messages, newMessage])
    });
    // console.log("first")


    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])


  return (
    <div className="App">
      <div className="app_body">
       

            
              <Sidebar />
              <Chat messages={messages} />
            

        
      </div>

    </div>
  );
}

export default App;
