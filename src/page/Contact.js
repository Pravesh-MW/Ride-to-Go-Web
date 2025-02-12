import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Message sent successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex-grow flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold">Contact Us</h1>
          <p className="text-xl mt-2">
            We’re here to help. Reach out to us anytime.
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Get in Touch
          </h2>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-semibold mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-semibold mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-semibold mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Enter your message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;
