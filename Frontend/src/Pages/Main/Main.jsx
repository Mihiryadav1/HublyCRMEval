import React from 'react'
const Navbar = React.lazy(() => import('../Navbar/Navbar'));
const Clients = React.lazy(() => import('../../Components/ClientList/Clients'));
const Hero = React.lazy(() => import('../HeroSection/Hero'));
const About = React.lazy(() => import('../About/About'));
const Subscriptionplan = React.lazy(() => import('../SubscriptionPlan/Subscriptionplan'));
const HomeScreenChatbox = React.lazy(() => import("../../Components/ChatComponents/HomeScreenChatbox"))
const Footer = React.lazy(() => import('../../Components/Footer/Footer'));

const Main = () => {

    const getChatbotConfig = async()=>{
        
    }
    return (
        <div>
            <div style={{ position: "fixed", top: "0", width: "100%" }}>
                <Navbar />
            </div>
            <Hero />
            <Clients />
            <About />
            <Subscriptionplan />
            <Footer />
            <HomeScreenChatbox />
        </div>
    )
}

export default Main