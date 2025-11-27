import React from 'react';
import styles from './Footer.module.css';

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
            </div>
            <div className={styles["footer-social"]}>
                {socialIcons.map(icon => (
                    <a href="#" key={icon} className={`icon-${icon}`} aria-label={icon}></a>
                ))}
            </div>
        </footer>
    );
};

export default Footer;