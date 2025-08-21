import React from "react";

function Contact() {
  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">Contact Us</h2>
      <form className="bg-yellow-50 rounded-lg shadow-lg p-8 flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400" />
        <button className="px-6 py-2 bg-pink-500 text-white rounded hover:bg-orange-400 transition">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
