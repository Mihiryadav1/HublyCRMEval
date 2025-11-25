import React, { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import styles from "./Analytics.module.css";
import axios from "axios";

const Analytics = () => {
    const token = sessionStorage.getItem("token");
    const [chartData, setChartData] = useState([]);
    const [resolvedTickets, setResolvedTickets] = useState(0)
    const [totalTickets, setTotalTickets] = useState(0)
    const avgReplyTime = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/analytics/avgReplyTime/`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setChartData(res.data.data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const getAllTickets = async () => {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_URL}/ticket/`,
                { headers: { Authorization: `Bearer ${token}` } }
            ).then(res => {

                const allTickets = res.data.tickets
                console.log(allTickets)
                setTotalTickets(allTickets.length)
                const resolvedTicket = allTickets.filter(ticket => ticket.status === "resolved")
                setResolvedTickets(resolvedTicket.length)
            })
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        avgReplyTime();
        getAllTickets()
    }, []);

    return (
        <div className={styles["analytics-container"]}>
            <h2>Missed Chats</h2>

            <LineChart
                xAxis={[
                    {
                        data: chartData.map((d) => `Week ${d.week}`),
                        scaleType: "point",
                        label: "Week",
                    },
                ]}
                series={[
                    {
                        data: chartData.map((d) => d.avgReplyMinutes),
                        label: "Avg Reply Time (minutes)",
                    },
                ]}
                height={300}
                margin={{ top: 20, bottom: 40, left: 60, right: 20 }}
                grid={{ vertical: true, horizontal: true }}
                sx={{
                    ".MuiLineElement": { stroke: "green" },
                    ".MuiMarkElement": {
                        stroke: "black",
                        fill: "white",
                        r: 4,
                    },
                }}
            />

            <div className={styles["piechart-container"]}>

                <p>For highest customer satisfaction rates you should aim to reply to an incoming customer's message in 15 seconds or less. Quick responses will get you more conversations, help you earn customers trust and make more sales.</p>
               <span>0 secs</span>
            </div>
            <div className={styles["replytime-container"]}>
                <p>A callback system on a website, as well as proactive invitations, help to attract even more customers. A separate round button for ordering a call with a small animation helps to motivate more customers to make calls.</p>
                <div className="pieChart">
                    {totalTickets && (
                        <Gauge
                            width={100}
                            height={100}
                            value={resolvedTickets}
                            valueMax={totalTickets || 1}
                            startAngle={0}
                            endAngle={360}
                            text={`${Math.round((resolvedTickets / (totalTickets || 1)) * 100)}%`}
                            sx={{
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 15,
                                    fontWeight: "bold",
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: "#0cbf0c",
                                },
                            }}
                        />

                    )}
                </div>
            </div>
            <div className={styles["total-chats"]}>
                <p>This metric Shows the total number of chats for all Channels for the selected the selected period.</p>

                <span>{totalTickets} Chats</span>
            </div>

        </div>
    );
};

export default Analytics;