import React from 'react';

const SuccessMessage = ({ data, onBackToForm }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-light via-slate-50 to-white flex items-center justify-center px-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-appdirect-blue bg-opacity-10 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-navy-dark bg-opacity-15 rounded-full animate-bounce"></div>
        <div className="absolute bottom-32 left-1/3 w-20 h-20 bg-appdirect-blue bg-opacity-20 rounded-full animate-ping"></div>
        <div className="absolute bottom-20 right-20 w-16 h-16 bg-navy-dark bg-opacity-10 rounded-full animate-pulse"></div>
      </div>
      
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-appdirect-blue to-navy-dark rounded-full -translate-y-24 translate-x-24 opacity-5"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-navy-dark to-appdirect-blue rounded-full translate-y-16 -translate-x-16 opacity-5"></div>
          <div className="relative z-10">
            {/* Success Icon */}
            <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-green-400 to-green-500 mb-8 animate-bounce">
              <svg className="h-14 w-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>

            {/* Success Message */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              🎉 Registration Successful!
            </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Thank you for registering for the AppDirect India Meetup. We're excited to see you there!
          </p>

          {/* Registration Details */}
          <div className="bg-appdirect-light-blue rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-semibold text-appdirect-blue mb-4">Registration Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Name:</span>
                <span className="text-gray-900">{data.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Email:</span>
                <span className="text-gray-900">{data.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Company:</span>
                <span className="text-gray-900">{data.company}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Role:</span>
                <span className="text-gray-900">{data.role}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Registration ID:</span>
                <span className="text-gray-900 font-mono text-sm">{data.id}</span>
              </div>
            </div>
          </div>

          {/* Event Reminder */}
          <div className="bg-white border-2 border-appdirect-blue rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-appdirect-blue mb-3">Event Reminder</h3>
            <div className="text-gray-700 space-y-2">
              <p><strong>Date:</strong> November 22, 2025 (Saturday)</p>
              <p><strong>Time:</strong> 10:00 AM - 2:00 PM IST</p>
              <p><strong>Location:</strong> Level 6, Tower 12, Magarpatta Inner Circle, Cybercity, Magarpatta, Hadapsar, Pune, Maharashtra 411013</p>
            </div>
            <p className="text-sm text-gray-600 mt-4">
              We'll send you a confirmation email with venue details and agenda shortly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <button
              onClick={onBackToForm}
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Register Another Person
            </button>
            <button
              onClick={() => window.print()}
              className="w-full sm:w-auto bg-appdirect-blue hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200"
            >
              Print Confirmation
            </button>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Need help? Contact us at{' '}
              <a href="mailto:events@appdirect.com" className="text-appdirect-blue hover:underline">
                events@appdirect.com
              </a>
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
