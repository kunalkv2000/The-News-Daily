import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {


  return (
    <footer className="bg-red-800 text-white py-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* About Section */}
        <div className="mb-4 md:mb-0">
          <h3 className="text-lg font-semibold mb-2">About NewsApp</h3>
          <p className="text-sm text-gray-200 leading-relaxed">
            Stay updated with the latest news from around the world. Customize
            your preferences and get real-time updates directly to your inbox.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="text-sm text-gray-200 space-y-2">
            <li>
              <Link to="/" className="text-white hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-white hover:underline">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex items-center justify-start md:justify-start space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.494v-9.294h-3.125v-3.625h3.125v-2.671c0-3.1 1.893-4.785 4.657-4.785 1.325 0 2.465.099 2.797.143v3.244h-1.919c-1.506 0-1.796.716-1.796 1.763v2.305h3.588l-.467 3.625h-3.121v9.294h6.116c.731 0 1.324-.593 1.324-1.324v-21.35c0-.732-.593-1.325-1.325-1.325z" />
              </svg>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
              aria-label="Twitter"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.611 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.194-.897-.957-2.173-1.555-3.591-1.555-2.717 0-4.917 2.201-4.917 4.917 0 .386.043.763.127 1.124-4.083-.205-7.702-2.161-10.125-5.134-.424.729-.666 1.577-.666 2.483 0 1.71.87 3.213 2.19 4.099-.807-.026-1.566-.248-2.228-.617v.062c0 2.386 1.697 4.374 3.946 4.827-.413.112-.849.171-1.296.171-.317 0-.626-.03-.928-.087.627 1.956 2.445 3.379 4.6 3.418-1.68 1.316-3.808 2.101-6.115 2.101-.398 0-.79-.023-1.175-.069 2.179 1.397 4.768 2.213 7.548 2.213 9.056 0 14.002-7.502 14.002-14.002 0-.213-.005-.425-.014-.636.961-.695 1.797-1.562 2.457-2.549z" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white"
              aria-label="Instagram"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.332 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.062 1.366-.332 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.366-.062-2.633-.332-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.062-1.366.332-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308 1.265-.058 1.645-.07 4.849-.07m0-2.163c-3.259 0-3.667.012-4.947.071-1.312.062-2.544.344-3.487 1.287-.943.943-1.225 2.175-1.287 3.487-.059 1.28-.071 1.688-.071 4.947s.012 3.667.071 4.947c.062 1.312.344 2.544 1.287 3.487.943.943 2.175 1.225 3.487 1.287 1.28.059 1.688.071 4.947.071s3.667-.012 4.947-.071c1.312-.062 2.544-.344 3.487-1.287.943-.943 1.225-2.175 1.287-3.487.059-1.28.071-1.688.071-4.947s-.012-3.667-.071-4.947c-.062-1.312-.344-2.544-1.287-3.487-.943-.943-2.175-1.225-3.487-1.287-1.28-.059-1.688-.071-4.947-.071z" />
                <path d="M12 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 1 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0-2.88 1.44 1.44 0 1 0 0 2.88z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-white mt-4">
        &copy; {new Date().getFullYear()} NewsApp. All rights reserved.
      </div>
    </footer>
  );



};

export default Footer;
