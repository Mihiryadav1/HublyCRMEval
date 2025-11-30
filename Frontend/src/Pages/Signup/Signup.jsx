import React, { useState } from 'react'
import styles from './Signup.module.css'
import { Link, useNavigate } from 'react-router-dom'
import SignIn from '../SignIn/SignIn';
import { toast } from 'react-toastify';
import axios from 'axios';
const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: type === 'checkbox' ? checked : value,
        }));
        setErrors((prev) => ({ ...prev, [id]: '' }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";
        if (!formData.confirmPassword.trim()) newErrors.confirmPassword = "Confirm your password";

        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        if (!formData.termsAccepted)
            newErrors.termsAccepted = "You must accept the terms & conditions";
        setErrors(newErrors);
        try {
            await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/auth/signup`,
                {
                    name: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password
                }
            ).then(res => {
                // console.log(res.data);
                toast("Account created successfully!", { type: "success" });
                //Navigate to signup after successful signup
                navigate("/signin")
            })

        }
        catch (err) {
            console.log(err)
        }



    }
    return (
        <div className={styles['signin-container']}>
            <div className={styles['signin-form-container']}>
                <div className={styles['logo']}><img src="/logo.svg" alt="" /></div>
                <div className={styles['signin-form']}>
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                        <h2>Create an account</h2>
                        <p><Link to={"/signin"} element={<SignIn />}>Sign in instead</Link></p></div>
                    <form onSubmit={handleSubmit}>
                        <div className={styles['input-group']}>
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" id="firstName" onChange={handleChange} value={formData.firstName} />
                            {errors.firstName && <p className={styles['error']}>{errors.firstName}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="lastName">Last Name</label>
                            <input type="text" id="lastName" onChange={handleChange} value={formData.lastName} />
                            {errors.lastName && <p className={styles['error']}>{errors.lastName}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" onChange={handleChange} value={formData.email} />
                            {errors.email && <p className={styles['error']}>{errors.email}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" onChange={handleChange} value={formData.password} />
                            {errors.password && <p className={styles['error']}>{errors.password}</p>}
                        </div>

                        <div className={styles['input-group']}>
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
                            {errors.confirmPassword && <p className={styles['error']}>{errors.confirmPassword}</p>}
                        </div>

                        <div className={styles['checkbox-group']}>
                            <input type="checkbox" id="termsAccepted" onChange={handleChange} checked={formData.termsAccepted} />
                            <p>By creating an account, I agree to our Terms of Use and Privacy Policy</p>
                            {errors.termsAccepted && <p className={styles['error']}>{errors.termsAccepted}</p>}
                        </div>

                        <button type="submit" className={styles['submit-btn']}>
                            Create an account
                        </button>
                    </form>

                    <p style={{ textAlign: "center", marginTop: "2rem" }}>Don't have an account?{" "}
                        <Link>Sign up</Link></p>
                </div>
            </div>
            <div className={styles['sign-banner']}></div>
        </div >
    )
}

export default Signup