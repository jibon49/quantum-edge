
import { useState, useEffect } from "react";
import { FaSearch, FaStar, FaHeart, FaBookmark, FaBriefcase } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FiBriefcase } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const axiosPublic = useAxiosPublic();

  // Fetch jobs from backend
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosPublic.get('/jobs');
        setJobs(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to fetch jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [axiosPublic]);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter(job => 
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-[#071400] relative overflow-hidden">
        <hr className="border-t border-gray-800 mx-[160px] border-1" />
        {/* Background glow effects */}
        <div className="absolute -top-10 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 z-10"></div>
        
        <div className="container mx-auto px-6 py-20 relative  flex items-start">
          <div className="text-center text-white">
            {/* Search Bar */}
            <div className="sm:w-[300px] z-20 lg:w-[566px] mx-auto relative bg-[#202C1A] rounded-lg">
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
          {/* Loading State */}
          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p className="mt-2 text-gray-600">Loading jobs...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* No Jobs State */}
          {!loading && !error && filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                {searchQuery ? `No jobs found for "${searchQuery}"` : 'No jobs available at the moment.'}
              </p>
            </div>
          )}

          {/* Service Cards Grid */}
          {!loading && !error && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {filteredJobs.map((job) => (
                <div key={job._id} className="bg-white h-[592px] w-full max-w-[447px] rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition">
                  <div className="text-sm text-gray-500 mb-2">
                    {job.creationDate ? new Date(job.creationDate).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: '2-digit' 
                    }) : 'N/A'}
                  </div>

                  <h3 className="text-xl font-semibold text-[#4B4B4B] mb-[22px]">
                    {job.title || 'Job Title Not Available'}
                  </h3>
                  
                  <div className="bg-gray-100 rounded-lg p-4 mb-5 flex justify-between items-center">
                    <span className="text-gray-600">{job.jobType || 'Fixed Price Project'}</span>
                    <span className="font-semibold text-[#4B4B4B]">
                      {job.budget ? `$${job.budget}` : job.priceRange || 'Budget not specified'}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-[34px] text-justify leading-relaxed">
                    {job.description || 'No description available for this job.'}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-[34px]">
                    {job.remote !== false && (
                      <span className="flex items-center gap-1 text-sm text-purple-600 bg-[#FAF7FF] rounded-full p-0.5">
                        <span className="w-4 h-4 text-center items-center flex">
                        <CiLocationOn />
                        </span>
                        {job.location || 'Remote'}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-sm text-red-600 bg-[#FFF5F5] rounded-full p-0.5">
                      <span className="w-4 h-4 text-center items-center flex">
                        <FiBriefcase />
                        </span>
                      {job.experienceLevel || 'Experience level not specified'}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-green-600 bg-[#E9FFEE] rounded-full p-0.5">
                      <span className="w-4 h-4 text-center items-center flex">
                        <BsPeople />
                        </span>
                      {job.applicantsCount || 0} Applicant{(job.applicantsCount || 0) !== 1 ? 's' : ''}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills && job.skills.length > 0 ? (
                      <>
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                        {job.skills.length > 3 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                            +{job.skills.length - 3} more
                          </span>
                        )}
                      </>
                    ) : (
                      <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                        No skills specified
                      </span>
                    )}
                  </div>

                  <hr className="text-gray-200 mb-4"/>
                  
                  <div className="flex flex-col items-start gap-5 justify-between">
                    <div>
                      <span className="text-sm text-[#CCCCCC]">Posted by </span>
                      <span className="font-semibold text-[#4B4B4B]">
                        {job.createdBy || job.postedBy || 'Anonymous'}
                      </span>
                    </div>
                    <button className="w-[120px] bg-[#1E1E1E] text-white rounded-full px-6 py-2 text-sm font-medium transition hover:bg-primary">
                      Apply Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;