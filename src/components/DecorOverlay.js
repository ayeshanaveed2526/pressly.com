import React from 'react';

export default function DecorOverlay(){
  return (
    <div aria-hidden className="pointer-events-none">
      {/* butterfly remains; tape now provided via CSS pseudo-elements on the hero container */}
      <img src="/assets/butterfly.svg" className="absolute right-10 top-24 w-16 butterfly-anim" alt="butterfly" />
    </div>
  );
}
