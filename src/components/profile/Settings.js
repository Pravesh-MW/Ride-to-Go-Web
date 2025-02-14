import axios from "axios";

// Settings Component
function Settings({ settings, setSettings }) {
    const handleSave = async () => {
      try {
        await axios.post(
          "http://localhost:5000/profile/settings",
          { settings },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        alert("Settings updated successfully!");
      } catch (error) {
        console.error("Error updating settings:", error);
        alert("Failed to update settings. Please try again.");
      }
    };
  
    return (
      <div>
        <div className="mb-4">
          <label className="block text-gray-700">Notifications</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={settings.notifications}
            onChange={(e) =>
              setSettings({ ...settings, notifications: e.target.value })
            }
          >
            <option value="enabled">Enabled</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Theme</label>
          <select
            className="w-full p-2 border rounded-lg"
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value })
            }
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    );
  }

  export default Settings;