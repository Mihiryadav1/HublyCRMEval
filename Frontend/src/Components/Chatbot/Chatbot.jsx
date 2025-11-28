import React, { memo, useEffect, useState } from 'react'
import styles from "./Chatbot.module.css"
import formStyle from "../ChatComponents/HomeScreenChatbox.module.css"
import { BiSolidSend } from "react-icons/bi"
import axios from 'axios'
import { toast } from 'react-toastify';
const Chatbot = memo(({ theme, disabledforpreview, setChatBoxTheme }) => {
  const isMobile = window.innerWidth <= 600;
  const { headerColor, bgColor, firstMessage, secondMessage } = theme
  const [message, setMessage] = useState('')
  const [firstMessageSent, setFirstMessageSent] = useState(false);

  const [customerForm, setCustomerForm] = useState({
    nameLabel: "",
    name: "",
    emailLabel: "",
    email: "",
    phoneLabel: "",
    phone: "",
    introduceHeading: ""
  })
  const [ticketId, setTicketId] = useState(null)
  const [allMessages, setAllMessages] = useState([])

  //Create Customer Ticket
  const createTicket = async (e) => {
    e.preventDefault()
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/createTicket`,
        {
          name: customerForm.name,
          email: customerForm.email,
          phone: customerForm.phone
        }
      ).then(res => {
        // console.log(res.data.ticket._id)
        sessionStorage.setItem("ticketId", res.data.ticket._id)
        setTicketId(res.data.ticket._id)
        toast("Thankyou! Our team wil get back to you!", { type: "success" });

      })

    } catch (error) {
      console.log(error)
    }
  }
  //Send Message
  const handleSendMessage = async () => {
    if (!firstMessageSent) {
      setAllMessages(prev => [...prev, { text: message, sender: "user" }]);
      setFirstMessageSent(true);
      setMessage("");
      return;
    }
    try {
      const ticketId = sessionStorage.getItem('ticketId')
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/message/${ticketId}`,
        {
          text: message
        }
      ).then(res => {
        // console.log(res, 'sent messages')
        setMessage('')
        getMessages()
      })

    } catch (error) {
      console.log(error)
    }
  }
  //Form Change
  const handleFormChange = async (e) => {
    const { name, value } = e.target
    setCustomerForm(prev => ({ ...prev, [name]: value }))
  }
  //Get messages in Chatbot chatwindow
  const getMessages = async () => {
    try {
      const ticketId = sessionStorage.getItem("ticketId")
      if (ticketId) {
        await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/message/${ticketId}/`
        ).then(res => {
          // console.log(res.data, 'messages')
          setAllMessages(res.data.messages)
        })
      }

    } catch (error) {
      console.log(error)
    }
  }

  //Get customized Form
  const getForm = async () => {
    try {
      await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/chatbot/`
      ).then(res => {
        console.log(res.data.chatConfig.chatBotConfig, 'form')
        const formReponse = res.data.chatConfig.chatBotConfig
        // setAllMessages(res.data.messages)
        setCustomerForm(prev => ({ ...prev, emailLabel: formReponse.emailLabel, nameLabel: formReponse.nameLabel, phoneLabel: formReponse.phoneLabel, introduceHeading: formReponse.introduceHeading }))
      })

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const ticketId = sessionStorage.getItem("ticketId")
    if (ticketId) getMessages()
  }, [])
  useEffect(() => {
    getMessages()
    getForm()
  }, [])
  return (
    <div className={styles['chatbot-container']} style={{ width: isMobile ? "100vw" : "420px" }}>
      <div className={styles["chat-header"]} style={{ backgroundColor: `${headerColor}`, color: `${headerColor === "#000" || headerColor === "#33475B" || headerColor === "#036e5d" ? "white" : "black"}` }}>
        <div className="flex" style={{ justifyContent: "space-between", width: "100%", alignItems: "center" }}>
          <div className="flex" style={{ alignItems: "center" }}>
            <div className={styles["avatar"]}>
              <img src="/hublychatbot.png" alt="" />
              <p></p>
            </div>
            <div className={styles["chatbot-name"]}>Hubly</div></div>
        </div>
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
        <div action="" style={{ borderRadius: "10px", display: "inline-block", padding: "10px", marginTop: "10px" }}>
          <div className="userMessages">
            {
              allMessages.map(message => {
                const isMine = message.sender === "user" ? true : false
                return <div style={{
                  display: "flex",
                  justifyContent: isMine ? "flex-end" : "flex-start"
                }}>
                  <p style={{
                    padding: "10px", boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                    borderRadius: "10px",
                    marginBottom: "5px",
                    backgroundColor: "white",
                    wordBreak: "break-word"
                  }}>{message.text}</p>

                </div>
              })
            }
          </div>
          {/* Customer Form */}
          {
            firstMessageSent && !ticketId && (
              <div className={formStyle['configuration-cards']}>
                <form onSubmit={createTicket}>
                  <h4>{customerForm.introduceHeading}</h4>
                  <div className={formStyle['input-group']}>
                    <label htmlFor="name">{customerForm.nameLabel}</label>
                    <input type="text" name='name' placeholder='Your name' value={customerForm.name} onChange={handleFormChange} />
                  </div>
                  <div className={formStyle['input-group']}>
                    <label htmlFor="phone">{customerForm.phoneLabel}</label>
                    <input type="text" name='phone' placeholder='+1 (000) 10 - 000' value={customerForm.phone} onChange={handleFormChange} />
                  </div>
                  <div className={formStyle['input-group']}>
                    <label htmlFor="email">{customerForm.emailLabel}</label>
                    <input type="email" name='email' placeholder='example@gmail.com' value={customerForm.email} onChange={handleFormChange} />
                  </div>
                  <div style={{ textAlign: "center" }}>  <button className={formStyle['thankBtn']}>Thank You</button></div>
                </form>
              </div>
            )
            // (<p style={{
            //   boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
            //   padding: "10px",
            //   borderRadius: "10px",
            //   marginBottom: "5px",
            //   backgroundColor: "white",
            //   maxWidth: "50%",
            // }}>Thankyou</p>)
          }


        </div>
      </div>
      <div className={styles["textBox"]}>
        <textarea name="message" id="" placeholder='Write a message' value={message} onChange={(e) => {
          setMessage(e.target.value)
        }} disabled={disabledforpreview}></textarea>
        <p className={styles['sendBtn']} onClick={handleSendMessage}><BiSolidSend /></p>
      </div>

    </div >
  )
})

export default Chatbot