import React, { useState } from "react";
import Picker from "react-mobile-picker";
import axios from "axios";
import styles from "./TimePicker.module.css";

const TimePicker = ({ value, setValue, setSaving, saving, handleSave }) => {


    return (
        <div className={styles["timer-box"]}>
            <p className="label">Missed chat timer</p>
            <div className="picker-container">
                <Picker value={value} onChange={setValue} wheelMode="natural">
                    <Picker.Column name="hour">
                        {Array.from({ length: 13 }, (_, i) =>
                            String(i).padStart(2, "0")
                        ).map((num) => (
                            <Picker.Item key={num} value={num}>
                                {num}
                            </Picker.Item>
                        ))}
                    </Picker.Column>

                    <Picker.Column name="minute">
                        {Array.from({ length: 60 }, (_, i) =>
                            String(i).padStart(2, "0")
                        ).map((num) => (
                            <Picker.Item key={num} value={num}>
                                {num}
                            </Picker.Item>
                        ))}
                    </Picker.Column>

                    <Picker.Column name="second">
                        {Array.from({ length: 60 }, (_, i) =>
                            String(i).padStart(2, "0")
                        ).map((num) => (
                            <Picker.Item key={num} value={num}>
                                {num}
                            </Picker.Item>
                        ))}
                    </Picker.Column>

                </Picker>
            </div>


        </div>
    );
};

export default TimePicker;
