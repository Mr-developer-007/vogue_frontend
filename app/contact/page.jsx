'use client';

import React, { useState } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebookF,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const ContactPage = () => {
  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    { question: "Do you ship internationally?", answer: "Yes, we ship our traditional wear globally. International shipping usually takes 10-15 business days." },
    { question: "Can I customize the stitching?", answer: "Absolutely. We offer custom tailoring services. You can select 'Custom Fit' on the product page and submit your measurements." },
    { question: "What is your return policy?", answer: "We accept returns within 7 days of delivery for unstitched items. Custom-stitched outfits are not eligible for return unless there is a manufacturing defect." },
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      
      {/* --- Hero / Header --- */}
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch</h1>
        <p className="text-stone-200 text-lg max-w-2xl mx-auto font-light">
          We would love to hear from you. Whether it's a query about our heritage collection or a custom order, our team is here to assist.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        
        {/* --- Contact Info Card --- */}
        <div className="bg-stone-900 text-stone-300 rounded-xl shadow-xl overflow-hidden relative border border-stone-800">
          <div className="absolute top-0 right-0 -mr-10 -mt-10 w-64 h-64 bg-black rounded-full opacity-30 blur-3xl pointer-events-none"></div>
          
          <div className="p-10 md:p-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              
              {/* Phone Info */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-black p-4 rounded-full text-white shadow-lg">
                  <FaPhoneAlt size={24} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-wider mb-2 font-medium">Phone</p>
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">+91 98765 43210</p>
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">+91 12345 67890</p>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex flex-col items-center text-center gap-4 md:border-x md:border-stone-800 px-4">
                <div className="bg-black p-4 rounded-full text-white shadow-lg">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-wider mb-2 font-medium">Email</p>
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">support@traditionalsite.com</p>
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">custom@traditionalsite.com</p>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-black p-4 rounded-full text-white shadow-lg">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-wider mb-2 font-medium">Store Location</p>
                  <p className="text-white text-lg">12, Heritage Market, Civil Lines,</p>
                  <p className="text-white text-lg">Punjab, India - 147001</p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col items-center relative z-10">
              <p className="text-sm text-stone-400 mb-6 uppercase tracking-wider font-medium">Connect with us on social media</p>
              <div className="flex gap-6">
                <a href="#" className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaInstagram size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaFacebookF size={20} />
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-stone-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-stone-50 transition-colors"
                >
                  <span className="font-medium text-stone-800 text-lg pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <FaChevronUp className="text-indigo-900 flex-shrink-0" size={18}/>
                  ) : (
                    <FaChevronDown className="text-stone-400 flex-shrink-0" size={18}/>
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-6 pt-0 text-stone-600 leading-relaxed border-t border-stone-100 mt-2">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* --- Map Section --- */}
      <div className="w-full h-96 bg-stone-200 relative grayscale">
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600" 
          alt="Map Location" 
          className="w-full h-full object-cover opacity-50" 
        />
        <div className="absolute inset-0 flex items-center justify-center bg-stone-900/10">
            <button className="bg-white text-stone-900 px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-black hover:text-white transition-colors">
              <FaMapMarkerAlt /> View on Google Maps
            </button>
        </div>
      </div>

    </div>
  )
}

export default ContactPage;