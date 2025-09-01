import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTimes } from "react-icons/fa";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="flex items-center justify-center min-h-screen to-white py-4 px-4 lg:my-[197px]">
            <div className="w-[200px] h-[200px] bg-primary rounded-full blur-[100px] opacity-40 absolute top-0 -z-5 left-[50px] transform -translate-x-1/2"></div>
            <div className="bg-[#071400] rounded-2xl shadow-xl flex flex-col-reverse lg:flex-row h-auto lg:h-[792px] w-full max-w-[1400px] overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[500px] h-[500px] bg-primary rounded-full blur-[100px] opacity-40"></div>
                </div>

                {/* Left side - Login Form */}
                <div className="flex flex-col sm:ml-8 lg:ml-[119px] justify-center lg:mr-[150px] lg:px-12 sm:px-2 py-2 sm:w-[200px] lg:w-[447px] text-white relative z-10">
                    <h2 className="text-3xl font-bold text-center mb-2">Login your account</h2>
                    <p className="text-sm text-center text-gray-400 mb-6">
                        Don't have an account?{" "}
                        <span className="text-green-500 cursor-pointer"><a href="/register">Sign Up</a></span>
                    </p>

                    {/* Email */}
                    <div className="flex h-[50px] items-center bg-black/40 border border-gray-500 focus-within:border-primary rounded-full px-4 py-2 mb-[30px] transition-colors">
                        <FiMail className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex h-[50px] items-center bg-black/40 border border-gray-500 focus-within:border-primary rounded-full px-4 py-2 mb-[30px] transition-colors">
                        <FiLock className="text-gray-400 mr-2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="bg-transparent outline-none flex-1 text-sm"
                        />
                        {showPassword ? <FiEye
                            className="text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        /> : <FiEyeOff
                            className="text-gray-400 cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        />}
                    </div>

                    {/* Remember + Forgot */}
                    <div className="flex items-center justify-between text-sm mb-[30px]">
                        <label className="flex items-center space-x-2">
                            <input type="checkbox" className="accent-green-500" />
                            <span>Remember Me</span>
                        </label>
                        <span className="cursor-pointer hover:underline">
                            Forgot Password?
                        </span>
                    </div>

                    {/* Login Button */}
                    <button className="w-full bg-green-500 hover:bg-green-600 mb-[31px] text-white font-semibold py-2 rounded-full transition">
                        Login Now
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-6">
                        <div className="flex-1 h-px bg-gray-600"></div>
                        <span className="px-3 text-sm text-gray-400">or</span>
                        <div className="flex-1 h-px bg-gray-600"></div>
                    </div>

                    {/* Social Buttons */}
                    <div className="flex justify-center mt-[37px] space-x-4">
                        <button className="w-[120px] h-[60px] rounded-full bg-gray-800 flex items-center justify-center">
                            <FaFacebookF className="text-white w-6 h-6" />
                        </button>
                        <button className="w-[120px] h-[60px] rounded-full bg-gray-800 flex items-center justify-center">
                            <FaGoogle className="text-white w-6 h-6" />
                        </button>
                        <button className="w-[120px] h-[60px] rounded-full bg-gray-800 flex items-center justify-center">
                            <FaTimes className="text-white w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Right side - Image */}
                <div className="flex items-center justify-center w-[646px] h-full overflow-hidden relative z-10">
                    <div className="relative w-full h-[713px]">
                        <img
                            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg"
                            alt="Login illustration"
                            className="sm:w-1/2 lg:w-full h-full object-cover"
                        />
                        {/* Close Button */}
                        <button className="absolute top-0 right-0 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center transform translate-x-1/4 -translate-y-1/4">
                            <FaTimes className="text-green-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login