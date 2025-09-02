import { useState } from "react";
import { FaUser, FaBriefcase, FaCog } from "react-icons/fa";
import MyJobs from "./MyJobs/MyJobs";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('jobs');
  const { user } = useAuth();

  const tabs = [
    { id: 'profile', label: 'Profile Info', icon: FaUser },
    { id: 'jobs', label: 'My Jobs', icon: FaBriefcase },
    { id: 'settings', label: 'Settings', icon: FaCog },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-[#071400] text-white p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                <FaUser size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-gray-300 mt-1">{user?.email || 'User'}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <div className="bg-white p-3 rounded-md border border-gray-300">
                        {user?.email || 'Not available'}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Member Since</label>
                      <div className="bg-white p-3 rounded-md border border-gray-300">
                        {user?.metadata?.creationTime ? 
                          new Date(user.metadata.creationTime).toLocaleDateString() : 
                          'Not available'
                        }
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Account Status</label>
                      <div className="bg-white p-3 rounded-md border border-gray-300">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'jobs' && <MyJobs />}

            {activeTab === 'settings' && (
              <div className="max-w-2xl">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Account Settings</h3>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 text-center py-8">
                    Settings panel coming soon...
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
