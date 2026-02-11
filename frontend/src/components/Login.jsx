import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


/* ---------- Login Component ---------- */
export const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    try {
      setLoading(true);
      setError("");
      
      console.log("Submitting login with:", { email, password }); // Debug log
      
      const payload = {
        email,
        password,
      };

      // const response = await axios.post(
      //   "http://localhost:5000/api/v1/users/login/customer",
      //   payload
      // );

      console.log("Login successful:", response.data); // Debug log
      
      // Store token if your API returns one
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-sky-200 space-y-4 p-10 rounded-md shadow-md w-80">
          <p className="font-semibold text-lg text-center mb-6">Login Page</p>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              minLength={5}
              maxLength={100}
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              minLength={8}
              maxLength={50}
              placeholder="Enter your password"
            />
          </div>

         <Link to="/dashboard"
            type="submit"
            disabled={loading}
            className="bg-blue-600 px-4 py-2 rounded-md shadow-md text-white w-full hover:bg-blue-700 transition mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </Link>
        </div>
      </form>
    </div>
  );
};

