import React, { useState } from 'react'
import styles from "./ChatSettings.module.css"
import Chatbot from '../../Components/Chatbot/Chatbot'
import { MdEdit } from "react-icons/md";
import Welcome from '../../Components/ChatComponents/Welcome';
const headerColors = ["#000", "#fff", "#33475B", "#036e5d"];
import axios from 'axios'
import { toast } from 'react-toastify';
const ChatSettings = () => {
  const [selectedHeaderColor, setSelectedHeaderColor] = useState("#fff");
  const [selectedBgColor, setSelectedBgColor] = useState("#fff");

  const [chatBoxTheme, setChatBoxTheme] = useState({
    headerColor: "#fff",
    bgColor: "#fff",
    firstMessage: "How cani help you ?",
    secondMessage: "Ask me anything",
    welcomeMessage: "Want to chat about Hubly? I'm a chatbot here to help you find your way.",
    introduceHeading: "Introduce Yourself",
    nameLabel: "Your Name",
    phoneLabel: "Your Phone",
    emailLabel: "Your Email",
    submitButtonText: "Thank You"
  });
  const updateLabel = (key, value) => { setChatBoxTheme(prev => ({ ...prev, [key]: value })); };

  const saveChatbotConfig = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/chatbot/chatbotconfig`,
        {
          "headerColor": `${chatBoxTheme.headerColor}`,
          "bgColor": `${chatBoxTheme.bgColor}`,
          "firstMessage": `${chatBoxTheme.firstMessage}`,
          "secondMessage": `${chatBoxTheme.secondMessage}`,
          "welcomeMessage": `${chatBoxTheme.welcomeMessage}`,
          "nameLabel": `${chatBoxTheme.nameLabel}`,
          "emailLabel": `${chatBoxTheme.emailLabel}`,
          "phoneLabel": `${chatBoxTheme.phoneLabel}`,
          "introduceHeading": `${chatBoxTheme.introduceHeading}`,
        }
      ).then(res => {
        console.log(res.data);
        toast("Chatbot settings saved!", { type: "success" });
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={styles['chatbotSettings-container']}>
        <div className={styles['chatbox-preview']}>
          <Chatbot theme={chatBoxTheme} setChatBoxTheme={setChatBoxTheme} disabledforpreview={true} />
        </div>

        <div className={styles['chatbox-messagePreview']} >
          <Welcome chatBoxTheme={chatBoxTheme} />
        </div>
      </div>

      <div className={styles['configurations']}>
        {/* Header Color Card */}
        <div className={styles['configuration-cards']}>
          <p>Header Color</p>
          <div style={{ display: "flex" }}>
            {headerColors.map((item, index) => {
              const isSelected = selectedHeaderColor === item;
              return (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedHeaderColor(item);
                    setChatBoxTheme(prev => ({ ...prev, headerColor: item }));
                  }}
                  style={{
                    backgroundColor: item,
                    width: "40px",
                    height: "40px",
                    marginRight: "20px",
                    marginBottom: "10px",
                    borderRadius: "50%",
                    border: isSelected ? "2px solid #007bff" : "1px solid lightgray",
                    cursor: "pointer"
                  }}
                ></p>
              );
            })}
          </div>
          <p className='flex'>
            <span
              style={{
                backgroundColor: selectedHeaderColor,
                display: "inline-block",
                width: "40px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            ></span>
            <input style={{
              border: "0", marginLeft: "5px",
              alignItems: "center", backgroundColor: "#F6F7F5"
            }} value={selectedHeaderColor} onChange={(e) => {
              setSelectedHeaderColor(e.target.value)
            }} />
          </p>
        </div>
        {/* Background Color Card */}
        <div className={styles['configuration-cards']}>
          <p>Background Color</p>
          <div style={{ display: "flex" }}>
            {headerColors.map((item, index) => {
              const isSelected = selectedBgColor === item;
              return (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedBgColor(item);
                    setChatBoxTheme(prev => ({ ...prev, bgColor: item }));
                  }}
                  style={{
                    backgroundColor: item,
                    width: "40px",
                    height: "40px",
                    marginRight: "20px",
                    marginBottom: "10px",
                    borderRadius: "50%",
                    border: isSelected ? "2px solid #007bff" : "2px solid lightgray",
                    cursor: "pointer"
                  }}
                ></p>
              );
            })}
          </div>
          <p className='flex'>
            <span
              style={{
                backgroundColor: selectedBgColor,
                display: "inline-block",
                width: "40px",
                height: "40px",
                borderRadius: "5px",
                border: "1px solid #ccc"
              }}
            ></span>
            <input style={{
              border: "0", marginLeft: "5px",
              alignItems: "center", backgroundColor: "#F6F7F5"
            }} value={selectedBgColor} onChange={(e) => {
              setSelectedBgColor(e.target.value)
            }} />
          </p>
        </div>
        {/* Custom Message */}
        <div className={styles['configuration-cards']}>
          <p>Customize Message</p>
          <div>
            <input type="text" value={chatBoxTheme.firstMessage} onChange={(e) => {
              setChatBoxTheme(prev => ({ ...prev, firstMessage: e.target.value }))
            }} style={{
              border: "0", margin: "10px 0",
              alignItems: "center", backgroundColor: "#F6F7F5"
            }} /> <span style={{ cursor: "pointer" }}><MdEdit /></span>
          </div>
          <div>
            <input type="text" value={chatBoxTheme.secondMessage} onChange={(e) => {
              setChatBoxTheme(prev => ({ ...prev, secondMessage: e.target.value }))
            }} style={{
              border: "0",
              alignItems: "center", backgroundColor: "#F6F7F5"
            }} /> <span style={{ cursor: "pointer" }}><MdEdit /></span>
          </div>
        </div>
        {/* Customer Form */}
        <div className={styles['configuration-cards']}>
          <input
            type="text"
            value={chatBoxTheme.introduceHeading}
            onChange={(e) => updateLabel("introduceHeading", e.target.value)}
            className={styles.editableInput}
          />
          <form >
            <div className={styles['input-group']}>
              <input
                type="text"
                value={chatBoxTheme.nameLabel}
                onChange={(e) => updateLabel("nameLabel", e.target.value)}
                className={styles.editableInput}
              />
              <input type="text" name='name' placeholder='Your name' />
            </div>
            <div className={styles['input-group']}>
              <input
                type="text"
                value={chatBoxTheme.phoneLabel}
                onChange={(e) => updateLabel("phoneLabel", e.target.value)}
                className={styles.editableInput}
              />
              <input type="text" name='email' placeholder='+1 (000) 10 - 000' />
            </div>
            <div className={styles['input-group']}>
              <input
                type="text"
                value={chatBoxTheme.emailLabel}
                onChange={(e) => updateLabel("emailLabel", e.target.value)}
                className={styles.editableInput}
              />
              <input type="email" name='phone' placeholder='example@gmail.com' />
            </div>

          </form>
        </div>

        {/* Welcome Message */}
        <div className={styles['configuration-cards']}>
          <p>Welcome Message</p>
          <div className='flex' style={{ alignItems: "center", gap: "1rem" }}>
            <div className="flex" style={{ backgroundColor: "#F6F7F5", padding: "0.5rem", borderRadius: "10px", width: "90%", justifyContent: "space-between" }}>
              <textarea type="text" value={chatBoxTheme.welcomeMessage} maxLength={100} onChange={(e) => {
                setChatBoxTheme(prev => ({ ...prev, welcomeMessage: e.target.value }))
              }} style={{
                border: "0", margin: "10px 0",
                alignItems: "center", backgroundColor: "#F6F7F5", height: "4rem", width: "100%", resize: "none", outline: "none", padding: "5px"
              }} />
              <span style={{ backgroundColor: "#F6F7F5", color: "#9b9a9a", fontSize: "0.8rem", heigh: "4rem" }}>{chatBoxTheme.welcomeMessage.length}/100</span>
            </div>
            <span style={{ cursor: "pointer" }}><MdEdit /></span>
          </div>
          <div className="flex" style={{ justifyContent: "flex-end" }}><button className={styles['saveconfigBtn']} onClick={saveChatbotConfig}>Save</button></div>
        </div>
      </div >
    </>
  )
}

export default ChatSettings;
