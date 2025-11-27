import React, { useEffect, useState } from 'react'
import styles from "./ContactCenter.module.css"
import { BiSolidSend } from "react-icons/bi";
import { IoCallOutline, IoMailOutline, IoHomeOutline } from "react-icons/io5";
import { MdOutlinePersonPin } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import axios from "axios"
const ContactCenter = () => {
  const navigate = useNavigate()
  const [tickets, setTickets] = useState([])
  const [activeTicket, setActiveTicket] = useState(null);
  const [showAssignPopup, setShowAssignPopup] = useState(false);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [isMissedChat, setIsMissedChat] = useState(false)
  const [team, setTeam] = useState([])
  const role = sessionStorage.getItem("role");
  const userId = sessionStorage.getItem("userId");

  const isResolved = activeTicket?.status === "resolved";
  const assignedToOther =
    role === "admin" &&
    String(activeTicket?.assignedTo?._id) !== String(userId);
  const noAccess = isResolved || assignedToOther;


  // Fetch Tickets
  const getAllTickets = async () => {
    const token = sessionStorage.getItem("token")
    await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/ticket/`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      console.log(res.data, "ticketsabbe")
      setTickets(res.data.tickets);

    }).catch(err => {
      console.log(err)
    })
    // Auto select first ticket

  }
  //Team Members
  const getAllTeamMembers = async () => {
    const token = sessionStorage.getItem("token")
    await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/team`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      const team = res.data.teamMembers
      setTeam(team)
    })
  }

  const handleAssign = async (memberId) => {
    const token = sessionStorage.getItem("token")
    if (!memberId) return;
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/ticket/assign/${activeTicket._id}`,
        { assignedTo: memberId },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res => {
        const updatedAssignedTo = res.data.assignedTo;

        // Update active ticket
        const updatedTicket = {
          ...activeTicket,
          assignedTo: updatedAssignedTo
        };
        setActiveTicket(updatedTicket);

        // Also update tickets list
        setTickets(prev =>
          prev.map(t => t._id === updatedTicket._id ? updatedTicket : t)
        );
      })

    } catch (error) {
      console.error("Assign error:", error);
    }
  }

  const handleStatusChange = async (newStatus) => {
    const token = sessionStorage.getItem("token")

    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/ticket/${activeTicket._id}/status`,
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      const updatedTicket = {
        ...activeTicket,
        status: newStatus
      };

      // Update selected ticket state
      setActiveTicket(updatedTicket);

      // Update list of tickets
      setTickets(prev =>
        prev.map(t => t._id === activeTicket._id ? updatedTicket : t)
      );
    })


  };

  const getAllMessagesForTicketId = async (ticketId) => {
    const token = sessionStorage.getItem("token");

    await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/message/${ticketId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    ).then(res => {
      const getMessage = res.data.messages
      console.log(res.data.messages, 'message')
      setMessages(getMessage)

    }
    );
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const token = sessionStorage.getItem("token");

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/message/team/${activeTicket._id}`,
        {
          text: newMessage
        },
        { headers: { Authorization: `Bearer ${token}` } }
      ).then(res => {
        console.log(res)
        setMessages(prev => [...prev, res.data.message]);
        getAllMessagesForTicketId(activeTicket._id)
        setNewMessage('');
      })


    } catch (err) {
      console.log("Send Message Error:", err);
    }
  };


  // Generate Avatar
  const avatars = [
    "/avatar1.jpg",
    "/avatar2.jpg",
    "/avatar3.jpg",
    "/avatar4.jpg",
  ];

  const getAvatar = (name) => {
    if (!name) return avatars[0];
    const index = name.charCodeAt(0) % avatars.length;
    return avatars[index];
  };

  useEffect(() => {
    getAllTickets();
    //If the role is admin then only get team members
    if (role === "admin") {
      getAllTeamMembers();
    }
  }, []);

  // fetch messages whenever activeTicket changes
  useEffect(() => {
    if (activeTicket?._id) {
      getAllMessagesForTicketId(activeTicket._id);
    }
  }, [activeTicket]);


  useEffect(() => {
    if (tickets.length > 0 && !activeTicket) {
      setActiveTicket(tickets[0]);
    }
  }, [tickets]);


  return (
    <div className={styles['contactcenter-container']}>

      {/* //Chats Manager - Left Section */}
      <div className={styles['chats-container']}>
        <span>Chats</span>
        <div className={styles['ticketList']}>
          {tickets.map(ticket => {
            const lastMessage = ticket.messages?.[ticket.messages.length - 1];
            return (<div
              key={ticket._id}
              className={`${styles.ticketItem} ${activeTicket?._id === ticket._id ? styles.active : ""}`}
              onClick={() => {
                setActiveTicket(ticket)
              }}
            >
              <img
                src={getAvatar(ticket.name)}
                alt={ticket.name}
                className={styles['avatar']}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ color: "#3A7ABD", fontWeight: "500", fontSize: "1rem" }}>{ticket.name}</div>
                <div className={styles.ticketLastMessage}>
                  {lastMessage ? lastMessage.text : "No messages yet"}
                </div>
              </div>
            </div>)
          })}
        </div>
      </div>


      {/* //Chatbox - Middle Section */}
      <div className={styles['chatbox']}>
        {/* Header */}
        <div className={styles["header"]}>
          <span> {
            activeTicket && (<>
              <p>{activeTicket.ticketId}</p>
            </>)
          }</span>
          <span className={styles['icon']} onClick={() => {
            navigate("/app")
          }}><IoHomeOutline /></span>
        </div>
        {/* Message Display */}
        {/* Warning Banner (if no access) */}
        {isResolved && (
          <p className={styles['chat-disabled']}>This chat has been resolved</p>
        )}

        {assignedToOther && !isResolved && (
          <p className={styles['chat-disabled']}>
            This chat is assigned to another team member. You no longer have access.
          </p>
        )}

        {/* Messages Display Area */}
        <div className={styles['messagesContainer']}>
          {messages.map(msg => {
            const isMine = msg.sender === "team";
            return (
              <div
                key={msg._id}
                className={`${styles.messageRow} ${isMine ? styles.mine : styles.theirs
                  }`}
              >
                <div className={styles.messageBubble}>
                  <p className={styles.messageText}>{msg.text}</p>
                  <span className={styles.messageTime}>
                    {msg.createdAt
                      ? new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                      : ""}
                  </span>
                </div>
                {msg.sender !== "team" && (<div style={{ color: "Red", fontSize: ".8rem", display: "flex", alignItems: "flex-end", paddingLeft: "1rem" }}>{msg.missed ? "missed chat" : ""}</div>)}
              </div>
            );
          })}
        </div>

        {/* //Input for chatting */}
        <div className={styles["input"]}>
          <input onChange={(e) => {
            setNewMessage(e.target.value)
          }} value={newMessage} placeholder='Type Here' disabled={noAccess}></input>
          <button className={styles["icon"]} style={{ fontSize: "2rem", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleSendMessage} disabled={!newMessage.length}> < BiSolidSend /></button>
        </div>
      </div>


      {/* //Ticket Status Controller  - Right Section*/}
      <div className={styles['ticket-assign']}>
        <div>
          {activeTicket && (
            <>
              <div className="flex" style={{ alignItems: "center", gap: "10px", marginBottom: "1.2rem" }}> <img
                src={getAvatar(activeTicket.name)}
                alt={activeTicket.name}
                className={styles.avatar}
              />

                <p>{activeTicket.name}</p>
              </div>
              <p>Details</p>
              <p className={styles['active-ticketDetails']}>
                <span className={styles['icon']}> <MdOutlinePersonPin /></span><span className={styles['detail']}>{activeTicket.name}</span></p>
              <p className={styles['active-ticketDetails']}> <span className={styles['icon']}> <IoCallOutline /></span>
                <span className={styles['detail']}>{activeTicket.phone}</span></p>
              <p className={styles['active-ticketDetails']}> <span className={styles['icon']}> <IoMailOutline /></span>
                <span className={styles['detail']}>{activeTicket.email}</span></p>
            </>
          )}
        </div>
        <div style={{ marginTop: "1rem" }}>
          <p>Teammates</p>
          <div> {activeTicket && role === "admin" && (
            <select
              value={activeTicket.assignedTo?._id || ""}
              onChange={(e) => {
                setSelectedMember(e.target.value);
                setShowAssignPopup(true);
              }}
              className={styles['assignDropdown']}
            >
              <option value="">Select Member</option>

              {team.map(member => (
                <option key={member._id} value={member._id}>
                  {member.name}
                </option>
              ))}
            </select>)}</div>
        </div>
        {showAssignPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
              <h3>Assign Ticket?</h3>
              <p>Do you want to assign this ticket to selected team member?</p>

              <div className={styles.popupButtons}>
                <button
                  onClick={() => {
                    handleAssign(selectedMember);
                    setShowAssignPopup(false);
                  }}
                >
                  Yes, Assign
                </button>

                <button
                  onClick={() => {
                    setSelectedMember(null);
                    setShowAssignPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}


        <div>
          {activeTicket && (
            <select
              value={activeTicket.status}
              onChange={(e) => {
                setSelectedStatus(e.target.value);
                setShowStatusPopup(true);
              }}
              className={styles['statusDropDown']}
            >
              <option value="unresolved">Unresolved</option>
              <option value="resolved">Resolved</option>
            </select>
          )}
        </div>
        {showStatusPopup && (
          <div className={styles.popupOverlay}>
            <div className={styles.popupBox}>
              <h3>Change Status?</h3>
              <p>
                Are you sure you want to mark this ticket as{" "}
                <strong>{selectedStatus}</strong>?
              </p>

              <div className={styles.popupButtons}>
                <button
                  onClick={() => {
                    handleStatusChange(selectedStatus);
                    setShowStatusPopup(false);
                  }}
                >
                  Yes, Change
                </button>

                <button
                  onClick={() => {
                    setSelectedStatus(null);
                    setShowStatusPopup(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

    </div >
  )
}

export default ContactCenter