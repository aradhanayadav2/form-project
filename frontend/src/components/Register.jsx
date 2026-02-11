import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export const Registers = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        username,
        email,
        password,
        address,
      };

     axios.post("http://localhost:5000/api/v1/users/create", payload)

      console.log("Registration successful:", response.data);

      // If token is returned
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Redirect after successful registration
      navigate("/dashboard");

    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error.response?.data?.message ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit}>
        <div className="bg-sky-200 space-y-4 p-10 rounded-md shadow-md w-80">
          <p className="font-semibold text-lg text-center mb-6">
            Register Page
          </p>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}

          {/* Username */}
          <div>
            <label className="block mb-2 font-medium">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              minLength={3}
              maxLength={100}
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              minLength={8}
              placeholder="Enter your password"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-2 font-medium">Address</label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"  // ✅ fixed
              className="border rounded-md shadow-md w-full px-3 py-2"
              required
              placeholder="Enter your address"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 px-4 py-2 rounded-md shadow-md text-white w-full hover:bg-blue-700 transition mt-4 disabled:opacity-50"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        <div className="flex items-center justify-center gap-2 mt-4">
  <p className="text-sm">Already Registered?</p>
   <Link to="/login" className="text-blue-600 font-medium hover:underline">
    Login
  </Link>
</div>

        </div>
      </form>
    </div>
  );
};


