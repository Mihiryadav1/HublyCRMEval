import React, { useEffect, useState } from 'react'
import styles from "./Dashboard.module.css"
import { IoMail } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Ticket from '../../Components/Ticket/Ticket';
import axios from 'axios'

const Dashboard = () => {

    // States
    const [filter, setFilter] = useState('all')
    const [tickets, setTickets] = useState([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('')
    let timeoutId;
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

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            setSearch(value);
        }, 400); // debounce delay
    };


    useEffect(() => {
        fetchTickets()
    }, [])
    return (
        <div className={styles['dashboard-container']}>
            <p className="flex" style={{ alignItems: "center" }}>
                <p className="icon" style={{ border: "1px solid #c7c5c5", cursor: "pointer", borderRight: '0', height: "100%", padding: "0.38rem", display: "inline-block", borderBottomLeftRadius: "8px", borderTopLeftRadius: "8px" }}><CiSearch /> </p>
                <input type="text" style={{ border: "1px solid #c7c5c5", borderLeft: "0", margin: "1rem 0", width: "20vw", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }} placeholder={`Search for ticket`} onChange={searchTicket} />
            </p>
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
                            return <Ticket key={ticket._id} ticketId={ticket.ticketId} createdAt={ticket.createdAt} createdBy={ticket.name} email={ticket.email} phone={ticket.phone} status={ticket.status} />
                        })
                    )
                }
            </div>
        </div>
    )
}

export default Dashboard