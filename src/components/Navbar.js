
function Navbar({ onCartClick, navigate }) {
  return (
    <nav className="nav-vintage shadow-md py-2 sm:py-4 px-3 sm:px-4 flex flex-wrap justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <div className="text-lg sm:text-2xl font-bold font-pressly nav-brand">Pressly</div>
      </div>
      <ul className="hidden sm:flex space-x-3 md:space-x-6 text-sm sm:text-base">
        <li><button onClick={() => navigate('/')} className="nav-link font-medium">Home</button></li>
        <li><button onClick={() => navigate('/products')} className="nav-link font-medium">Products</button></li>
        <li><button onClick={() => navigate('/reviews')} className="nav-link font-medium">Reviews</button></li>
        <li><button onClick={() => navigate('/about')} className="nav-link font-medium">About us</button></li>
      </ul>
      <div className="flex items-center gap-2 md:gap-3">
        <button onClick={onCartClick} className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 flex items-center gap-2 nav-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 3h2l.4 2M7 13h10l3-8H6.4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>
          <span className="hidden sm:inline text-white font-medium">Your Cart</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
