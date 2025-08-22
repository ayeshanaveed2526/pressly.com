import React from "react";

function Contact() {
  return (
    <section className="max-w-xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-vintage mb-6 text-center">Contact Pressly</h2>
      <form className="bg-slate-50 rounded-lg shadow-lg p-8 flex flex-col gap-4">
        <input type="text" placeholder="Your Name" className="px-4 py-2 rounded border border-[#e6cfb9] focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
        <input type="email" placeholder="Your Email" className="px-4 py-2 rounded border border-[#e6cfb9] focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
        <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded border border-[#e6cfb9] focus:outline-none focus:ring-2 focus:ring-[#b99a77]" />
        <button className="px-6 py-2 btn-vintage">Send Message</button>
      </form>
    </section>
  );
}

export default Contact;
