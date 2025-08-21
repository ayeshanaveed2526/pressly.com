import React from "react";

function Footer() {
  return (
    <footer className="bg-indigo-700 text-slate-100 py-6 text-center">
      &copy; {new Date().getFullYear()} Pressly. All rights reserved.
    </footer>
  );
}

export default Footer;
