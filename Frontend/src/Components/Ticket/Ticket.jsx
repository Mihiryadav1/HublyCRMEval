import { memo } from "react"
import styles from "./Ticket.module.css"
const Ticket = memo(({ ticketId, createdAt, createdBy, email, phone, status }) => {

    return (
        <div className={styles['ticket-container']}>
            <div className={styles['ticket-header']}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", }}> <p style={{ width: "30px", height: "30px", backgroundColor: status === "resolved" ? "green" : "orange", borderRadius: "50%" }}></p>
                        <span>{ticketId}</span>
                    </div>
                    <div>Date {createdAt.split("T")[1]}</div>
                </div>
            </div>
            <div className={styles['ticket-footer']}>
                <div>{createdBy}</div>
                <div>{phone}</div>
                <div>{email}</div>
            </div>

        </div>
    )
})

export default Ticket