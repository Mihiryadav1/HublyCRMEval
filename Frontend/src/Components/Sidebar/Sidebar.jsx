import React from 'react'
import styles from './Sidebar.module.css';
import { IoHomeSharp, IoSettings, IoStatsChart, IoPeopleSharp, IoChatboxEllipses } from "react-icons/io5";
import { RiRobot3Fill } from "react-icons/ri";
import { Link } from "react-router-dom"
const Sidebar = () => {
    return (

        <div className={styles['sidebar-container']}>
            <img src="/HublyIcon.svg" alt="" />
            <ul>
                <li>
                    <Link to="/app" className={styles['link']}>
                        <span className={styles['icon']}><IoHomeSharp /></span>
                        <span className={styles['label']}>Home</span>
                    </Link>
                </li>

                <li>
                    <Link to="/app/contactcenter" className={styles['link']}>
                        <span className={styles['icon']}><IoChatboxEllipses /></span>
                        <span className={styles['label']}>Contact Center</span>
                    </Link>
                </li>

                <li>
                    <Link to="/app/analytics" className={styles['link']}>
                        <span className={styles['icon']}><IoStatsChart /></span>
                        <span className={styles['label']}>Analytics</span>
                    </Link>
                </li>

                <li>
                    <Link to="/app/chatbot" className={styles['link']}>
                        <span className={styles['icon']}><RiRobot3Fill /></span>
                        <span className={styles['label']}>Chat bot</span>
                    </Link>
                </li>

                <li>
                    <Link to="/app/team" className={styles['link']}>
                        <span className={styles['icon']}><IoPeopleSharp /></span>
                        <span className={styles['label']}>Team</span>
                    </Link>
                </li>

                <li>
                    <Link to="/app/settings" className={styles['link']}>
                        <span className={styles['icon']}><IoSettings /></span>
                        <span className={styles['label']}>Settings</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar