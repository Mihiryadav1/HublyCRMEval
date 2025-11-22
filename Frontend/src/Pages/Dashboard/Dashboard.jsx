import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import { IoMail } from "react-icons/io5";
import Ticket from '../../Components/Ticket/Ticket';
import axios from 'axios'

const Dashboard = () => {

    // States
    const [filter, setFilter] = useState('all')
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);

    // Functions
    const fetchTickets = async () => {
        try {
            const token = sessionStorage.getItem("token");
            await axios.get(`${import.meta.env.VITE_BACKEND_URL}/ticket`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then(res => {
                console.log(res.data.tickets)
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
        if (filter === "all") return true;
        return ticket.status === filter;
    });


    useEffect(() => {
        fetchTickets()
    }, [])
    return (
        <div className={styles['dashboard-container']}>
            <input type="text" style={{ border: "1px solid #c7c5c5", margin:"1rem",width:"20vw" }} />
            <ul className={styles['ticket-filters']}>
                <li className={styles['filter']} style={{
                    display: "flex", justifyContent: "center", alignItems: "center", gap: "5px"
                }} onClick={() => setFilter("all")}>
                    <span className={styles['icon']}><IoMail /></span>
                    <span>All Tickets</span>
                </li>
                <li className={styles['filter']} onClick={() => setFilter("resolved")}> <span>Resolved</span></li>
                <li className={styles['filter']} onClick={() => setFilter("unresolved")}> <span>Unresolved</span></li>
            </ul>
            <div className={styles['show-tickets']}>
                {
                    loading ? (<p>Loading...</p>) : (
                        filteredTickets.map(ticket => {
                            return <Ticket key={ticket._id} ticketId={ticket.ticketId} createdAt={ticket.createdAt} />
                        })
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard