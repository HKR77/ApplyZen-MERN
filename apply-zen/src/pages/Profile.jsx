import React, { useContext, useEffect, useRef, useState } from "react";
import Loading from "../components/Loading";
import { FaEdit } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, postUpdateProfile } from "../utility/homeUtils";

const Profile = () => {
  const { user, setUser, setAllJobs } = useContext(AppContext);
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    setEditableUser(user);
    return () => {};
  }, [user]);

  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
     await postUpdateProfile(editableUser)
     await fetchUserProfile(setUser)
     toggleEditing()
  };
  const handleChange = (e) => {
    setEditableUser({ ...editableUser, [e.target.id]: e.target.value });
  };
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("refreshToken");
    setUser(null);
    setAllJobs([]);
    navigate("/");
  };

  return (
    <>
      {" "}
      {editableUser ? (
        <section
          className={`bg-white dark:bg-zinc-600 dark:text-white rounded-lg px-4 lg:px-8 py-8 tracking-wider`}
        >
          {isEditing ? (
            <>
              <section className=" flex gap-4">
                <button
                  className="px-4 py-2 border-2 text-primary border-primary bg-teal-50 rounded cursor-pointer"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  className="px-4 py-2 border-2 text-red-600 border-red-600 bg-red-50 rounded cursor-pointer"
                  onClick={()=>{toggleEditing(); setEditableUser(user)}}
                >
                  Cancel
                </button>
              </section>
            </>
          ) : (
            <>
              <section>
                <button
                  className="px-4 py-2 border-2 text-primary border-primary bg-teal-50 rounded flex items-center gap-2 cursor-pointer"
                  onClick={toggleEditing}
                >
                  <FaEdit className=" inline" /> Edit
                </button>
              </section>
            </>
          )}

          <form className="mt-3">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <li className="flex flex-col gap-1   grow">
                <label htmlFor="firstName">First name:</label>
                <input
                  type="text"
                  id="firstName"
                  value={editableUser.firstName}
                  className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </li>
              <li className="flex flex-col  gap-1   grow">
                <label htmlFor="lastName">Last name:</label>
                <input
                  type="text"
                  id="lastName"
                  value={editableUser.lastName}
                  className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </li>
              <li className="flex flex-col  gap-1   grow">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  value={editableUser.location}
                  className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </li>
              <li className="flex flex-col gap-1   grow">
                <label htmlFor="email">First name:</label>
                <input
                  type="text"
                  id="email"
                  value={editableUser.email}
                  className="border-2 border-gray-300 bg-gray-50 rounded px-4 py-1 dark:bg-zinc-800"
                  disabled={!isEditing}
                  onChange={handleChange}
                />
              </li>
            </ul>
          </form>
          <button
            className="bg-red-600 font-semibold px-4 py-2 rounded mt-4 text-white cursor-pointer"
            onClick={handleLogout}
          >
            Log out
          </button>
        </section>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Profile;
