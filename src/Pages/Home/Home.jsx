
import { useState } from "react";
import { FaSearch, FaStar, FaHeart, FaBookmark, FaBriefcase } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FiBriefcase } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // JSON data for service cards
  const serviceCards = [
    {
      id: 1,
      date: "Apr 30, 2024",
      title: "Website Design and Front-End Development",
      priceRange: "$1,200-$1,400",
      description: "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites...",
      remote: true,
      experienceLevel: "Senior level",
      freelancerCount: 2,
      skills: ["App Design", "Art Generation", "Word"],
      moreSkillsCount: 5,
      postedBy: "Eamman Olio",
    },
    {
      id: 2,
      date: "Apr 28, 2024",
      title: "Website Design and Front-End Development",
      priceRange: "$2,000-$2,400",
      description: "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites...",
      remote: true,
      experienceLevel: "Expert level",
      freelancerCount: 1,
      skills: ["App Design", "AI Generation", "WordPress"],
      moreSkillsCount: 3,
      postedBy: "Eamman Olio",
    },
    {
      id: 3,
      date: "Apr 25, 2024",
      title: "Website Design and Front-End Development",
      priceRange: "$1,500-$1,800",
      description: "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites...",
      remote: true,
      experienceLevel: "Intermediate level",
      freelancerCount: 3,
      skills: ["App Design", "UI/UX Design", "React"],
      moreSkillsCount: 4,
      postedBy: "Eamman Olio",
    },
    {
      id: 4,
      date: "Apr 22, 2024",
      title: "Website Design and Front-End Development",
      priceRange: "$1,800-$2,200",
      description: "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites...",
      remote: true,
      experienceLevel: "Senior level",
      freelancerCount: 1,
      skills: ["App Design", "Mobile App", "Flutter"],
      moreSkillsCount: 6,
      postedBy: "Eamman Olio",
    },
    {
      id: 5,
      date: "Apr 20, 2024",
      title: "Website Design and Front-End Development",
      priceRange: "$2,200-$2,600",
      description: "In this role, you will be responsible for conducting comprehensive SEO audits and implementing strategies to optimize websites...",
      remote: true,
      experienceLevel: "Expert level",
      freelancerCount: 2,
      skills: ["App Design", "Backend", "Node.js"],
      moreSkillsCount: 7,
      postedBy: "Eamman Olio",
    }
  ];

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-[#071400] relative overflow-hidden">
        <hr className="border-t border-gray-800 mx-[160px] border-1" />
        {/* Background glow effects */}
        <div className="absolute -top-10 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 z-100"></div>
        
        <div className="container mx-auto px-6 py-20 relative  flex items-start">
          <div className="text-center text-white">
            {/* Search Bar */}
            <div className="lg:w-[566px] mx-auto relative bg-[#202C1A] rounded-lg">
              <div className="flex rounded-lg shadow-xl overflow-hidden">
                <input
                  type="text"
                  placeholder="Search your needs..."
                  className="flex-1 px-6 py-4 text-[#888888] text-lg outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <select className="px-6 py-4 text-white outline-none">
                  <option className="text-black">Web Developer</option>
                  <option className="text-black">Mobile App</option>
                  <option className="text-black">UI/UX Design</option>
                  <option className="text-black">Digital Marketing</option>
                </select>
                <button className="bg-primary rounded-full hover:bg-green-600 px-4 py-1 text-white font-semibold transition m-2">
                  <FaSearch />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">

          {/* Service Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <div key={card.id} className="bg-white h-[592px] w-[447px] rounded-lg shadow-md p-6 hover:shadow-lg transition">
                <div className="text-sm text-gray-500 mb-2">{card.date}</div>

                <h3 className="text-xl font-semibold text-[#4B4B4B] mb-[22px]">
                  {card.title}
                </h3>
                
                <div className="bg-gray-100 rounded-lg p-4 mb-5 flex justify-between items-center">
                  <span className="text-gray-600">Fixed Price Project</span>
                  <span className="font-semibold text-[#4B4B4B]">{card.priceRange}</span>
                </div>
                
                <p className="text-gray-600 mb-[34px] text-justify leading-relaxed">
                  {card.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mb-[34px]">
                  {card.remote && (
                    <span className="flex items-center gap-1 text-sm text-purple-600 bg-[#FAF7FF] rounded-full p-0.5">
                      <span className="w-4 h-4 text-center items-center flex">
                      <CiLocationOn />
                      </span>
                      Remote
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-sm text-red-600 bg-[#FFF5F5] rounded-full p-0.5">
                    <span className="w-4 h-4 text-center items-center flex">
                      <FiBriefcase />
                      </span>
                    {card.experienceLevel}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-green-600 bg-[#E9FFEE] rounded-full p-0.5">
                    <span className="w-4 h-4 text-center items-center flex">
                      <BsPeople />
                      </span>
                    {card.freelancerCount} Freelancer{card.freelancerCount > 1 ? 's' : ''}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                  {card.moreSkillsCount > 0 && (
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      +{card.moreSkillsCount} more
                    </span>
                  )}
                </div>

                <hr  className="text-gray-200 mb-4"/>
                
                <div className="flex flex-col items-start gap-5 justify-between">
                  <div>
                    <span className="text-sm text-[#CCCCCC]">Posted by </span>
                    <span className="font-semibold text-[#4B4B4B]">{card.postedBy}</span>
                  </div>
                  <button className="w-[120px] bg-[#1E1E1E] text-white rounded-full px-6 py-2 text-sm font-medium transition hover:bg-primary">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;