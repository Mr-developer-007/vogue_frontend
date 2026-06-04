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
  // FAQ State - using a string ID like "categoryIndex-questionIndex"
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const faqCategories = [
    {
      category: "Orders & Shipping",
      faqs: [
        { 
          question: "How long does delivery take?", 
          answer: (
            <div className="space-y-2">
              <p>We usually process orders within 24-48 hours. Estimated delivery times:</p>
              <ul className="list-disc pl-5">
                <li><strong>Metro Cities:</strong> 2-5 Business Days</li>
                <li><strong>Other Locations:</strong> 4-8 Business Days</li>
              </ul>
              <p className="text-sm italic">Delivery timelines may vary during peak seasons, sales, or due to courier-related delays.</p>
            </div>
          )
        },
        { 
          question: "Do you offer Cash on Delivery (COD)?", 
          answer: "Yes, Cash on Delivery (COD) is available on selected locations across India. Availability will be shown during checkout." 
        },
        { 
          question: "How can I track my order?", 
          answer: "Once your order is shipped, you'll receive a tracking link via Email, SMS, or WhatsApp. You can use this link to track your shipment in real time." 
        },
        { 
          question: "Can I cancel my order?", 
          answer: "Orders can be cancelled before they are shipped. Once an order has been dispatched, cancellation may not be possible. Please contact our support team as soon as possible for assistance." 
        },
      ]
    },
    {
      category: "Returns, Refunds & Exchanges",
      faqs: [
        { 
          question: "What is your return policy?", 
          answer: (
            <div className="space-y-2">
              <p>We offer a 7-Day Return Policy. If you're not completely satisfied with your purchase, you can request a return within 7 days of receiving your order. The product must be:</p>
              <ul className="list-disc pl-5">
                <li>Unused & Unwashed</li>
                <li>In its original condition</li>
                <li>With all tags attached</li>
              </ul>
            </div>
          )
        },
        { 
          question: "What is your exchange policy?", 
          answer: "We offer a 7-Day Easy Exchange Policy. If the size doesn't fit or you'd like another available size, you can request an exchange within 7 days of delivery." 
        },
        { 
          question: "How long does it take to receive a refund?", 
          answer: "Once the returned product passes our quality inspection, refunds are processed within 5-7 working days. Refunds for prepaid orders are credited back to the original payment method." 
        },
        { 
          question: "Can I exchange my product for a different size?", 
          answer: "Absolutely. We understand that finding the perfect fit matters. If your size doesn't fit as expected, we'll help you exchange it for another available size." 
        },
        { 
          question: "What if I receive a damaged or incorrect product?", 
          answer: (
            <div className="space-y-2">
              <p>We're sorry if that happens. Please contact us within 48 hours of delivery and share:</p>
              <ul className="list-disc pl-5">
                <li>Order Number</li>
                <li>Product Photos</li>
                <li>Unboxing Video (if available)</li>
              </ul>
              <p>Our team will resolve the issue as quickly as possible.</p>
            </div>
          )
        },
        { 
          question: "Are returns and exchanges free?", 
          answer: "For damaged, defective, or incorrect products, return and exchange shipping will be covered by us. For size exchanges or customer preference changes, a nominal shipping fee may apply." 
        }
      ]
    },
    {
      category: "Products & Quality",
      faqs: [
        { 
          question: "What makes The Vogue Wardrobe different?", 
          answer: (
            <div className="space-y-2">
              <p>Our goal is simple: <strong>Premium Comfort. Luxury Feel. Affordable Pricing.</strong></p>
              <p>We carefully select fabrics and focus on comfort, fit, and durability so that every customer experiences premium quality without paying luxury-brand prices.</p>
            </div>
          )
        },
        { 
          question: "Are your t-shirts made from premium-quality fabric?", 
          answer: "Yes. We prioritize soft, breathable, durable fabrics that offer all-day comfort and a premium feel. Every product is designed to provide comfort, confidence, and long-lasting wear." 
        },
        { 
          question: "Will the color of the product match the website images?", 
          answer: "We make every effort to display product colors accurately. However, slight variations may occur due to screen brightness, device settings, and photography lighting." 
        },
        { 
          question: "How do I choose the right size?", 
          answer: "Please refer to our Size Guide available on each product page before placing your order. If you're still unsure, our support team will be happy to help." 
        }
      ]
    },
    {
      category: "Payments & Security",
      faqs: [
        { 
          question: "Is my payment information secure?", 
          answer: "Yes. All payments are processed through secure and trusted payment gateways. We do not store your debit card, credit card, or banking information." 
        },
        { 
          question: "What payment methods do you accept?", 
          answer: (
            <div className="space-y-2">
              <p>We accept:</p>
              <ul className="list-disc pl-5">
                <li>UPI</li>
                <li>Credit & Debit Cards</li>
                <li>Net Banking</li>
                <li>Wallets</li>
                <li>Cash on Delivery (where available)</li>
              </ul>
            </div>
          )
        }
      ]
    },
    {
      category: "About The Vogue Wardrobe",
      faqs: [
        { 
          question: "What is The Vogue Wardrobe's mission?", 
          answer: "Our mission is to provide premium-quality apparel that feels luxurious, fits perfectly, and remains affordable for everyone. We believe great fashion shouldn't come with an expensive price tag." 
        },
        { 
          question: "Why should I shop from The Vogue Wardrobe?", 
          answer: (
            <ul className="space-y-1">
              <li>✨ Premium Quality Fabric</li>
              <li>✨ Comfortable Fit</li>
              <li>✨ Affordable Luxury</li>
              <li>✨ Secure Shopping</li>
              <li>✨ Easy Returns & Exchanges</li>
              <li>✨ Customer-First Service</li>
            </ul>
          )
        },
        { 
          question: "How can I contact customer support?", 
          answer: "Our support team is always happy to help. You can email us at support@thevoguewardrobe.com. Our standard response time is within 24-48 business hours." 
        },
        { 
          question: "Do you offer free shipping?", 
          answer: "Yes, we frequently offer free shipping promotions on eligible orders. Any active offer will be displayed during checkout." 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800">
      
      {/* --- Hero / Header --- */}
      <div className="bg-black text-white py-16 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Get in Touch & FAQs</h1>
        <p className="text-stone-200 text-lg max-w-2xl mx-auto font-light">
          We would love to hear from you. Whether it's a query about our collection, your order, or our policies, everything you need is right here.
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
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">+91 77173 35748</p>
                </div>
              </div>

              {/* Email Info */}
              <div className="flex flex-col items-center text-center gap-4 md:border-x md:border-stone-800 px-4">
                <div className="bg-black p-4 rounded-full text-white shadow-lg">
                  <FaEnvelope size={24} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-wider mb-2 font-medium">Email</p>
                  <p className="text-white hover:text-indigo-400 transition-colors text-lg">support@thevoguewardrobe.com</p>
                </div>
              </div>

              {/* Location Info */}
              <div className="flex flex-col items-center text-center gap-4">
                <div className="bg-black p-4 rounded-full text-white shadow-lg">
                  <FaMapMarkerAlt size={24} />
                </div>
                <div>
                  <p className="text-sm text-stone-400 uppercase tracking-wider mb-2 font-medium">Headquarters</p>
                  <p className="text-white text-lg">The Vogue Wardrobe</p>
                  <p className="text-white text-lg">Punjab, India</p>
                </div>
              </div>

            </div>

            {/* Social Links */}
            <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col items-center relative z-10">
              <p className="text-sm text-stone-400 mb-6 uppercase tracking-wider font-medium">Connect with us on social media</p>
              <div className="flex gap-6">
                <a href="https://instagram.com/thevoguewardrobe" target='_blank' className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaInstagram size={20} />
                </a>
                <a href="https://facebook.com/thevoguewardrobe" target='_blank' className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaFacebookF size={20} />
                </a>
                <a  href="https://wa.me/+917717335748"
  target="_blank"
  rel="noopener noreferrer"className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-white hover:text-black transition-all text-white shadow-lg">
                  <FaWhatsapp size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-stone-900 mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-12">
            {faqCategories.map((section, catIndex) => (
              <div key={catIndex}>
                {/* Category Header */}
                <h3 className="text-xl font-serif font-semibold text-indigo-900 mb-6 pb-2 border-b border-stone-200">
                  {section.category}
                </h3>
                
                {/* Questions Grid/List for this category */}
                <div className="space-y-4">
                  {section.faqs.map((faq, qIndex) => {
                    const uniqueId = `${catIndex}-${qIndex}`;
                    const isOpen = openFaq === uniqueId;

                    return (
                      <div key={qIndex} className="bg-white border border-stone-200 rounded-lg shadow-sm overflow-hidden">
                        <button 
                          onClick={() => toggleFaq(uniqueId)}
                          className="w-full flex justify-between items-center p-6 text-left bg-white hover:bg-stone-50 transition-colors"
                        >
                          <span className="font-medium text-stone-800 text-[1.05rem] pr-4">
                            {faq.question}
                          </span>
                          {isOpen ? (
                            <FaChevronUp className="text-indigo-900 flex-shrink-0" size={16}/>
                          ) : (
                            <FaChevronDown className="text-stone-400 flex-shrink-0" size={16}/>
                          )}
                        </button>
                        <div 
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="p-6 pt-0 text-stone-600 leading-relaxed border-t border-stone-100 mt-2">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    );
                  })}
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