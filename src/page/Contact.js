import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="flex-grow flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-6">We’re here to help. Reach out to us anytime.</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex justify-center mt-10 px-4">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Get in Touch</h2>

          {/* Contact Information */}
          <div className="text-gray-700 mb-6 text-center">
            <p className="text-lg"><strong>Address:</strong> 123 Main Street, Anytown, USA</p>
            <p className="text-lg"><strong>Email:</strong> support@rideapp.com</p>
            <p className="text-lg"><strong>Phone:</strong> +1 (555) 123-4567</p>
          </div>

          {/* Contact Form */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea
                placeholder="Enter your message"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
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
