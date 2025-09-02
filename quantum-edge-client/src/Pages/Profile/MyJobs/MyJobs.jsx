import { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaBriefcase,
  FaCalendar,
  FaMapMarkerAlt,
  FaDollarSign,
  FaTimes,
  FaSave
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useToast from "../../../hooks/useToast";

const MyJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    budget: '',
    jobType: 'Fixed Price Project',
    location: 'Remote',
    experienceLevel: 'Entry level',
    skills: '',
    deadline: '',
    status: 'active'
  });

  const axiosSecure = useAxiosSecure();
  const toast = useToast();

  // Mock data for demonstration (since backend is not implemented)
  const mockJobs = [
    {
      _id: '1',
      title: 'React Frontend Developer',
      description: 'Looking for an experienced React developer to build a modern web application with responsive design and clean UI.',
      budget: 2500,
      jobType: 'Fixed Price Project',
      location: 'Remote',
      experienceLevel: 'Senior level',
      skills: ['React', 'JavaScript', 'CSS', 'HTML'],
      deadline: '2025-10-15',
      status: 'active',
      applicantsCount: 12,
      createdAt: '2025-08-15T10:30:00Z'
    },
    {
      _id: '2',
      title: 'Full Stack MERN Developer',
      description: 'Need a full-stack developer proficient in MERN stack to develop a complete e-commerce platform.',
      budget: 5000,
      jobType: 'Fixed Price Project',
      location: 'Remote',
      experienceLevel: 'Expert level',
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      deadline: '2025-11-30',
      status: 'active',
      applicantsCount: 8,
      createdAt: '2025-08-20T14:20:00Z'
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    setLoading(true);
    // Simulate API call delay
    setTimeout(() => {
      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      budget: '',
      jobType: 'Fixed Price Project',
      location: 'Remote',
      experienceLevel: 'Entry level',
      skills: '',
      deadline: '',
      status: 'active'
    });
  };

  // Create job
  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      const newJob = {
        _id: Date.now().toString(),
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        budget: formData.budget ? parseFloat(formData.budget) : 0,
        applicantsCount: 0,
        createdAt: new Date().toISOString()
      };

      setJobs(prev => [newJob, ...prev]);
      toast.success('Job created successfully!');
      setShowCreateModal(false);
      resetForm();
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error('Failed to create job');
    }
  };

  // Edit job
  const handleEditJob = (job) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      description: job.description,
      budget: job.budget?.toString() || '',
      jobType: job.jobType,
      location: job.location,
      experienceLevel: job.experienceLevel,
      skills: job.skills?.join(', ') || '',
      deadline: job.deadline ? job.deadline : '',
      status: job.status
    });
    setShowEditModal(true);
  };

  // Update job
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      const updatedJob = {
        ...currentJob,
        ...formData,
        skills: formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill),
        budget: formData.budget ? parseFloat(formData.budget) : 0
      };

      setJobs(prev => prev.map(job => job._id === currentJob._id ? updatedJob : job));
      toast.success('Job updated successfully!');
      setShowEditModal(false);
      setCurrentJob(null);
      resetForm();
    } catch (error) {
      console.error('Error updating job:', error);
      toast.error('Failed to update job');
    }
  };

  // Delete job
  const handleDeleteJob = async (jobId) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      try {
        setJobs(prev => prev.filter(job => job._id !== jobId));
        toast.success('Job deleted successfully!');
      } catch (error) {
        console.error('Error deleting job:', error);
        toast.error('Failed to delete job');
      }
    }
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const JobForm = ({ isEdit = false, onSubmit, onCancel }) => (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Job Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., Full Stack Developer"
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., 1500"
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
            <option value="Contract">Contract</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="e.g., Remote, New York, USA"
          />
        </div>

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
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Skills</label>
        <input
          type="text"
          name="skills"
          value={formData.skills}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="e.g., React, Node.js, MongoDB (comma separated)"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleInputChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {isEdit && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
        >
          <FaSave size={16} />
          <span>{isEdit ? 'Update Job' : 'Create Job'}</span>
        </button>
      </div>
    </form>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Jobs</h2>
          <p className="text-gray-600 mt-1">Manage your job postings</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-green-600 transition flex items-center space-x-2"
        >
          <FaPlus size={16} />
          <span>Create Job</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="mt-2 text-gray-600">Loading jobs...</p>
        </div>
      )}

      {/* Jobs List */}
      {!loading && (
        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm border">
              <FaBriefcase size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
              <p className="text-gray-600 mb-4">Create your first job posting to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Create Your First Job
              </button>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        job.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : job.status === 'paused'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-1">
                        <FaDollarSign size={14} />
                        <span>${job.budget || 'Not specified'}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaMapMarkerAlt size={14} />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <FaCalendar size={14} />
                        <span>Deadline: {formatDate(job.deadline)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills?.slice(0, 3).map((skill, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                      {job.skills?.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-500">
                    <span>{job.applicantsCount || 0} applicants</span>
                    <span className="mx-2">•</span>
                    <span>Created {formatDate(job.createdAt)}</span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditJob(job)}
                      className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition text-sm"
                      title="Edit job"
                    >
                      <FaEdit size={14} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job._id)}
                      className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition text-sm"
                      title="Delete job"
                    >
                      <FaTrash size={14} />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Job Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create New Job</h3>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <JobForm 
                onSubmit={handleCreateJob}
                onCancel={() => {
                  setShowCreateModal(false);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Edit Job</h3>
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    setCurrentJob(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <JobForm 
                isEdit={true}
                onSubmit={handleUpdateJob}
                onCancel={() => {
                  setShowEditModal(false);
                  setCurrentJob(null);
                  resetForm();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
