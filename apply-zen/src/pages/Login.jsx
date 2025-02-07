import React, { useState } from "react";
import icon from "../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState(null);

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:4445/api/auth/login", formData);
      // getting the token and storing it.
      const token = res.data.token;
      const newRefreshToken = res.data.refreshToken;

      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", newRefreshToken);

      setMessage("Login successful!");

      setTimeout(() => {
        navigate('/home')
      }, 1500);

    } catch (error) {
      setMessage(error.response.data.message || "An error occoured");
    }
  };

  const handleExplore = async ()=>{
    let tmpData = {
      email: "readonlyuser@gmail.com",
      password: "123456",
    }
    try {
      const res = await axios.post("http://localhost:4445/api/auth/login", tmpData);
      const token = res.data.token;
      const newRefreshToken = res.data.refreshToken;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("refreshToken", newRefreshToken);
        navigate('/home')
    } catch (error) {
      setMessage(error.response.data.message || "An error occoured");
    }

  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 flex items-center justify-center justify-items-center">
      <section className="w-[350px] lg:w-[400px] bg-white mx-auto rounded-lg border-t-8 border-primary px-8 py-6">
        <form
          className="flex flex-col items-center gap-4 tracking-wider "
          onSubmit={handleSubmit}
        >
          <div className=" mb-2">
            <img className="h-8 md:h-10 " src={icon} alt="logo" />
          </div>
          <h1 className="mb-4 text-lg lg:text-xl">Login</h1>
          <div className="flex flex-col items-center gap-2 lg:gap-3 text-xs lg:text-sm w-full lg:w-">
            <label className="w-full" htmlFor="r-name">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
              onChange={handleChange}
              value={formData.email}
              required
            />
            <label className="w-full" htmlFor="r-name">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="bg-gray-100 w-full rounded border-2 border-gray-200 px-4 py-1 lg:py-2"
              onChange={handleChange}
              value={formData.password}
              required
            />
            {
              message&&<p>{message}</p>
            }

            <input
              type="submit"
              value="Submit"
              className="text-center w-full px-4 py-2 bg-primary text-white rounded-sm font-semibold mt-4 lg:py-2.5"
            />

            <button
              className="text-center w-full px-4 py-2 bg-teal-50 text-primary border-2 border-primary rounded-sm mt-4 lg:py-2.5"
              onClick={handleExplore}
            >
              Explore the App
            </button>
            <h3>
              Not a member yet?{" "}
              <Link className="text-blue-500" to={"/register"}>
                Register
              </Link>
            </h3>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Login;
