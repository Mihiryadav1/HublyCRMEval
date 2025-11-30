import React from 'react'
import styles from './Subscriptionplan.module.css'
const Subscriptionplan = () => {
    return (
        <div className={styles['sub-container']}>
            <div className={styles['sub-content']}>
                <h2>We have plans for everyone!</h2>
                <p>We started with a strong foundation, then simply built all of the sales and <br />marketing tools all businesses need under one platform.</p>
            </div>
            <div className={styles['cards-container']}>
                <div className={styles['sub-card']}>
                    <h3>Starter</h3>
                    <p>Best for local businesses needing to improve their online <br /> reputation.</p>
                    <div className={styles['pricing']}><span>$199</span><sub>/monthly</sub></div>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Unlimited Users</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>GMB Messaging</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Reputation Management</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>GMB Call Tracking</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>24/7 Award Winning Support</span></li>

                    </ul>
                    <button className={styles['select-btn']}>Sign up for starter</button>
                </div>
                <div className={styles['sub-card']}>
                    <h3>GROW</h3>
                    <p>Best for all businesses that want to take full control of their <br /> marketing automation and track their leads, click to close.</p>
                    <div className={styles['pricing']}><span>$399</span><sub>/monthly</sub></div>
                    <ul style={{ marginTop: "10px" }}>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Pipeline Management</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Marketing Automation Campaigns</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Live Call Transfer</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>GMB Messaging</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Embed-able Form Builder</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>Reputation Management</span></li>
                        <li style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "20px" }}><img src="/check.svg" alt="" /><span>24/7 Award Winning Support</span></li>

                    </ul>
                    <button className={styles['select-btn']}>Sign up for starter</button>
                </div>
            </div>

        </div>
    )
}

export default Subscriptionplan