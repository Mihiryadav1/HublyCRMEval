import React, { useEffect, useRef, useState } from 'react'
import styles from "./Dashboard.module.css"
import { IoMail } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Ticket from '../../Components/Ticket/Ticket';
import axios from 'axios'

const Dashboard = () => {
    // States
    const timeoutId = useRef(null)
    const [filter, setFilter] = useState('all')
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('')
    // Functions
    const fetchTickets = async () => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                // console.log(res.data.tickets)
                setTickets(res.data.tickets)
            })

        } catch (err) {
            console.error(err);
        }
        finally {
            setLoading(false)
        }
    }
    const filteredTickets = tickets.filter(ticket => {
        const query = search.toLowerCase();

        // Status filter
        if (filter !== "all" && ticket.status !== filter) return false;

        // Search filter
        return (
            ticket.ticketId?.toLowerCase().includes(query) ||
            ticket.name?.toLowerCase().includes(query) ||
            ticket.email?.toLowerCase().includes(query) ||
            ticket.phone?.toLowerCase().includes(query)
        );
    });


    const searchTicket = (e) => {
        const value = e.target.value;
        if (timeoutId.current) clearTimeout(timeoutId.current);

        timeoutId.current = setTimeout(() => {
            setSearch(value);
            if (value && tickets.length > 0) {
                const found = tickets.some(ticket =>
                    ticket.ticketId?.toLowerCase().includes(value.toLowerCase())
                );
                if (!found) {
                    alert("Ticket not found");
                }
            }

        }, 500);
    };


    useEffect(() => {
        fetchTickets()
    }, [])
    return (
        <div className={styles['dashboard-container']}>
            <div style={{ alignItems: "center", }}>
                <div className='flex' style={{ alignItems: "center" }}><p className="icon" style={{ border: "1px solid #c7c5c5", cursor: "pointer", borderRight: '0', height: "100%", padding: "0.48rem", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}><CiSearch /> </p>
                    <input type="text" style={{ border: "1px solid #c7c5c5", borderTopRightRadius: "10px", borderBottomRightRadius: "10px", borderLeft: "0", margin: "1rem 0", width: "20vw", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} placeholder={`Search by ticketId`} onChange={searchTicket} /></div>
            </div>
            <ul className={styles['ticket-filters']}>
                <span className={styles['icon']}><IoMail /></span>
                <li
                    className={`${styles['filter']} ${filter === "all" ? styles['active-filter'] : ""}`}
                    onClick={() => setFilter("all")}
                >
                    <span>All Tickets</span>
                </li>

                <li
                    className={`${styles['filter']} ${filter === "resolved" ? styles['active-filter'] : ""}`}
                    onClick={() => setFilter("resolved")}
                >
                    <span>Resolved</span>
                </li>

                <li
                    className={`${styles['filter']} ${filter === "unresolved" ? styles['active-filter'] : ""}`}
                    onClick={() => setFilter("unresolved")}
                >
                    <span>Unresolved</span>
                </li>

            </ul>
            <div className={styles['show-tickets']}>
                {
                    loading ? (<div style={{ height: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
                        <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUybGoyYzJhbXR1aWNqYXZtZHo4M3Q5cXJvbzlsZzd3OGR6bXhkMHlzcCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/200.gif" alt="" width='60px' />
                        <span style={{ fontSize: "1.5rem" }}>Loading...</span>
                    </div>) : filteredTickets.length === 0 ? (<p style={{ textAlign: "center", marginTop: "2rem", color: "#777", fontSize: "1.1rem" }}>
                        No tickets found
                    </p>) : (
                        filteredTickets.map(ticket => {
                            return <Ticket key={ticket._id} ticketId={ticket.ticketId} createdAt={ticket.createdAt} createdBy={ticket.name} email={ticket.email} phone={ticket.phone} status={ticket.status} />
                        })
                    )
                }

            </div>
        </div>
    )
}

export default Dashboard