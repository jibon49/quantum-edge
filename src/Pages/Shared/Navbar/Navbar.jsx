import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    return (
        <nav className="w-full bg-[#0a1b0a] text-white shadow-md px-6 py-3 flex items-center justify-around">
            {/*  Logo + Categories */}
            <div className="flex items-center space-x-6">
                {/* Logo */}
                <div className="flex items-center space-x-2">
                    <img src="/logo.png" alt="Logo" className="w-[221px] h-14" />
                </div>

                {/* Categories button */}
                <button className="flex items-center space-x-2 bg-green-900/40 px-[22px] py-[9px] rounded-full hover:bg-green-900/60 transition h-[29px] border-primary border text-primary">
                    
                    <span className="text-[14px] flex flex-row items-center gap-1"><BiCategory />Categories</span>
                </button>
            </div>

            {/* Center: Dropdown */}
            <div className="bg-[#88888838] rounded-lg">
                <div className="relative py-[7px] pl-[10px] pr-[203px]">
                <button
                    onClick={() => setOpen(!open)}
                    className="bg-green-900/30 px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-green-900/50 transition"
                >
                    <span>Freelancer</span>
                    <FaCaretDown size={16}/>
                </button>

                {open && (
                    <div className="absolute mt-2 w-40 bg-[#0f0f0f] rounded-md shadow-lg border border-green-900/50">
                        <ul className="py-2">
                            <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 1</li>
                            <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 2</li>
                            <li className="px-4 py-2 hover:bg-green-900/40 cursor-pointer">Option 3</li>
                        </ul>
                    </div>
                )}
            </div>
            </div>

            {/* Right: Links + Registration */}
            <div className="flex items-center space-x-6 text-sm">
                <a href="#" className="text-green-500 hover:underline">
                    BECAME A SELLER
                </a>
                <a href="#" className="hover:underline">
                    LOGIN
                </a>
                <button className="bg-green-600 px-5 py-2 rounded-full font-medium hover:bg-green-700 transition">
                    Registration
                </button>
            </div>
        </nav>
    )
}

export default Navbar