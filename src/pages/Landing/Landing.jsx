import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Button } from '../../components/common/Button'
import { ROUTES } from '../../utils/constants'
import { COLORS } from '../../theme/colors'
import landingPageDisplay from '../../assets/landing-page-display.png'

export const Landing = () => {
     const navigate = useNavigate()
     const { user, isAuthenticated } = useSelector((state) => state.auth)

     // If user is already logged in, redirect to dashboard
     React.useEffect(() => {
          if (user && isAuthenticated) {
               navigate(ROUTES.DASHBOARD)
          }
     }, [user, isAuthenticated, navigate])

     return (
          <div className='bg-light'>
               {/* Navigation */}
               <nav className="sticky top-0 z-20 shadow-sm bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex items-center justify-between h-16">
                              <div className="flex items-center">
                                   <h1 className="text-2xl font-bold text-primary">
                                        Finsight
                                   </h1>
                              </div>
                              <div className="flex items-center gap-4">
                                   <button
                                        onClick={() => navigate(ROUTES.LOGIN)}
                                        className="px-6 py-2 font-medium hover:opacity-80 transition-colors text-primary"
                                   >
                                        Login
                                   </button>
                                   <button
                                        onClick={() => navigate(ROUTES.REGISTER)}
                                        className="px-6 py-2 font-medium rounded-lg transition-colors bg-primary text-white"
                                   >
                                        Sign Up
                                   </button>
                              </div>
                         </div>
                    </div>
               </nav>

               {/* Hero Section */}
               <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                         {/* Left Side - Content */}
                         <div>
                              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">
                                   Take Control of Your Finances
                              </h2>
                              <p className="text-lg mb-8 text-secondary">
                                   Finsight is your personalized financial analytical dashboard. Upload your transaction files,
                                   analyze spending patterns, and get AI-powered insights to make smarter financial decisions.
                              </p>

                              <div className="space-y-4 mb-8">
                                   <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold bg-primary">
                                             ✓
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-primary">Easy File Upload</h3>
                                             <p className="text-sm text-secondary">Upload your transaction files and let us do the analysis</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold bg-primary">
                                             ✓
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-primary">Smart Analytics</h3>
                                             <p className="text-sm text-secondary">Get detailed insights about your spending and savings patterns</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 rounded-full text-white flex items-center justify-center text-sm font-bold bg-primary">
                                             ✓
                                        </div>
                                        <div>
                                             <h3 className="font-semibold text-primary">AI-Powered Insights</h3>
                                             <p className="text-sm text-secondary">Get personalized recommendations based on your financial data</p>
                                        </div>
                                   </div>
                              </div>

                              <div className="flex flex-col sm:flex-row gap-4">
                                   <button
                                        onClick={() => navigate(ROUTES.REGISTER)}
                                        className="px-8 py-3 font-semibold rounded-lg transition-colors bg-primary text-white"
                                   >
                                        Get Started
                                   </button>
                                   <button
                                        onClick={() => navigate(ROUTES.LOGIN)}
                                        className="px-8 py-3 font-semibold rounded-lg transition-colors border-2 border-primary text-primary bg-white">
                                        Login
                                   </button>
                              </div>
                         </div>


                         {/* Right Side - Feature Highlight */}
                         <div className="hidden md:block">
                              <div className="bg-white rounded-2xl shadow-lg p-6">
                                   <img src={landingPageDisplay} loading='lazy' alt="Analytics Dashboard" className="rounded-xl h-64 w-full mb-6 bg-light object-fit"/>
                                   <h3 className="text-xl font-semibold mb-2 text-primary">Analytics Dashboard</h3>
                                   <p className="text-secondary">
                                        Visualize your financial data with beautiful charts and comprehensive analytics to understand your financial health better.
                                   </p>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Features Section */}
               <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <h2 className="text-3xl font-bold text-center mb-12 text-primary">
                              How It Works
                         </h2>

                         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                              {/* Step 1 */}
                              <div className="text-center">
                                   <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        1
                                   </div>
                                   <h3 className="text-lg font-semibold mb-2 text-primary">Sign Up</h3>
                                   <p className='text-secondary'>
                                        Create your account and get started in seconds
                                   </p>
                              </div>

                              {/* Step 2 */}
                              <div className="text-center">
                                   <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                        2
                                   </div>
                                   <h3 className="text-lg font-semibold mb-2 text-primary">Upload Data</h3>
                                   <p className='text-secondary'>
                                        Upload your transaction files in PDF or Excel format
                                   </p>
                              </div>

                              {/* Step 3 */}
                              <div className="text-center">
                                   <div className="w-16 h-16 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4 bg-primary">
                                        3
                                   </div>
                                   <h3 className="text-lg font-semibold mb-2 text-primary">Get Insights</h3>
                                   <p className='text-secondary'>
                                        Analyze trends and receive AI-powered recommendations
                                   </p>
                              </div>
                         </div>

                         {/* Supported Banks Notice */}
                         <div className="mt-16 rounded-lg p-6 border border-light">
                              <p className="text-center font-semibold mb-2 text-primary">
                                   Currently Supported Banks
                              </p>
                              <p className="text-center text-secondary">
                                   We support bank statements from <span className="font-semibold">Central Bank of India (CBI)</span> and <span className="font-semibold">Bank of Baroda (BOB)</span>
                              </p>
                         </div>
                    </div>
               </div>

               {/* CTA Section */}
               <div className="text-white py-20 bg-primary">
                    <div className="max-w-4xl mx-auto text-center">
                         <h2 className="text-3xl font-bold mb-6">Ready to Take Control?</h2>
                         <p className="text-xl mb-8 text-light">
                              Join thousands of users managing their finances smarter
                         </p>
                         <button
                              onClick={() => navigate(ROUTES.REGISTER)}
                              className="px-8 py-3 font-semibold rounded-lg transition-colors bg-white text-primary"
                         >
                              Create Account Now
                         </button>
                    </div>
               </div>

               {/* Footer */}
               <footer className="border-t py-8 bg-background">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex items-center justify-between">
                              <p className='text-secondary'>© 2026 Finsight. All rights reserved.</p>
                              <div className="flex gap-6">
                                   <a href="#" className="hover:opacity-80 text-secondary">Privacy</a>
                                   <a href="#" className="hover:opacity-80 text-secondary">Terms</a>
                                   <a href="#" className="hover:opacity-80 text-secondary">Contact</a>
                              </div>
                         </div>
                    </div>
               </footer>
          </div>
     )
}
