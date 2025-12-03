import React from 'react';

const Footer : React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Science to Content. All rights
          reserved.
        </p>
        <div className="flex gap-6 text-sm text-gray-500">
          <a href="#" className="hover:text-beiersdorf-blue transition">
            Documentation
          </a>
          <a href="#" className="hover:text-beiersdorf-blue transition">
            API
          </a>
          <a href="#" className="hover:text-beiersdorf-blue transition">
            Support
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
