import React from 'react'
import styles from './SignIn.module.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import { toast } from 'react-toastify';

const SignIn = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            try {
                await axios.post(
                    `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                    {
                        name: formData.username,
                        password: formData.password
                    }
                ).then(res => {
                    console.log(res.data.user, "Data");
                    toast("Logged in successfully!", { type: "success" });
                    sessionStorage.setItem("token", res.data.token);
                    sessionStorage.setItem("role", res.data.user.role)
                    sessionStorage.setItem("userId", res.data.user._id)
                    sessionStorage.setItem("email", res.data.user.email)
                })
                //Navigate to dashboard after login
                navigate('/app');

            } catch (err) {
                console.log(err);
            }
        }

    }
    return (
        <div className={styles['signin-container']}>
            <div className={styles['signin-form-container']}>
                <div className={styles['logo']}><img src="/logo.svg" alt="" /></div>
                <div className={styles['signin-form']}>
                    <h2>Sign in to your Plexify</h2>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['input-group']}>
                            <label htmlFor="username">Username</label>
                            <input type="text" name="username" onChange={handleChange} value={formData.username} />
                        </div>
                        <div className={styles['input-group']}>
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleChange} value={formData.password} />
                        </div>
                        <button type="submit" className={styles['submit-btn']}>Log In</button>
                    </form>
                    <p style={{ textAlign: "center", marginTop: "2rem" }}>Don't have an account?{" "}
                        <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
            <div className={styles['sign-banner']}></div>
        </div>
    )
}

export default SignIn