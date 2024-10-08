import { useState } from "react";
import { toast } from 'sonner'
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FormErrorDisplay from "../../../components/FormErrorDisplay";
import handleInputChange from "../../../utils/formUtils/handleInputChange";
import handleFormErrors from "../../../utils/formUtils/handleFormErrors";
import { doctorLoginSchema } from "../../../validations/doctorLoginSchema";
import { setLoading } from "../../../redux/slices/commonSlice";
import { setLoggedIn, setDoctorData } from "../../../redux/slices/doctorSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [serverResponse, setServerResponse] = useState("");

  const handleChange = (e) => {
    handleInputChange(e, formData, setFormData, setServerResponse, setErrors);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await doctorLoginSchema.validate(formData, { abortEarly: false });
      setErrors({});

      const response = await axios.post(`http://localhost:3000/api/doctor/login`, formData);

      console.log("response:", response);

      if (response && response.status === 200) {
        localStorage.setItem(`doctorJwtToken`, response?.data?.jwtToken);
        localStorage.setItem(`doctorData`, response?.data?.data?._id);

        // Dispatch actions to update state
        dispatch(setLoading(true));
        dispatch(setLoggedIn(true));
        dispatch(setDoctorData(response?.data?.data?.username));
        dispatch(setLoading(false));

        toast.success('Login successful');

        navigate("/doctor");

      } else {
        // Handle server response errors
        setServerResponse(response);
      }
    } catch (error) {
      // Handle form validation errors
      handleFormErrors(error, setErrors, setServerResponse);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Video Background */}
      <img
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="https://c4.wallpaperflare.com/wallpaper/441/121/224/risk-insecurity-surgeries-aesthetic-doctors-wallpaper-preview.jpg"
      />

      {/* Content Overlay */}
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-85 p-8 rounded-lg shadow-lg z-10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#fe9b8e]">Log in to Doctor account</h2>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              onChange={handleChange}
              type="text"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Email"
            />
            {/* Example error display component */}
            {errors.email && <FormErrorDisplay error={errors.email} />}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              onChange={handleChange}
              type="password"
              autoComplete="current-password"
              className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              placeholder="Password"
            />
            {/* Example error display component */}
            {errors.password && <FormErrorDisplay error={errors.password} />}
          </div>
          {serverResponse && (
            <div className={`p-3 text-center font-bold ${serverResponse.status === "failed" ? "text-red-600" : "text-green-500"}`}>
              {serverResponse.message}
            </div>
          )}
          <div>
            <button type="submit" className="w-full py-3 px-4 bg-[#fe9b8e] text-white rounded-md hover:bg-[#ff8373] focus:outline-none focus:bg-gray-800">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
