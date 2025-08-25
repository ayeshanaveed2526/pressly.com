import React from "react";

function Footer() {
  return (
    <footer className="footer-vintage py-4 text-center text-xs sm:text-sm">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="flex items-center gap-2 text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="#3d291f" strokeWidth="1.5" fill="#fff7ee"/><path d="M7 12l2.5 2.5L17 7" stroke="#3d291f" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span className="text-sm">Secure Payments</span>
          </div>
          <div className="flex items-center gap-2 text-ink">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#3d291f" strokeWidth="1.5" fill="#fff7ee"/><path d="M3 10h18" stroke="#3d291f" strokeWidth="1.2"/></svg>
            <span className="text-sm">Fast Shipping</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-2">
          <a href="#/privacy" className="text-ink hover:text-vintage">Privacy</a>
          <a href="#/returns" className="text-ink hover:text-vintage">Returns</a>
          <a href="#/shipping" className="text-ink hover:text-vintage">Shipping</a>
          <a href="#/reviews" className="text-ink hover:text-vintage">Reviews</a>
        </div>

        <div className="font-normal">© 2025 Pressly. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
