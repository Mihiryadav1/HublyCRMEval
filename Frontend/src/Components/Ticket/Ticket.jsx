import { memo } from "react"
import styles from "./Ticket.module.css"




const Ticket = memo(({ ticketId, createdAt, createdBy, email, phone, status, avatarUrl }) => {

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata", // IST
            hour: "numeric",
            minute: "numeric",
            // second: "numeric",
            hour12: true,
        });
    };
    return (
        <div className={styles['ticket-container']}>
            <div className={styles['ticket-header']}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}> <p style={{ width: "30px", height: "30px", backgroundColor: status === "resolved" ? "green" : "orange", borderRadius: "50%" }}></p>
                        <b>{ticketId}</b>
                    </div>
                    <div>Posted At <b>{formatDate(createdAt)}</b></div>

                </div>
            </div>
            <div className={styles['ticket-footer']}>
                <div className="flex" style={{ gap: "1.2rem" }}>
                    <img src={avatarUrl} alt="" height="40px" width="40px" style={{ borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                        {/* <div><b>UserName</b>: {createdBy}</div> */}
                        <div><b>Phone</b>: {phone}</div>
                        <div><b>Email</b>: {email}</div>
                    </div>
                </div>
            </div>

        </div >
    )
})

export default Ticket