import React from "react";

function Contact() {
  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Contact Pressly</h2>
      <form className="bg-slate-50 rounded-lg shadow-lg p-8 flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded border border-emerald-200 focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <button className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-emerald-400 transition">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
