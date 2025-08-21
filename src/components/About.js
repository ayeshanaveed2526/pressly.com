import React, { useState } from 'react';

export default function About() {
  const [openFaq, setOpenFaq] = useState(null);
  const faqs = [
    { q: 'How did Pressly start?', a: 'I started Pressly as a small creative side project in 2024 — designing stickers and mini canvases for friends and family. What began as a hobby grew into a mini business when people started asking to buy my designs.' },
    { q: 'What do you sell?', a: 'We design and print premium laptop stickers, custom mini canvases, printed cards and vintage-style papers. Most items are hand-finished in small batches.' },
    { q: 'How long does delivery take?', a: 'Delivery usually takes 3-7 business days depending on location. Faster options are available on request.' },
  ];

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h1 className="text-3xl font-bold text-indigo-700 mb-3">About Pressly</h1>
        <p className="text-gray-700 mb-4">I started this mini business from a love of design and small-batch handcrafted stationery. Pressly began as a way to share small, meaningful art — laptop stickers and mini canvases — that brighten everyday spaces. Over time we refined our prints, materials and small-scale production, focusing on quality and thoughtful customer service.</p>
        <p className="text-gray-700">We prioritize simple, durable materials and friendly service. If you have a custom idea, we enjoy collaborating to bring it to life.</p>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <div className="text-sm text-gray-500">Founder</div>
            <div className="text-lg font-semibold">Ayesha Naveed</div>
            <div className="text-sm text-gray-600">Designer & Founder</div>
          </div>
          <button onClick={() => window.location.hash = '/contact'} className="px-4 py-2 bg-indigo-600 text-white rounded">Message Us</button>
        </div>
      </section>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">Our Mission</h2>
        <p className="text-gray-700">Make small moments special. We design objects that are affordable, personal and made to last — so your laptop, room or desk becomes a little more you.</p>
      </section>

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-3">FAQ</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-4 py-3 flex items-center justify-between">
                <span className="font-medium">{f.q}</span>
                <span className="text-gray-500">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 text-gray-700">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
