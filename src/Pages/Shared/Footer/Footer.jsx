

const Footer = () => {
  return (
    <footer className="bg-[#071400] text-white py-8 sm:py-[42px] px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 sm:mb-12 gap-6">
          <div className="flex-1">
            <h4 className="text-2xl sm:text-[32px] font-bold mb-4 leading-tight max-w-full lg:w-[612px]">
              Reach Your Requirement Goals Right on Schedule
            </h4>
          </div>
          <div className="lg:mb-6">
            <p className="text-gray-300 text-sm mb-6 max-w-full lg:w-[566px]">
              Sign up, complete your profile, and start browsing projects. Submit
              proposals and communicate with clients to get hired.
            </p>
            <button
              className="px-[25px] py-[9px] rounded-full bg-primary text-white font-semibold text-[14px] shadow-lg"
              onClick={() => alert('Button Clicked!')}
            >
              Get Started
            </button>
          </div>
        </div>
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-left mb-8 sm:mb-12 border-t border-gray-700 gap-6 lg:gap-0">
          {/* Logo and CTA Section */}
          <div className="lg:col-span-1 mt-6 sm:mt-[43px]">
            <img src="/logo.png" alt="Logo" className="max-w-full h-auto" />
          </div>

          {/* About Section */}
          <div className="py-6 sm:py-[43px]">
            <h4 className="text-lg font-semibold mb-6">About</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Become Seller</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">ProProjects</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="lg:border-l lg:border-r lg:border-b border-gray-700 pb-6 sm:pb-[85px] lg:pl-[120px] py-6 sm:py-[43px]">
            <h4 className="text-lg font-semibold mb-6">Categories</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Design & Creative</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Development & IT</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Music & Audio</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Programming & Tech</a></li>
            </ul>
          </div>

          {/* Support Section */}
          <div className="lg:border-b border-gray-700 lg:pl-[120px] pb-6 sm:pb-[85px] py-6 sm:py-[43px]">
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Help & Support</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Contact Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms & Services</a></li>
            </ul>
          </div>
        </div>

        {/* Social Links and Popular Posts Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-8 sm:mb-12 gap-8">

          {/* Social Links */}
          <div className="relative flex items-center justify-center p-6 w-full lg:w-auto">
            <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 blur-3xl" />

            <div className="relative flex space-x-4 justify-center lg:justify-start">
              {/* Facebook */}
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center 
                      bg-white/10 hover:bg-primary 
                     transition-all duration-300 shadow-lg hover:shadow-primary/50"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.676V1.325C24 .597 23.403 0 22.675 0z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center 
                     bg-white/10 hover:bg-primary 
                     transition-all duration-300 shadow-md hover:shadow-primary/50"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3a5.75 5.75 0 1 1 0 11.5 5.75 5.75 0 0 1 0-11.5zm0 1.5a4.25 4.25 0 1 0 0 8.5 4.25 4.25 0 0 0 0-8.5zm5-1a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center 
                     bg-white/10 hover:bg-primary 
                     transition-all duration-300 shadow-md hover:shadow-primary/50"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.954 4.57c-.885.39-1.83.654-2.825.775 1.014-.61 1.793-1.574 2.163-2.723-.951.56-2.004.97-3.127 1.195-.897-.957-2.18-1.555-3.594-1.555-2.72 0-4.928 2.208-4.928 4.928 0 .39.045.765.127 1.124-4.094-.205-7.725-2.167-10.152-5.147-.425.724-.666 1.562-.666 2.475 0 1.71.87 3.216 2.188 4.099-.807-.025-1.566-.248-2.229-.616v.06c0 2.386 1.694 4.374 3.946 4.828-.413.112-.849.171-1.296.171-.318 0-.627-.03-.928-.086.627 1.956 2.444 3.379 4.6 3.419-1.68 1.318-3.808 2.104-6.102 2.104-.396 0-.787-.024-1.174-.07 2.179 1.394 4.768 2.21 7.557 2.21 9.054 0 14.001-7.496 14.001-13.986 0-.21-.005-.423-.014-.635A9.935 9.935 0 0 0 24 4.59l-.046-.02z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Popular Posts  */}
          <div className="flex-1 lg:max-w-2xl w-full">
            <h4 className="text-lg font-semibold mb-6">Our Popular Post</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="group cursor-pointer">
                <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <img
                      src="/postimg.png"
                      alt="Post thumbnail"
                      className="w-16 h-12 sm:w-[80px] sm:h-[60px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-2 font-medium">November 7, 2024</p>
                    <h5 className="text-sm font-medium text-white leading-5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      Unveils the Best Canadian Cities for Biking
                    </h5>
                  </div>
                </div>
              </div>

              <div className="group cursor-pointer">
                <div className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                  <div className="flex-shrink-0">
                    <img
                      src="/postimg.png"
                      alt="Post thumbnail"
                      className="w-16 h-12 sm:w-[80px] sm:h-[60px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-400 mb-2 font-medium">November 7, 2024</p>
                    <h5 className="text-sm font-medium text-white leading-5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                      Unveils the Best Canadian Cities for Biking
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 sm:pt-[30px]">
          <p className="text-sm text-center text-gray-400">
            © QuantumEdge Software INC. 2025. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer