import { useState } from "react";
import axios from "axios";

/* ---------- Stepper Component ---------- */
const Stepper = ({ currentStep }) => {
  const steps = ["User Info", "Security"];

  return (
    <div className="flex items-center justify-between mb-4">
      {steps.map((step, index) => (
        <div key={index} className="flex-1 flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold
              ${
                index <= currentStep
                  ? "bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
          >
            {index + 1}
          </div>
          {index !== steps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-2 ${
                index < currentStep ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

/* ---------- Login Component ---------- */
const Login = () => {
  const [step, setStep] = useState(0);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();

  const handleSubmit = async () => {
    try {
      const payload = {
        name,
        email,
        password,
        address,
        phone,
      };

      console.log("payload==>",payload)

      const create = await axios.post(
        "http://localhost:5000/api/v1/users/create",
        payload
      );

      console.log(create);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-sky-200 space-y-4 p-5 rounded-md shadow-md m-10 w-64">
      <p className="font-semibold text-lg text-center">Login Page</p>

      {/* Stepper */}
      <Stepper currentStep={step} />

      {/* STEP 1 */}
      {step === 0 && (
        <>
          <div>
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="border rounded-md shadow-md w-full"
            />
          </div>

          <div>
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="border rounded-md shadow-md w-full"
            />
          </div>
          <div>
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="border rounded-md shadow-md w-full"
            />
          </div> 

          <button
            onClick={() => setStep(1)}
            className="bg-blue-600 px-4 py-1 rounded-md shadow-md text-white w-full"
          >
            Next
          </button>
        </>
      )}

      {/* STEP 2 */}
      {step === 1 && (
        <>
          <div>
            <p>Address</p>
            <input
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="border rounded-md shadow-md w-full"
            />
          </div> 
           <div>
            <p>Phone</p>
            <input
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              className="border rounded-md shadow-md w-full"
            />
          </div> 

          <div className="flex justify-between gap-2">
            <button
              onClick={() => setStep(0)}
              className="bg-gray-400 px-4 py-1 rounded-md shadow-md text-white w-full"
            >
              Back
            </button>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 px-4 py-1 rounded-md shadow-md text-white w-full"
            >
              Login
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
