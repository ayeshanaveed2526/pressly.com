import React from 'react';

export default function Shipping() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-pressly text-ink mb-4">Shipping Information</h1>
      <div className="paper-card p-6 text-ink">
        <p className="mb-3">We ship in Lahore,Pakistan. Local delivery typically takes 3-7 business days.</p>
        <p className="mb-3">Shipping costs are calculated at checkout. Orders over 1500 Rs may qualify for free standard shipping (where available).</p>
        <p className="mb-0 text-sm">For urgent orders, choose Express shipping at checkout or contact hello@pressly.example for assistance.</p>
      </div>
    </main>
  );
}



