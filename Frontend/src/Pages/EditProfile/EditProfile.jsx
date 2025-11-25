import React, { useState } from 'react'
import styles from './EditProfile.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
const EditUser = () => {
  const navigate = useNavigate()
  const loggedInUserEmail = sessionStorage.getItem("email")
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: loggedInUserEmail,
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const editProfile = async (e) => {
    e.preventDefault()
    const token = sessionStorage.getItem("token");
    try {
      await axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/team/myProfile`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast("Profile updated successfully!", { type: "success" });
          if (formData.password.trim() !== "") {
            sessionStorage.removeItem("token");
            navigate("/signin");
            return;
          }
          setFormData({
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: '',
          })

        })
    } catch (error) {
      console.log("Error updating user profile", error)
    }
  }
  return (
    <div>
      <form onSubmit={editProfile} className={styles['form']}>
        <p>Edit Profile</p>
        <div className={styles["formWrapper"]}>
          <div className={styles['input-group']}>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" onChange={handleChange} value={formData.firstName} />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" onChange={handleChange} value={formData.lastName} />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={handleChange} value={formData.email} disabled={true} />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" onChange={handleChange} value={formData.password} />
          </div>

          <div className={styles['input-group']}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className={styles['submit-btn']} type="submit">
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser