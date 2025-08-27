import React from "react";

function Footer() {
  return (
    <footer className="footer-vintage py-4 text-center text-xs sm:text-sm">
      <div className="max-w-4xl mx-auto px-4">
       

        <div className="flex items-center justify-center gap-4 mb-2">
          <a href="#/privacy" className="text-white hover:text-vintage">Privacy</a>
          <a href="#/returns" className="text-white hover:text-vintage">Returns</a>
          <a href="#/shipping" className="text-white hover:text-vintage">Shipping</a>
          <a href="#/reviews" className="text-white hover:text-vintage">Reviews</a>
        </div>

        <div className="font-normal">© 2025 Pressly. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
