import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200 py-6 text-center">
      &copy; {new Date().getFullYear()} Sticker & Canvas Shop. All rights reserved.
    </footer>
  );
}

export default Footer;
