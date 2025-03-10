import React, { useEffect } from "react";
import login_icon from "../assets/login_icon.png"; 
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config";

function LandingPage() {  
  const [showPassword,setShowPassword] = useState(false)
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const navigate = useNavigate()
  
  async function handleLogin(e) {
    e.preventDefault();
    setError(""); 
    try {
      const response = await axios.post(`${BASE_URL}/sign_in`, {
        super_admin: { email, password },
      });
      console.log(response.data)
      localStorage.setItem("auth_token", response.data.auth_token);
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setError(
        err.response?.data?.message || "An error occurred. Please try again."
      );
    }
  }

  useEffect((() => {
    const auth_token = localStorage.getItem("auth_token")
    auth_token ? navigate('/dashboard') : ""
  }),[])
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-1/3 flex flex-col justify-center items-center bg-white p-8">
        <img src={login_icon} alt="Logo" className="w-20 h-20 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form className="w-full max-w-xs space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="Enter your password"
                autoComplete="current-password" 
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* Toggle Password Visibility Icon */}
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
      </div>

      {/* Right Side - Image Cover */}
      <div className="w-2/2 flex justify-center items-center bg-gray-100">
        <img src={login_icon} alt="Background" className="max-w-[80%] max-h-[80%] object-cover" />
      </div>
    </div>
  );
}

export default LandingPage;
