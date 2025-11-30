import React, { useState, useEffect } from 'react'
import { BiSolidMessageSquareDots } from "react-icons/bi";
import axios from 'axios'
import Chatbot from '../Chatbot/Chatbot';
import Welcome from '././Welcome';
import { RxCross1 } from "react-icons/rx";
const HomeScreenChatbox = () => {
    // const isMobile = window.innerWidth <= 600;
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true);
    const [showChatWindow, setshowChatWindow] = useState(false);
    const [theme, setTheme] = useState({
        headerColor: "",
        secondMessage: "",
        bgColor: "",
        firstMessage: "",
        nameLabel: "",
        phoneLabel: "",
        emailLabel: "",
        welcomeMessage: "",
        introduceHeading: ""
    });

    const showChatBox = () => {
        setShowWelcomeMessage(false)
        setshowChatWindow(prev => !prev)
    }

    const getChatbotConfig = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/chatbot`
            );

            const chatBotConfig = res.data.chatConfig.chatBotConfig
            // console.log(chatBotConfig, "Theme")
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
                {showChatWindow && (
                    <div
                        // style={{
                        //     position: isMobile ? "fixed" : "absolute",
                        //     bottom: isMobile ? "0" : "50px",
                        //     right: isMobile ? "0" : "5px",
                        //     left: isMobile ? "0" : "auto",
                        //     width: isMobile ? "100vw" : "370px",
                        //     height: isMobile ? "100dvh" : "480px",
                        //     zIndex: 2000,
                        //     borderRadius: isMobile ? "0" : "20px",
                        //     background: "white",
                        //     boxShadow: "0 4px 20px rgba(0,0,0,0.2)"
                        // }}
                    >
                        <Chatbot theme={theme} />
                    </div>
                )}
            </div>
            <div>
                <p> {showWelcomeMessage ? <Welcome chatBoxTheme={theme} /> : <></>}</p>
                <div
                    id="chatToggle"
                    style={{
                        position: "fixed",
                        bottom: "3%",
                        right: "3%",
                        width: "80px",
                        height: "80px",
                        borderRadius: "50%",
                        backgroundColor: "#244779",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "2rem",
                        color: "white",
                        zIndex: 3000,
                        cursor: "pointer"
                    }}
                    onClick={showChatBox}
                >
                    {!showChatWindow ? <BiSolidMessageSquareDots /> : <RxCross1 />}
                </div>
            </div>
        </div >
    )
}

export default HomeScreenChatbox