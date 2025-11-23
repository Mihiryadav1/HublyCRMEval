import React, { useState } from 'react'
import { BiSolidMessageSquareDots } from "react-icons/bi";
const HomeScreenChatbox = () => {
    const [showWelcomeMessage, setShowWelcomeMessage] = useState(true)

    const showChatWindow = () => {
        setShowWelcomeMessage(false);
    }
    const fetchChatBotSettings = async () => {
        try {

        } catch (error) {

        }
    }
    return (
        <div>
            <p style={{ position: "fixed", right: "10%", bottom: "20%" }}> {showWelcomeMessage ? <>Welcome</> : <></>}</p>
            <div style={{ position: "fixed", bottom: "2%", right: "2%", width: "80px", height: "80px", borderRadius: "50%", backgroundColor: "#244779", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "2rem", color: "white" }} onClick={showChatWindow}>
                {/* <Welcome /> */}

                <BiSolidMessageSquareDots />
            </div>
        </div>
    )
}

export default HomeScreenChatbox