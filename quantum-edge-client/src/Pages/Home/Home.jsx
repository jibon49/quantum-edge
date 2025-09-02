import { useState, useEffect } from "react";
import { FaSearch, FaStar, FaHeart, FaBookmark, FaBriefcase, FaTimes, FaEdit, FaTrash, FaEye, FaPlus, FaSave } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { FiBriefcase } from "react-icons/fi";
import { BsPeople } from "react-icons/bs";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useToast from "../../hooks/useToast";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobModal, setShowJobModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceRange: '',
    remote: true,
    experienceLevel: 'Entry level',
    freelancerCount: 1,
    skills: '',
    jobType: 'Fixed Price Project'
  });
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    priceRange: '',
    remote: true,
    experienceLevel: 'Entry level',
    freelancerCount: 1,
    skills: '',
    jobType: 'Fixed Price Project'
  });
  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const toast = useToast();

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

  const filteredJobs = jobs.filter(job =>
    job.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.skills?.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleJobCardClick = (job) => {
    setSelectedJob(job);
    setShowJobModal(true);
  };

  const isJobOwner = (job) => {
    return user && user.email === job.creatorEmail;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle job creation
  const handleCreateJob = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login to post a job");
      return;
    }

    setCreating(true);
    try {
      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

      const jobData = {
        title: formData.title,
        description: formData.description,
        priceRange: formData.priceRange,
        remote: formData.remote,
        experienceLevel: formData.experienceLevel,
        freelancerCount: parseInt(formData.freelancerCount),
        skills: skillsArray,
        moreSkillsCount: Math.max(0, skillsArray.length - 3),
        jobType: formData.jobType,
        creatorEmail: user.email,
        creatorName: user.displayName || user.email,
        postedBy: user.displayName || user.email,
        creationDate: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        }),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric'
        }),
        applicantsCount: 0
      };

      const response = await axiosSecure.post('/api/jobs', jobData);

      setJobs(prev => [response.data, ...prev]);

      toast.success('Job posted successfully!');
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        priceRange: '',
        remote: true,
        experienceLevel: 'Entry level',
        freelancerCount: 1,
        skills: '',
        jobType: 'Fixed Price Project'
      });
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setCreating(false);
    }
  };

  const handleUpdateJob = async (e) => {
    e.preventDefault();

    if (!selectedJob) return;

    setUpdating(true);
    try {
      const skillsArray = editFormData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);

      const updatedData = {
        title: editFormData.title,
        description: editFormData.description,
        priceRange: editFormData.priceRange,
        remote: editFormData.remote,
        experienceLevel: editFormData.experienceLevel,
        freelancerCount: parseInt(editFormData.freelancerCount),
        skills: skillsArray,
        moreSkillsCount: Math.max(0, skillsArray.length - 3),
        jobType: editFormData.jobType,
        updatedAt: new Date()
      };

      const response = await axiosSecure.put(`/api/jobs/${selectedJob._id}`, updatedData);

      setJobs(prev => prev.map(job =>
        job._id === selectedJob._id ? response.data : job
      ));

      setSelectedJob(response.data);
      setShowEditModal(false);
      toast.success('Job updated successfully!');
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error(error.response?.data?.message || 'Failed to update job');
    } finally {
      setUpdating(false);
    }
  };

  // Open edit modal
  const openEditModal = (job) => {
    setSelectedJob(job);
    setEditFormData({
      title: job.title,
      description: job.description,
      priceRange: job.priceRange,
      remote: job.remote,
      experienceLevel: job.experienceLevel,
      freelancerCount: job.freelancerCount,
      skills: job.skills?.join(', ') || '',
      jobType: job.jobType || 'Fixed Price Project'
    });
    setShowEditModal(true);
    setShowJobModal(false);
  };

  const handleDeleteJob = async (jobId, jobTitle) => {
    const confirmMessage = `Are you sure you want to delete "${jobTitle}"?`;

    if (window.confirm(confirmMessage)) {
      try {
        const response = await axiosSecure.delete(`/api/jobs/${jobId}`);

        if (response.data.deletedCount === 0) {
          toast.error('Job not found or already deleted');
          return;
        }

        const jobsResponse = await axiosPublic.get('/jobs');
        setJobs(jobsResponse.data);

        toast.success('Job deleted successfully!');
        setShowJobModal(false);
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error(error.response?.data?.message || 'Failed to delete job');
      }
    }
  };

  const closeModal = () => {
    setShowJobModal(false);
    setSelectedJob(null);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    setFormData({
      title: '',
      description: '',
      priceRange: '',
      remote: true,
      experienceLevel: 'Entry level',
      freelancerCount: 1,
      skills: '',
      jobType: 'Fixed Price Project'
    });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="bg-[#071400] relative overflow-hidden">
        <hr className="border-t border-gray-800 mx-[160px] border-1" />
        {/* Background glow effects */}
        <div className="absolute -top-10 left-0 w-96 h-96 bg-primary rounded-full blur-[100px] opacity-20 z-10"></div>

        <div className="container mx-auto px-6 py-20 relative flex items-start">
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

            {/* Post Job Button */}
            {user && (
              <div className="mt-8">

              </div>
            )}
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
              {user && (
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition mt-4"
                >
                  Post the First Job
                </button>
              )}
            </div>
          )}

          {/* Service Cards Grid */}
          {!loading && !error && filteredJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className="bg-white h-[592px] w-[447px] rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleJobCardClick(job)}
                >
                  <div className="text-sm text-gray-500 mb-2">
                    {job.createdAt ? new Date(job.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit'
                    }) : job.creationDate ? new Date(job.creationDate).toLocaleDateString('en-US', {
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

                  <hr className="text-gray-200 mb-4" />

                  <div className="flex flex-col items-start gap-5 justify-between">
                    <div>
                      <span className="text-sm text-[#CCCCCC]">Posted by </span>
                      <span className="font-semibold text-[#4B4B4B]">
                        {job.createdBy || job.postedBy || job.creatorName || 'Anonymous'}
                      </span>
                    </div>
                    <button
                      className="w-[120px] bg-[#1E1E1E] text-white rounded-full px-6 py-2 text-sm font-medium transition hover:bg-primary"
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent card click
                        handleJobCardClick(job);
                      }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Job Details Modal */}
      {showJobModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Modal Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedJob.title}
                  </h2>
                  <p className="text-gray-600">
                    Posted by {selectedJob.postedBy || selectedJob.creatorName || 'Anonymous'}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition p-2"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-2">
                  <h3 className="text-lg font-semibold mb-3">Job Description</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {selectedJob.description}
                  </p>

                  {/* Skills */}
                  {selectedJob.skills && selectedJob.skills.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-3">Required Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedJob.skills.map((skill, index) => (
                          <span key={index} className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Job Info Sidebar */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Job Information</h3>

                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-gray-600">Budget:</span>
                      <p className="font-medium">
                        {selectedJob.priceRange || selectedJob.budget ? `$${selectedJob.budget}` : 'Not specified'}
                      </p>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Experience Level:</span>
                      <p className="font-medium">{selectedJob.experienceLevel}</p>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Work Type:</span>
                      <p className="font-medium">{selectedJob.remote ? 'Remote' : 'On-site'}</p>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Freelancers Needed:</span>
                      <p className="font-medium">{selectedJob.freelancerCount || 1}</p>
                    </div>

                    <div>
                      <span className="text-sm text-gray-600">Posted:</span>
                      <p className="font-medium">
                        {selectedJob.createdAt ? new Date(selectedJob.createdAt).toLocaleDateString() :
                          selectedJob.creationDate ? new Date(selectedJob.creationDate).toLocaleDateString() : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  {/* Show edit/delete buttons only if user owns the job */}
                  {isJobOwner(selectedJob) ? (
                    <>
                      <button
                        onClick={() => openEditModal(selectedJob)}
                        className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                      >
                        <FaEdit size={16} />
                        <span>Edit Job</span>
                      </button>
                      <button
                        onClick={() => handleDeleteJob(selectedJob._id, selectedJob.title)}
                        className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                      >
                        <FaTrash size={16} />
                        <span>Delete Job</span>
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500 text-sm">
                      {user ? 'You can only edit/delete your own jobs' : 'Please login to manage jobs'}
                    </span>
                  )}
                </div>

                <div className="flex space-x-3 gap-2">
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-green-600 transition flex items-center space-x-2 mx-auto"
                  >
                    <FaPlus size={16} />
                    <span>Post a Job</span>
                  </button>
                  {!isJobOwner(selectedJob) && (
                    <button className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition">
                      Apply Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Post a New Job</h2>
                <button
                  onClick={closeCreateModal}
                  className="text-gray-400 hover:text-gray-600 transition p-2"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Website Design and Front-End Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe the job requirements and responsibilities..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
                    <input
                      type="text"
                      name="priceRange"
                      value={formData.priceRange}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., $1,200-$1,400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      name="jobType"
                      value={formData.jobType}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Fixed Price Project">Fixed Price Project</option>
                      <option value="Hourly Project">Hourly Project</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <select
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Entry level">Entry level</option>
                      <option value="Intermediate level">Intermediate level</option>
                      <option value="Senior level">Senior level</option>
                      <option value="Expert level">Expert level</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Freelancers Needed</label>
                    <input
                      type="number"
                      name="freelancerCount"
                      value={formData.freelancerCount}
                      onChange={handleInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter skills separated by commas</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remote"
                    checked={formData.remote}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label className="text-sm font-medium text-gray-700">Remote Work</label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeCreateModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={creating}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {creating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Posting...</span>
                      </>
                    ) : (
                      <>
                        <FaPlus size={16} />
                        <span>Post Job</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Edit Job</h2>
                <button
                  onClick={closeEditModal}
                  className="text-gray-400 hover:text-gray-600 transition p-2"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <form onSubmit={handleUpdateJob} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleEditInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., Website Design and Front-End Development"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    required
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Describe the job requirements and responsibilities..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price Range *</label>
                    <input
                      type="text"
                      name="priceRange"
                      value={editFormData.priceRange}
                      onChange={handleEditInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="e.g., $1,200-$1,400"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Job Type</label>
                    <select
                      name="jobType"
                      value={editFormData.jobType}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Fixed Price Project">Fixed Price Project</option>
                      <option value="Hourly Project">Hourly Project</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                    <select
                      name="experienceLevel"
                      value={editFormData.experienceLevel}
                      onChange={handleEditInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="Entry level">Entry level</option>
                      <option value="Intermediate level">Intermediate level</option>
                      <option value="Senior level">Senior level</option>
                      <option value="Expert level">Expert level</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Freelancers Needed</label>
                    <input
                      type="number"
                      name="freelancerCount"
                      value={editFormData.freelancerCount}
                      onChange={handleEditInputChange}
                      min="1"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
                  <input
                    type="text"
                    name="skills"
                    value={editFormData.skills}
                    onChange={handleEditInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="e.g., React, Node.js, MongoDB (comma separated)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Enter skills separated by commas</p>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="remote"
                    checked={editFormData.remote}
                    onChange={handleEditInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <label className="text-sm font-medium text-gray-700">Remote Work</label>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updating}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                  >
                    {updating ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Updating...</span>
                      </>
                    ) : (
                      <>
                        <FaSave size={16} />
                        <span>Update Job</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;