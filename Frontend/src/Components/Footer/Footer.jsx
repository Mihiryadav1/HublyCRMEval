import React from 'react';
import styles from './Footer.module.css';
import { CiMail, CiTwitter } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { FiYoutube } from "react-icons/fi";
import { AiOutlineDiscord } from "react-icons/ai";
import { FaFigma } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
const Footer = () => {
    const sections = {
        Product: [
            'Universal checkout',
            'Payment workflows',
            'Observability',
            'UpliftAI',
            'Apps & integrations',
        ],
        'Why Primer': [
            'Expand to new markets',
            'Boost payment success',
            'Improve conversion rates',
            'Reduce payments fraud',
            'Recover revenue',
        ],
        Developers: [
            'Primer Docs',
            'API Reference',
            'Payment methods guide',
            'Service status',
            'Community',
        ],
        Resources: ['Blog', 'Success stories', 'News room', 'Terms', 'Privacy'],
        Company: ['Careers'],
    };

    const socialIcons = [
        'email', 'linkedin', 'twitter', 'youtube', 'discord', 'github', 'instagram',
    ];

    return (
        <footer className={styles["footer"]}>
            <div className={styles["footer-columns"]}>
                <div style={{ gridRowStart: "0", gridRowEnd: "2", gridColumnStart: "0" }}>
                    <img src="./logo.svg" alt="" />
                </div>
                {Object.entries(sections).map(([title, links]) => (
                    <div className="footer-column" key={title}>
                        <p className={['title']}>{title}</p>
                        <ul>
                            {links.map(link => (
                                <p key={link}>{link}</p>
                            ))}
                        </ul>
                    </div>
                ))}

                <div className={styles["footer-social"]}>
                    <span className={styles["icon"]}><CiMail /></span>
                    <span className={styles["icon"]}><CiTwitter /></span>
                    <span className={styles["icon"]}><FaInstagram /></span>
                    <span className={styles["icon"]}><SlSocialLinkedin /></span>
                    <span className={styles["icon"]}><FiYoutube /></span>
                    <span className={styles["icon"]}><AiOutlineDiscord /></span>
                    <span className={styles["icon"]}><FaFigma /></span>

                    {/* {socialIcons.map(icon => (
                    ))} */}
                </div>
            </div>
        </footer >
    );
};

export default Footer;