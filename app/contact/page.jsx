'use client';

import React, { useState } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebookF,
  FaPaperPlane,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // FAQ State
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 1500);
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-20">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row border border-stone-200">
          
          {/* --- LEFT: Contact Info --- */}
          <div className="lg:w-2/5 bg-stone-900 text-stone-300 p-10 flex flex-col justify-between relative overflow-hidden">
          
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-black rounded-full opacity-20 blur-3xl"></div>
            
            <div>
              <h3 className="text-2xl font-serif text-white mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-black p-3 rounded-lg text-white shrink-0">
                    <FaPhoneAlt />
                  </div>
                  <div>
                    <p className="text-sm text-stone-400 uppercase tracking-wider mb-1">Phone</p>
                    <p className="text-white hover:text-indigo-400 transition-colors">+91 98765 43210</p>
                    <p className="text-white hover:text-indigo-400 transition-colors">+91 12345 67890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black p-3 rounded-lg text-white shrink-0">
                    <FaEnvelope />
                  </div>
                  <div>
                    <p className="text-sm text-stone-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="text-white hover:text-indigo-400 transition-colors">support@traditionalsite.com</p>
                    <p className="text-white hover:text-indigo-400 transition-colors">custom@traditionalsite.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-black p-3 rounded-lg text-white shrink-0">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm text-stone-400 uppercase tracking-wider mb-1">Store Location</p>
                    <p className="text-white">12, Heritage Market, Civil Lines,</p>
                    <p className="text-white">Punjab, India - 147001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-sm text-stone-400 mb-4">Connect with us:</p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white"><FaInstagram /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white"><FaFacebookF /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-black hover:text-white transition-all text-white"><FaWhatsapp /></a>
              </div>
            </div>
          </div>

          {/* --- RIGHT: Contact Form --- */}
          <div className="lg:w-3/5 p-10 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <FaPaperPlane size={30} />
                </div>
                <h3 className="text-2xl font-serif text-stone-800 mb-2">Message Sent Successfully!</h3>
                <p className="text-stone-500 max-w-sm">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-8 text-indigo-500 font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Your Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-stone-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none transition-all"
                      placeholder="+91 98765..."
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none transition-all"
                    placeholder="you@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Select Subject</label>
                  <div className="relative">
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none appearance-none transition-all"
                    >
                      <option value="">Choose a topic</option>
                      <option value="Order Status">Order Status</option>
                      <option value="Custom Order">Custom Order Inquiry</option>
                      <option value="Returns">Returns & Exchanges</option>
                      <option value="Other">Other</option>
                    </select>
                    <FaChevronDown className="absolute right-4 top-4 text-stone-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-stone-50 border border-stone-200 focus:border-indigo-900 focus:ring-1 focus:ring-indigo-900 outline-none transition-all resize-none"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black text-white font-bold py-3 rounded-lg hover:bg-indigo-800 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-900/20 disabled:opacity-70"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>

      
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-3xl font-serif font-bold text-center text-indigo-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white border border-stone-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-5 text-left bg-stone-50 hover:bg-white transition-colors"
                >
                  <span className="font-medium text-stone-800">{faq.question}</span>
                  {openFaq === index ? <FaChevronUp className="text-indigo-900"/> : <FaChevronDown className="text-stone-400"/>}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    openFaq === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 text-stone-600 text-sm leading-relaxed border-t border-stone-100">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

 
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

export default ContactPage