import React, { memo } from 'react'
import styles from "./Welcome.module.css"
const Welcome = memo(({ chatBoxTheme }) => {
    return (
        <div className={styles["message"]} >
            <div className={styles["avatar"]} style={{ textAlign: "center", position: "relative" }}>
                <img src="/hublychatbot.png" alt="" style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%,-100%)" }} />
                <p style={{ margin: "1rem", textAlign: "left" }}>{chatBoxTheme.welcomeMessage}</p>
            </div>
        </div>
    )
})

export default Welcome