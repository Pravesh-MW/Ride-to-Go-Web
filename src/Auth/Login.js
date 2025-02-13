import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Server error. Try again later.");
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    setIsGoogleLoading(true);
    try {
      const response = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ credential: credentialResponse.credential }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("token", data.token);
        toast.success("Google login successful! Redirecting...");
        setTimeout(() => {
          navigate(from, { replace: true });
        }, 2000);
      } else {
        toast.error(data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Server error. Try again later.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleGoogleLoginFailure = () => {
    toast.error("Google login failed. Please try again.");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Login
              </button>

              <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/register" className="text-blue-600 hover:underline">
                  Register here
                </Link>
              </div>
            </form>

            <div className="mt-6">
              <div className="flex items-center justify-center">
                <div className="border-t border-gray-300 flex-grow"></div>
                <span className="mx-4 text-gray-500">OR</span>
                <div className="border-t border-gray-300 flex-grow"></div>
              </div>

              <div className="mt-4">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginFailure}
                  disabled={isGoogleLoading}
                  text={
                    isGoogleLoading ? "Logging in..." : "Continue with Google"
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
