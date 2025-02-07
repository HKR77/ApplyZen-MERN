import React, { useEffect, useRef, useState } from "react";
import icon from "../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputDetails, setInputDetails] = useState({
    firstName: "",
    lastName: "",
    location: "",
    email: "",
    password: "",
    joinedDate: null,
  });

  const [message, setMessage] = useState(null)

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4445/api/auth/register",
        inputDetails
      );
      setMessage(res.data.message);

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };
  const handleChange = async (e) => {
    setInputDetails({
      ...inputDetails,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10">
      <section className="w-[350px] lg:w-[400px] bg-white mx-auto rounded-lg border-t-8 border-primary px-8 py-6">
        <form
          className="flex flex-col items-center tracking-widest "
          onSubmit={handleSubmit}
        >
          <div className=" mb-4">
            <img className="h-8 md:h-10 " src={icon} alt="logo" />
          </div>
          <h1 className="mb-4 text-sm lg:text-lg">Register</h1>
          <div className="flex flex-col items-center gap-2 lg:gap-3 text-xs lg:text-sm w-full">
            <label className="w-full" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={inputDetails.firstName}
              onChange={handleChange}
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
            />
            <label className="w-full" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              value={inputDetails.lastName}
              onChange={handleChange}
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
            />
            <label className="w-full" htmlFor="location">
              Location
            </label>
            <input
              id="location"
              type="text"
              value={inputDetails.location}
              onChange={handleChange}
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
            />
            <label className="w-full" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={inputDetails.email}
              onChange={handleChange}
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
            />
            <label className="w-full" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={inputDetails.password}
              onChange={handleChange}
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
            />

            {
              message&&(<><p className="text-primary rounded bg-teal-50 w-full text-center px-4 py-2">{message}</p></>)
            }
            <input
              type="submit"
              value="Submit"
              className="text-center w-full px-4 py-2 bg-primary text-white rounded-sm font-semibold mt-4 lg:py-2.5"
            />

            <h3>
              Already a member?{" "}
              <Link className="text-blue-500" to={"/login"}>
                Login
              </Link>
            </h3>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
