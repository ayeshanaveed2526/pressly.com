import React from 'react';

export default function DecorOverlay(){
  return (
    <div aria-hidden className="pointer-events-none">
  <img src="/assets/tape-top-left.png" className="tape-top-left" alt="tape" />
  <img src="/assets/tape-bottom-right.png" className="tape-bottom-right" alt="tape" />
  <img src="/assets/butterfly.svg" className="absolute right-10 top-24 w-16 butterfly-anim" alt="butterfly" />
    </div>
  );
}
