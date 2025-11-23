import React, { useEffect, useState } from "react";
import styles from "./Team.module.css";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { LiaSortSolid } from "react-icons/lia";
import { CiEdit } from "react-icons/ci";
const Team = () => {
  const [team, setTeam] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedSaveId, setSelectedSaveId] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [teamMemberDetails, setTeamMemberDetails] = useState({
    name: "",
    email: "",
    role: ""

  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeamMemberDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const getAllTeamMembers = async () => {
    const token = sessionStorage.getItem("token");
    await axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/team`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const team = res.data.teamMembers;
        console.log(team);
        setTeam(team);
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
      });
  };

  const addTeamMembers = async () => {
    const token = sessionStorage.getItem("token");
    console.log(teamMemberDetails)
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/team/createMember`, teamMemberDetails, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res);
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
  useEffect(() => {
    getAllTeamMembers();
  }, []);
  return (
    <div className={styles["team-container"]}>
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
                  <tr>
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
                        }}
                      >
                        <CiEdit />
                      </button>


                    </td>
                    {selectedId === teamMembers._id && (
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
                  </tr>
                );
              })}
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
                    <option value="user">Member</option>
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
