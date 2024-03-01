import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="app mt-6  p-4 text-center w-full fixed bottom-0 dark:text-white">
      <p>© {new Date().getFullYear()} All rights reserved.</p>
    </footer>
  );
};

export default Footer;
