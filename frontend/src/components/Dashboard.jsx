import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Dashboard() {
  const [formData, setFormData] = useState("");
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData) return;

    setSubmissions([...submissions, formData]);
    setFormData("");
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow px-6 py-4 flex justify-between">
        <h1 className="font-semibold text-lg">Form Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Content */}
      <div className="p-6 max-w-xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow mb-6"
        >
          <h2 className="font-semibold mb-4">Submit Form</h2>

          <input
            type="text"
            value={formData}
            onChange={(e) => setFormData(e.target.value)}
            placeholder="Enter something..."
            className="border w-full p-2 rounded mb-4"
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-semibold mb-4">Submissions</h2>

          {submissions.length === 0 ? (
            <p className="text-gray-500">No data yet</p>
          ) : (
            <ul className="list-disc ml-5 space-y-2">
              {submissions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
