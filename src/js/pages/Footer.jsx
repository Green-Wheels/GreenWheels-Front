import React from 'react';
import log from "../../assets/logo.webp"

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-5 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="#" className="flex items-center">
            <img src={log} className=" h-16 w-16 p-3" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Green Wheels</span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {/* Similar code for other parts of the footer */}
          </div>
        </div>
        <hr className="my-6 border-green-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-green-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">GreenWheels</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="{}" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
              {/* SVGs and other footer components */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
