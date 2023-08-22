import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900">
      <div className="container mx-auto py-10">
        <ul className="flex justify-center flex-wrap text-sm text-gray-50">
          <li className="mx-2">
            <a href="#" className="inline-block hover:text-gray-50 hover:underline py-2 px-3">Home</a>
          </li>
          <li className="mx-2">
            <a href="#" className="inline-block hover:text-gray-50 hover:underline py-2 px-3">About</a>
          </li>
          <li className="mx-2">
            <a href="#" className="inline-block hover:text-gray-50 hover:underline py-2 px-3">Contact</a>
          </li>
        </ul>
        <hr className="my-4" />
        <p className="text-center text-sm text-gray-50">&copy; 2022 Footer. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
