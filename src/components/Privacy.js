import React from 'react';

export default function Privacy() {
  return (
    <main className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-pressly text-ink mb-4">Privacy Policy</h1>
      <div className="paper-card p-6 text-ink">
        <p className="mb-3">Your privacy matters. We collect only the information necessary to process orders and improve our service. Personal data (name, email, address, phone) is used solely to fulfill orders and contact you about them.</p>
        <p className="mb-3">We do not sell or share personal information with third parties except where required to fulfill an order (payment processors, shipping carriers) or when required by law.</p>
        <p className="mb-0 text-sm">If you have questions about your data, email us at hello@pressly.example.</p>
      </div>
    </main>
  );
}
