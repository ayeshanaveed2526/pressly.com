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
  <h1 className="text-3xl font-bold text-vintage mb-3">About Pressly</h1>
        <p className="text-ink mb-4">I started this mini business from a love of design and small-batch handcrafted stationery. Pressly began as a way to share small, meaningful art — laptop stickers and mini canvases — that brighten everyday spaces. Over time we refined our prints, materials and small-scale production, focusing on quality and thoughtful customer service.</p>
        <p className="text-ink">We prioritize simple, durable materials and friendly service. If you have a custom idea, we enjoy collaborating to bring it to life.</p>

  <ContactArea />
      </section>

  <section className="bg-white rounded-lg shadow p-6 mb-6">
  <h2 className="text-2xl font-bold text-vintage mb-3">Our Mission</h2>
    <p className="text-ink">Make small moments special. We design objects that are affordable, personal and made to last — so your laptop, room or desk becomes a little more you.</p>
  </section>

      <section className="bg-white rounded-lg shadow p-6">
  <h2 className="text-2xl font-bold text-vintage mb-3">FAQ</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={i} className="border rounded">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full text-left px-4 py-3 flex items-center justify-between">
                <span className="font-medium text-ink">{f.q}</span>
                <span className="text-gray-500">{openFaq === i ? '−' : '+'}</span>
              </button>
              {openFaq === i && (
                <div className="px-4 pb-3 text-ink">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function ContactArea() {
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState('');

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded">
      <div className="text-sm text-gray-500">Founder</div>
      <div className="text-lg font-semibold">Ayesha Naveed</div>
      <div className="text-sm text-gray-600 mb-3">Designer & Founder</div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="text-sm text-gray-700">Email</div>
          <a className="text-vintage font-medium" href="mailto:hello@pressly.example">hello@pressly.example</a>
        </div>

        <div className="flex items-center gap-2">
          {!showMessage ? (
            <button onClick={() => setShowMessage(true)} className="px-4 py-2 btn-vintage">Send a message</button>
          ) : (
            <div className="w-full">
              <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Write your message..." className="w-full border rounded p-2 mb-2" rows={4} />
              <div className="flex gap-2 justify-end">
                <button onClick={() => { setShowMessage(false); setMessage(''); }} className="px-3 py-1 bg-slate-200 rounded">Cancel</button>
                <button onClick={() => { /* no-op: no backend */ setMessage(''); setShowMessage(false); }} className="px-3 py-1 btn-vintage">Send</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
