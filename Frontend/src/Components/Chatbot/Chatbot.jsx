import React from 'react'
import styles from "./Chatbot.module.css"
const Chatbot = ({ theme }) => {
  const { header, bgColor, firstMessage, secondMessage } = theme
  return (
    <div className={styles['chatbot-container']}>
      <div className={styles["chat-header"]} style={{ backgroundColor: `${header}` }}>
        <div className="flex" style={{ alignItems: "center" }}>
          <div className={styles["avatar"]}>
            <img src="/hublychatbot.png" alt="" />
            <p></p>
          </div>
          <div className={styles["chatbot-name"]}>Hubly</div></div>
      </div>
      <div className={styles["messages"]} style={{ backgroundColor: `${bgColor}` }}>
        <div className='flex'>
          <div style={{ alignItems: "center" }}>
            <div className={styles["avatar"]}>
              <img src="/hublychatbot.png" alt="" />
            </div>
          </div>
          <div style={{ flex: 1 }}> <div style={{
            boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            padding: "10px",
            borderRadius: "10px",
            marginBottom: "5px",
            backgroundColor: "white",
            maxWidth: "50%",
            wordBreak: "break-word"
          }}>{firstMessage}</div>
            <div style={{
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              padding: "10px",
              borderRadius: "10px",
              marginBottom: "5px",
              backgroundColor: "white",
              maxWidth: "50%",
              wordBreak: "break-word"
            }}>{secondMessage}</div></div>
        </div>
      </div>
      <div className={styles["textBox"]}>
        <textarea name="message" id="" placeholder='Write a message'></textarea>
      </div>

    </div >
  )
}

export default Chatbot