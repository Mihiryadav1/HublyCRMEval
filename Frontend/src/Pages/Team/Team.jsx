import React, { useEffect, useState } from "react";
import styles from "./Team.module.css";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSortSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
import { toast } from "react-toastify";
const Team = () => {
  const [team, setTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [selectedSaveId, setSelectedSaveId] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [isLoading, setIsLoading] = useState(false)
  const [teamMemberDetails, setTeamMemberDetails] = useState({
    name: "",
    email: "",
    role: ""

  })
  const [editDetails, setEditDetails] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamMemberDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const getAllTeamMembers = async () => {
    setIsLoading(true)
    const token = sessionStorage.getItem("token");
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/team`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const team = res.data.teamMembers;
        console.log(team);
        setTeam(team);
        setIsLoading(false)
      });
  };

  const deleteTeamMember = async (id) => {
    const token = sessionStorage.getItem("token");
    await axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/team/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
        getAllTeamMembers()
      });
  };

  const addTeamMembers = async () => {
    const token = sessionStorage.getItem("token");
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/team/createMember`, teamMemberDetails, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        toast("Team Member added successfully!", { type: "success" });
        getAllTeamMembers()

      });

  }
  const sortTableByColumn = (colKey) => {
    const sorted = [...team].sort((a, b) => {
      const valA = a[colKey]?.toString().toLowerCase();
      const valB = b[colKey]?.toString().toLowerCase();

      if (sortOrder === "asc") return valA.localeCompare(valB);
      return valB.localeCompare(valA);
    });

    setTeam(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  }

  const handleTeamMemberEdit = async (id) => {
    const token = sessionStorage.getItem("token");
    // console.log(editDetails)
    await axios.put(`${import.meta.env.VITE_BACKEND_URL}/team/${id}`, editDetails, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log(res);
        toast("Team member details saved!", { type: "success" });
        getAllTeamMembers()
      });
  }
  useEffect(() => {
    getAllTeamMembers();
  }, []);
  return (
    <div className={styles["team-container"]}>
      {isLoading && (<div style={{ height: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
        <img src="https://media1.giphy.com/media/v1.Y2lkPTZjMDliOTUybGoyYzJhbXR1aWNqYXZtZHo4M3Q5cXJvbzlsZzd3OGR6bXhkMHlzcCZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/L05HgB2h6qICDs5Sms/200.gif" alt="" width='60px' />
        <span style={{ fontSize: "1.5rem" }}>Loading...</span>
      </div>)}
      <h2>Team</h2>


      <div className={styles["team"]}>
        <div className={styles['tableWrapper']}>
          <table>
            <thead>
              <tr>
                <th></th>
                <th className={styles['sortHeader']} onClick={() => sortTableByColumn("name")} style={{ display: "flex", alignItems: "center", gap: "5px" }}>Full Name <LiaSortSolid /></th>
                <th>Phone</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {team.map((teamMembers) => {
                return (

                  (<tr>
                    <td>
                      <img
                        className={styles["profileImage"]}
                        src={teamMembers.profileImage}
                        alt=""
                      />
                    </td>
                    <td>{teamMembers.name}</td>
                    <td>{teamMembers.phone}</td>
                    <td>{teamMembers.email}</td>
                    <td>{teamMembers.role}</td>
                    <td style={{ position: "relative" }}>
                      <button
                        className={styles["icon"]}
                        onClick={() => {
                          // deleteTeamMember(teamMembers._id)
                          setSelectedId(teamMembers._id);
                        }}
                      >
                        <MdDeleteOutline />
                      </button>
                      <button
                        className={styles["icon"]}
                        onClick={() => {
                          console.log('clicked')
                          setSelectedId(null);
                          setIsEditing(true)
                          // setSelectedId(teamMembers._id)
                          setEditDetails({
                            name: teamMembers.name,
                            email: teamMembers.email,
                            role: teamMembers.role,
                            password: ""
                          });
                        }}
                      >
                        <span><CiEdit /></span>
                      </button>


                    </td>
                    {!isEditing && selectedId === teamMembers._id && (
                      <div className={styles["deletepopup"]}>
                        <h3>This teammate will be deleted.</h3>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "flex-end",
                            gap: "10px",
                          }}
                        >
                          <button
                            className={styles["deleteBtn"]}
                            onClick={() => {
                              deleteTeamMember(teamMembers._id);
                              setSelectedId(null);
                            }}
                          >
                            Confirm
                          </button>
                          <button
                            className={styles["cancelBtn"]}
                            onClick={() => {
                              setSelectedId(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}



                    {isEditing && (
                      <div className={styles["addMemberPopup"]}>
                        <h2>Edit Team Member</h2>

                        <div className={styles["form"]}>
                          <div className={styles["input-group"]}>
                            <label>Full Name</label>
                            <input
                              type="text"
                              value={editDetails.name}
                              onChange={(e) =>
                                setEditDetails({ ...editDetails, name: e.target.value })
                              }
                            />
                          </div>

                          <div className={styles["input-group"]}>
                            <label>Email</label>
                            <input
                              type="email"
                              value={editDetails.email}
                              onChange={(e) =>
                                setEditDetails({ ...editDetails, email: e.target.value })
                              }
                            />
                          </div>

                          <div className={styles["input-group"]}>
                            <label>Role</label>
                            <select
                              value={editDetails.role}
                              onChange={(e) =>
                                setEditDetails({ ...editDetails, role: e.target.value })
                              }
                              style={{ padding: "0.5rem", borderRadius: "0.5rem" }}
                            >
                              <option value="">Select Role</option>
                              <option value="user">Member</option>
                              <option value="admin">Admin</option>
                            </select>
                          </div>

                          <div className={styles["input-group"]}>
                            <label>Phone</label>
                            <input
                              type="text"
                              value={editDetails.phone}
                              onChange={(e) =>
                                setEditDetails({ ...editDetails, phone: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                          {/* ✔ Confirm Button → Save changes */}
                          <button
                            className={styles["saveBtn"]}
                            onClick={async () => {
                              handleTeamMemberEdit(selectedId)
                              getAllTeamMembers();
                              setIsEditing(false);
                              setSelectedId(null);
                            }}
                          >
                            Confirm
                          </button>

                          {/* ❌ Cancel Button → Close popup */}
                          <button
                            className={styles["cancelBtn"]}
                            onClick={() => {
                              setIsEditing(false);
                              setSelectedId(null);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                  </tr>)

                );
              })

              }

            </tbody>
          </table>
        </div>
        <div style={{ display: "flex", justifyContent: "end", margin: "1rem 0" }}><button className={styles['addBtn']} onClick={() => {
          setSelectedSaveId(true)
        }}>
          <span className={styles["icon"]}><IoIosAddCircleOutline /></span>
          <span>Add Members</span></button></div>
        {selectedSaveId && (
          <>
            <div className={styles["addMemberPopup"]}>
              <h2>Add Team Members</h2>
              <p style={{ marginTop: "15px" }}>
                Talk with colleagues in a group chat. Messages in
                this group are only visible to it's participants.
                New teammates may only be invited by the
                administrators.
              </p>
              <div className={styles["form"]}>
                <div className={styles["input-group"]}>
                  <label htmlFor="username">User Name</label>
                  <input type="text" placeholder="User name" name="name" value={teamMemberDetails.name} onChange={handleChange} />
                </div>
                <div className={styles["input-group"]}>
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="Email" name="email" value={teamMemberDetails.email} onChange={handleChange} />
                </div>
                <div className={styles["input-group"]}>
                  <label htmlFor="role">Designation</label>
                  <select name="role" id="" style={{ padding: "0.5rem", borderRadius: "0.5rem" }} value={teamMemberDetails.role}
                    onChange={handleChange}>
                    <option value="">Select Role</option>
                    <option value="user" selected>Member</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "10px",
                }}
              >
                <button
                  className={styles["saveBtn"]}
                  onClick={() => {
                    addTeamMembers()
                    setSelectedSaveId(false)
                  }}
                >
                  Save
                </button>
                <button
                  className={styles["cancelBtn"]}
                  onClick={() => {
                    setSelectedSaveId(false)
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}


      </div>
    </div>
  );
};

export default Team;
