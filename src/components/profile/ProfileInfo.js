import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaUserCircle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaEdit,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Make sure to import the styles

const ProfileInfo = () => {
  const [info, setInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [editInfo, setEditInfo] = useState({}); // State for holding info to be updated

  const fetchProfileInfo = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/v1/profile/info`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      if (response.status === 200) {
        setInfo(response.data);
        setEditInfo(response.data); // Set the profile info into the form for editing
      }
    } catch (e) {
      console.error("Error fetching profile info:", e);
      toast.error("Error fetching profile info."); // Show error toast
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value }); // Update the state with the edited value
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.patch(
        `${apiUrl}/api/v1/profile/info`,
        editInfo,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (response.status === 200) {
        setInfo(editInfo); // Update the info state with the new values
        setIsModalOpen(false); // Close the modal after success
        toast.success("Profile updated successfully!"); // Show success toast
      }
    } catch (e) {
      console.error("Error updating profile info:", e);
      toast.error("Error updating profile info.", e); // Show error toast
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  return (
    <div className="flex flex-col md:flex-row justify-around gap-6 p-6">
      {/* User Info Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <FaUserCircle className="text-gray-600 text-3xl" />{" "}
          </div>
          <div>
            <p className="font-semibold text-xl text-gray-800">{info?.name}</p>
            <p className="text-gray-500 text-sm">{info?.email}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)} // Open the modal when clicked
            className="ml-auto p-2 text-gray-600 hover:text-blue-600"
          >
            <FaEdit className="text-xl" /> {/* Edit icon */}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Age:</p>
            <p className="font-semibold text-gray-800">{info?.age}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Address:</p>
            <div className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-gray-500" />
              <p className="font-semibold text-gray-800">{info?.address}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Status:</p>
            <p className="font-semibold text-gray-800">{info?.status}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Email:</p>
            <div className="flex items-center space-x-2">
              <FaEnvelope className="text-gray-500" />
              <p className="font-semibold text-gray-800">{info?.email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-gray-600">Phone:</p>
            <div className="flex items-center space-x-2">
              <FaPhone className="text-gray-500" />
              <p className="font-semibold text-gray-800">{info?.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Editing Profile Info */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editInfo.name || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editInfo.email || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editInfo.phone || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editInfo.address || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Age</label>
                <input
                  type="number"
                  name="age"
                  value={editInfo.age || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Status</label>
                <input
                  type="text"
                  name="status"
                  value={editInfo.status || ""}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)} // Close the modal
                  className="text-gray-600 hover:text-blue-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast container to display toasts */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />
    </div>
  );
};

export default ProfileInfo;
