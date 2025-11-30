import React from 'react'
import styles from './About.module.css'
const About = () => {
    return (
        <div className={styles['about-container']}>
            <div className={styles['about-content']}>
                <h2>At its core, Hubly is a robust CRM <br />solution</h2>
                <p>Hubly helps businesses streamline customer interactions, track leads, and automate tasks—saving you time and maximizing revenue. Whether you’re a startup or an enterprise, Hubly adapts to your needs, giving you the tools to scale efficiently.</p>
            </div>
            <div className={styles['about-details']}>
                <div className={styles['detail-item']}>
                    <div className={styles['detail-wrapper']}>
                        <h3>MULTIPLE PLATFORMS TOGETHER!</h3>
                        <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                    </div>
                    <div className={styles['detail-wrapper']}>
                        <h4>CLOSE</h4>
                        <p>Email communication is a breeze with our fully integrated, drag & drop email builder.</p>
                    </div>
                    <div className={styles['detail-wrapper']}>
                        <h4>NURTURE</h4>
                        <p>Capture leads using our landing pages, surveys, forms, calendars, inbound phone system & more!</p>
                    </div>
                </div>
                <div className={styles['detail-image']}>
                    <img src="/AboutBucket.svg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default About