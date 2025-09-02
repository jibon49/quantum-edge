import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCaretDown, FaBars, FaTimes, FaUser, FaSignOutAlt } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import useAuth from "../../../hooks/useAuth";
import useToast from "../../../hooks/useToast";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const { user, logOut } = useAuth();
    const toast = useToast();

    const handleLogin = () => {
        navigate('/login');
    };

    const handleRegistration = () => {
        navigate('/register');
    };

    const handleLogout = async () => {
        try {
            await logOut();
            toast.success("Logged out successfully!");
            navigate('/login');
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    return (
        <nav className="w-full bg-[#071400] text-white shadow-md px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between lg:justify-around">
                {/*  Logo + Categories */}
                <div className="flex items-center space-x-3 lg:space-x-6">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <img src="/logo.png" alt="Logo" className="w-32 sm:w-40 lg:w-[221px] h-8 sm:h-10 lg:h-14" />
                    </div>

                    {/* Categories button - Hidden on mobile */}
                    <button className="hidden md:flex items-center space-x-2 bg-green-900/40 px-4 lg:px-[22px] py-2 lg:py-[9px] rounded-full hover:bg-green-900/60 transition h-8 lg:h-[29px] border-primary border text-primary">
                        <span className="text-xs lg:text-[14px] flex flex-row items-center gap-1"><BiCategory />Categories</span>
                    </button>
                </div>

                {/* Center: Dropdown - Hidden on mobile */}
                <div className="hidden h-[50px] lg:block bg-[#88888838] rounded-lg">
                    <div className="relative py-[7px] pl-[10px] pr-[203px]">
                    <button
                        onClick={() => setOpen(!open)}
                        className="bg-green-900/30 px-4 py-1 rounded-md flex items-center space-x-2 hover:bg-green-900/50 transition"
                    >
                        <span>Freelancer</span>
                        <FaCaretDown size={16}/>
                    </button>

                    {open && (
                        <div className="absolute mt-2 w-40 bg-[#0f0f0f] rounded-md shadow-lg border border-green-900/50 z-50">
                            <ul className="py-2">
                                <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 1</li>
                                <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 2</li>
                                <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 3</li>
                            </ul>
                        </div>
                    )}
                </div>
                </div>

                {/* Right: Links + Authentication - Hidden on mobile */}
                <div className="hidden lg:flex items-center space-x-6 text-sm">
                    <a href="#" className="text-green-500 hover:underline">
                        BECAME A SELLER
                    </a>
                    
                    {user ? (
                        // Authenticated user menu
                        <div className="relative">
                            <button
                                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                className="flex items-center space-x-2 bg-green-900/30 px-4 py-2 rounded-full hover:bg-green-900/50 transition"
                            >
                                <FaUser size={16} />
                                <span>{user.email}</span>
                                <FaCaretDown size={16} />
                            </button>

                            {userDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-[#0f0f0f] rounded-md shadow-lg border border-green-900/50 z-50">
                                    <ul className="py-2">
                                        <li 
                                            onClick={() => {
                                                navigate('/profile');
                                                setUserDropdownOpen(false);
                                            }}
                                            className="px-4 py-2 hover:bg-green-900/40 cursor-pointer flex items-center space-x-2"
                                        >
                                            <FaUser size={14} />
                                            <span>Profile</span>
                                        </li>
                                        <li 
                                            onClick={handleLogout}
                                            className="px-4 py-2 hover:bg-green-900/40 cursor-pointer flex items-center space-x-2 text-red-400 hover:text-red-300"
                                        >
                                            <FaSignOutAlt size={14} />
                                            <span>Logout</span>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Non-authenticated user buttons
                        <>
                            <button onClick={handleLogin} className="hover:underline bg-transparent border-none text-white cursor-pointer">
                                LOGIN
                            </button>
                            <button onClick={handleRegistration} className="bg-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-700 transition">
                                Registration
                            </button>
                        </>
                    )}
                </div>

                {/* Mobile menu button */}
                <button 
                    className="lg:hidden p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="lg:hidden mt-4 border-t border-green-900/30 pt-4">
                    {/* Mobile Categories */}
                    <button className="w-full mb-4 flex items-center justify-center space-x-2 bg-green-900/40 px-4 py-2 rounded-full hover:bg-green-900/60 transition border-primary border text-primary">
                        <span className="text-sm flex flex-row items-center gap-1"><BiCategory />Categories</span>
                    </button>

                    {/* Mobile Dropdown */}
                    <div className="mb-4">
                        <button
                            onClick={() => setOpen(!open)}
                            className="w-full bg-green-900/30 px-4 py-2 rounded-md flex items-center justify-center space-x-2 hover:bg-green-900/50 transition"
                        >
                            <span>Freelancer</span>
                            <FaCaretDown size={16}/>
                        </button>

                        {open && (
                            <div className="mt-2 bg-[#0f0f0f] rounded-md shadow-lg border border-green-900/50">
                                <ul className="py-2">
                                    <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 1</li>
                                    <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 2</li>
                                    <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 3</li>
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Mobile Links */}
                    <div className="flex flex-col space-y-4 text-center">
                        <a href="#" className="text-green-500 hover:underline text-sm">
                            BECAME A SELLER
                        </a>
                        
                        {user ? (
                            // Mobile authenticated user menu
                            <>
                                <div className="flex items-center justify-center space-x-2 text-white">
                                    <FaUser size={16} />
                                    <span className="text-sm">{user.email}</span>
                                </div>
                                <button 
                                    onClick={() => {
                                        navigate('/profile');
                                        setMobileMenuOpen(false);
                                    }}
                                    className="bg-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-700 transition mx-auto flex items-center space-x-2"
                                >
                                    <FaUser size={14} />
                                    <span>Profile</span>
                                </button>
                                <button 
                                    onClick={handleLogout}
                                    className="bg-red-600 px-5 py-2 rounded-full font-medium hover:bg-red-700 transition mx-auto flex items-center space-x-2"
                                >
                                    <FaSignOutAlt size={14} />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            // Mobile non-authenticated user buttons
                            <>
                                <button onClick={handleLogin} className="hover:underline text-sm bg-transparent border-none text-white cursor-pointer">
                                    LOGIN
                                </button>
                                <button onClick={handleRegistration} className="bg-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-700 transition mx-auto">
                                    Registration
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar