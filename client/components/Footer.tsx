import { useState } from 'react'

export default function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showContact, setShowContact] = useState(false)

  return (
    <footer className="w-full bg-[#e6f0f6] text-gray-700 py-6 px-4 mt-12 shadow-inner">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} TailTrail. All rights reserved.</p>

        <div className="flex gap-4 text-sm">
          <button
            onClick={() => setShowPrivacy(true)}
            className="hover:underline hover:text-blue-600 transition"
          >
            Privacy Policy
          </button>
          <button
            onClick={() => setShowTerms(true)}
            className="hover:underline hover:text-blue-600 transition"
          >
            Terms
          </button>
          <button
            onClick={() => setShowContact(true)}
            className="hover:underline hover:text-blue-600 transition"
          >
            Contact
          </button>
        </div>
      </div>

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-md relative">
            <button
              onClick={() => setShowPrivacy(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Privacy Policy</h2>
            <p className="text-sm text-gray-700 space-y-1">
              We collect information only for the purpose of helping reunite lost pets with their owners.
              We do not share your personal data with third parties unless legally required.
              All information is securely stored and used only to operate the TailTrail platform.
            </p>
          </div>
        </div>
      )}

      {/* Terms Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-md relative">
            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Terms and Conditions</h2>
            <p className="text-sm text-gray-700 space-y-1">
              By using TailTrail, you agree to provide accurate information when reporting a lost or found pet.
              Users are responsible for their own submissions.
              TailTrail is not liable for incorrect information or outcomes from public listings.
            </p>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {showContact && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-md relative">
            <button
              onClick={() => setShowContact(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              Close
            </button>
            <h2 className="text-xl font-bold text-blue-600 mb-4">Contact Us</h2>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Email:</strong> tailtrail.nz@gmail.com
            </p>
            <p className="text-sm text-gray-700 mb-2">
              <strong>Location:</strong> Auckland, New Zealand
            </p>
            <p className="text-sm text-gray-700">
              <strong>Support Hours:</strong> Monday–Friday, 9am–5pm NZT
            </p>
          </div>
        </div>
      )}
    </footer>
  )
}
