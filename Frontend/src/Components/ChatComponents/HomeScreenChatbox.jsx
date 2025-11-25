import React, { useState, useEffect } from 'react'
import { BiSolidMessageSquareDots } from "react-icons/bi";
import axios from 'axios'
import Chatbot from '../Chatbot/Chatbot';
import Welcome from '././Welcome';

const HomeScreenChatbox = () => {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showChatWindow, setshowChatWindow] = useState(false);
    const [theme, setTheme] = useState({
        headerColor: "",
        bgColor: "",
        firstMessage: "",
        secondMessage: "",
        welcomeMessage: ""
    });

    const showChatBox = () => {
        setShowWelcomeMessage(false)
        setshowChatWindow(prev => !prev)
    }
    
    const getChatbotConfig = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/chatbot/`
            );

            const chatBotConfig = res.data.chatConfig.chatBotConfig
            console.log(chatBotConfig, "Theme")
            setTheme(chatBotConfig);

        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getChatbotConfig()
    }, [])

    return (
        <div className='' style={{ position: "fixed", bottom: "10%", right: "10%", zIndex: 1200 }}>
            <div style={{ marginBottom: "2rem" }}>
                {showChatWindow && (<>
                    <Chatbot theme={theme} showChatWindow={showChatWindow} setshowChatWindow={setshowChatWindow}/>
                </>)}
            </div>
            <div>
                <p> {showWelcomeMessage ? <Welcome chatBoxTheme={theme} /> : <></>}</p>
                <div style={{ position: "fixed", bottom: "3%", right: "3%", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#244779", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", color: "white" }} onClick={showChatBox}>
                    <BiSolidMessageSquareDots />
                </div>
            </div>
        </div >
    )
}

export default HomeScreenChatbox