import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user starts typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Get the backend URL from environment or use localhost for development
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';
      
      const response = await axios.post(`${backendUrl}/api/register`, formData);
      
      if (response.status === 201) {
        onSuccess({
          ...formData,
          id: response.data.id
        });
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Registration failed. Please try again.');
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white shadow-2xl rounded-3xl p-8 lg:p-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-appdirect-blue to-navy-dark rounded-full -translate-y-32 translate-x-32 opacity-5"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-navy-dark to-appdirect-blue rounded-full translate-y-24 -translate-x-24 opacity-5"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-appdirect-blue to-navy-dark rounded-full mb-6">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎫 Secure Your Spot
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join the most exciting tech meetup of 2024. Limited seats available!
            </p>
          </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <svg className="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">👤</span>
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-appdirect-blue focus:border-appdirect-blue transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">📧</span>
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-appdirect-blue focus:border-appdirect-blue transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="company" className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">🏢</span>
                Company *
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-appdirect-blue focus:border-appdirect-blue transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
                placeholder="Enter your company name"
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-bold text-gray-700 mb-3 flex items-center">
                <span className="mr-2">💼</span>
                Role/Position *
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-appdirect-blue focus:border-appdirect-blue transition-all duration-300 text-lg bg-gray-50 focus:bg-white"
              >
                <option value="">Select your role</option>
                <option value="Software Engineer">Software Engineer</option>
                <option value="Senior Software Engineer">Senior Software Engineer</option>
                <option value="Tech Lead">Tech Lead</option>
                <option value="Engineering Manager">Engineering Manager</option>
                <option value="Product Manager">Product Manager</option>
                <option value="DevOps Engineer">DevOps Engineer</option>
                <option value="Data Engineer">Data Engineer</option>
                <option value="Frontend Developer">Frontend Developer</option>
                <option value="Backend Developer">Backend Developer</option>
                <option value="Full Stack Developer">Full Stack Developer</option>
                <option value="Student">Student</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-appdirect-blue to-navy-dark hover:from-navy-dark hover:to-slate-900 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-appdirect-blue focus:ring-offset-2 transform hover:scale-105 disabled:hover:scale-100 text-xl shadow-2xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Securing Your Spot...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <span className="mr-2">🚀</span>
                  Secure My Spot Now!
                </div>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            By registering, you agree to receive event updates and communications from AppDirect.
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
