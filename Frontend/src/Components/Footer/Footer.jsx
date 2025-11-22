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
                {Object.entries(sections).map(([title, links]) => (
                    <div className="footer-column" key={title}>
                        <h4>{title}</h4>
                        <ul>
                            {links.map(link => (
                                <li key={link}><a href="#">{link}</a></li>
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