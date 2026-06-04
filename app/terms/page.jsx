import React from 'react';
import { 
  HiOutlineInformationCircle,
  HiOutlineTag,
  HiOutlineCurrencyRupee,
  HiOutlineShoppingCart,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineUser,
  HiOutlineShieldCheck,
  HiOutlineExclamationCircle,
  HiOutlineDocumentText,
  HiOutlineScale,
  HiOutlineMail
} from 'react-icons/hi';

const TermsAndConditions = () => {
  const terms = [
    {
      title: "1. About Us",
      icon: <HiOutlineInformationCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p><strong>The Vogue Wardrobe</strong> is a fashion brand dedicated to providing premium-quality apparel with a luxury feel at affordable prices.</p>
          <p>By using our website, you agree to comply with these Terms & Conditions.</p>
        </div>
      )
    },
    {
      title: "2. Product Information",
      icon: <HiOutlineTag className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>We strive to ensure that all product descriptions, images, sizes, and prices displayed on our website are accurate. However:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>Actual product colors may vary slightly due to screen settings.</li>
            <li>Minor variations in fabric texture or color may occur.</li>
            <li>Product availability is subject to stock availability.</li>
          </ul>
        </div>
      )
    },
    {
      title: "3. Pricing",
      icon: <HiOutlineCurrencyRupee className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>All prices displayed on our website are in Indian Rupees (INR).</p>
          <p>We reserve the right to:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>Update product prices without prior notice.</li>
            <li>Modify promotions and offers at any time.</li>
            <li>Correct pricing errors if they occur.</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. Order Acceptance & Cancellation",
      icon: <HiOutlineShoppingCart className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>Once an order is placed, you will receive an order confirmation. The Vogue Wardrobe reserves the right to cancel any order if:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>The product is out of stock.</li>
            <li>Incorrect pricing has been displayed.</li>
            <li>Fraudulent activity is suspected.</li>
            <li>Customer information is incomplete or inaccurate.</li>
          </ul>
          <p className="mt-2">In such cases, any payment received will be refunded.</p>
        </div>
      )
    },
    {
      title: "5. Shipping & Delivery",
      icon: <HiOutlineTruck className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>Orders are usually processed within 1–2 business days.</p>
          <p><strong>Estimated delivery:</strong></p>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Metro Cities: 2–5 Business Days</li>
            <li>Other Locations: 4–8 Business Days</li>
          </ul>
          <p className="italic text-sm mt-2">Delivery timelines may vary during sales, festivals, weather disruptions, or courier-related delays.</p>
        </div>
      )
    },
    {
      title: "6. Returns, Refunds & Exchanges",
      icon: <HiOutlineRefresh className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>Purchases from The Vogue Wardrobe are covered under our:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>7-Day Return Policy</li>
            <li>7-Day Exchange Policy</li>
            <li>Refund Policy</li>
          </ul>
          <p className="mt-2">Please review those policies separately for complete details.</p>
        </div>
      )
    },
    {
      title: "7. Customer Responsibilities",
      icon: <HiOutlineUser className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>By placing an order, you agree that:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>All information provided is accurate.</li>
            <li>You will not misuse the website.</li>
            <li>You will not attempt to damage, hack, or interfere with website operations.</li>
            <li>You will not use the website for unlawful activities.</li>
          </ul>
        </div>
      )
    },
    {
      title: "8. Intellectual Property",
      icon: <HiOutlineShieldCheck className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>All content available on this website including:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>Logo & Graphics</li>
            <li>Product Images</li>
            <li>Website Design</li>
            <li>Written Content</li>
          </ul>
          <p className="mt-2">belongs to The Vogue Wardrobe and may not be copied, reproduced, or used without written permission.</p>
        </div>
      )
    },
    {
      title: "9. Limitation of Liability",
      icon: <HiOutlineExclamationCircle className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>While we strive to provide the best shopping experience, The Vogue Wardrobe shall not be held liable for:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>Courier delays beyond our control</li>
            <li>Website downtime or technical errors</li>
            <li>Losses resulting from misuse of products</li>
          </ul>
          <p className="mt-2 font-medium">Our liability shall be limited to the amount paid for the purchased product.</p>
        </div>
      )
    },
    {
      title: "10. Changes To These Terms",
      icon: <HiOutlineDocumentText className="w-6 h-6" />,
      content: (
        <p>We may update these Terms & Conditions from time to time. Any updates will be posted on this page and become effective immediately upon publication.</p>
      )
    },
    {
      title: "11. Governing Law",
      icon: <HiOutlineScale className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>These Terms & Conditions shall be governed and interpreted according to the laws of India.</p>
          <p>Any disputes shall be subject to the jurisdiction of the courts of Punjab, India.</p>
        </div>
      )
    }
  ];

  return (
    <main className="min-h-screen bg-[#fafafa] py-16 px-4 sm:px-6 lg:px-8 font-sans selection:bg-stone-200 text-gray-800">
      
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <p className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-3">
          Last Updated: June 2026
        </p>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">
          Terms & Conditions
        </h1>
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
          Welcome to <span className="font-medium text-gray-900">The Vogue Wardrobe</span>. By accessing our website and placing an order, you agree to the following Terms & Conditions. Please read them carefully before making a purchase.
        </p>
      </div>

      {/* Terms Content */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-16">
        <div className="divide-y divide-gray-100">
          {terms.map((term, index) => (
            <div key={index} className="p-6 md:p-8 hover:bg-stone-50/50 transition-colors duration-300">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="mt-1 flex-shrink-0 text-indigo-900 bg-indigo-50 p-3 rounded-full">
                  {term.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-900 mb-4">
                    {term.title}
                  </h2>
                  <div className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {term.content}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 text-white rounded-2xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <HiOutlineMail className="w-10 h-10 text-stone-300 mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              12. Contact Us
            </h2>
            <p className="text-stone-300 mb-6 font-light">
              For any questions regarding these Terms & Conditions, please reach out to us:
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10 flex flex-col sm:flex-row gap-6 sm:gap-12 text-left sm:text-center w-full  justify-center">
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Email</p>
                <a href="mailto:support@thevoguewardrobe.com" className="text-lg font-medium hover:text-indigo-300 transition-colors">
                  support@thevoguewardrobe.com
                </a>
              </div>
              <div className="hidden sm:block w-px bg-white/20"></div>
              <div>
                <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Website</p>
                <a href="https://thevoguewardrobe.com" className="text-lg font-medium hover:text-indigo-300 transition-colors">
                  thevoguewardrobe.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default TermsAndConditions;