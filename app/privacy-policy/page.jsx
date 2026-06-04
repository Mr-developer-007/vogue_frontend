import React from 'react';
import { 
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineLockClosed,
  HiOutlineShare,
  HiOutlineGlobeAlt,
  HiOutlineUserCircle,
  HiOutlineMail
} from 'react-icons/hi';

const PrivacyPolicy = () => {
  const policies = [
    {
      title: "Information We Collect",
      icon: <HiOutlineClipboardList className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>When you place an order or interact with our website, we may collect:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 text-gray-600">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Name</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Email Address</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Mobile Number</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Shipping & Billing Address</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Payment Information</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-indigo-300 rounded-full"></span> Order History</li>
          </ul>
        </div>
      )
    },
    {
      title: "How We Use Your Information",
      icon: <HiOutlineCog className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p>We use your information to ensure the best possible experience:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2 text-gray-600">
            <li>Process and deliver your orders efficiently.</li>
            <li>Send order updates and tracking details.</li>
            <li>Provide reliable customer support.</li>
            <li>Improve our products and services.</li>
            <li>Share offers, discounts, and updates <span className="italic">(only if you choose to receive them)</span>.</li>
          </ul>
        </div>
      )
    },
    {
      title: "Payment Security",
      icon: <HiOutlineLockClosed className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          All online payments are processed through highly secure, encrypted payment gateways. <strong>We do not store your debit card, credit card, or banking details</strong> on our servers.
        </p>
      )
    },
    {
      title: "Information Sharing",
      icon: <HiOutlineShare className="w-6 h-6" />,
      content: (
        <div className="space-y-2">
          <p className="text-gray-600 leading-relaxed">
            We respect your privacy. We <strong>never</strong> sell, rent, or trade your personal information to third parties.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Your information may only be securely shared with trusted delivery partners and payment providers solely for the purpose of order fulfillment.
          </p>
        </div>
      )
    },
    {
      title: "Cookies",
      icon: <HiOutlineGlobeAlt className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          Our website may use cookies to improve your browsing experience, analyze website traffic, and personalize content. You can manage your cookie preferences through your browser settings.
        </p>
      )
    },
    {
      title: "Your Rights",
      icon: <HiOutlineUserCircle className="w-6 h-6" />,
      content: (
        <p className="text-gray-600 leading-relaxed">
          You have full control over your data. You may request access to, correction of, or deletion of your personal information at any time by contacting our support team.
        </p>
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
          Privacy Policy
        </h1>
        <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
          Welcome to <span className="font-medium text-gray-900">The Vogue Wardrobe</span>. Your privacy matters to us. When you shop with us, we collect only the information necessary to process your orders and provide a better shopping experience.
        </p>
      </div>

      {/* Policy Content */}
      <div className="max-w-4xl mx-auto bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mb-16">
        <div className="divide-y divide-gray-100">
          {policies.map((policy, index) => (
            <div key={index} className="p-6 md:p-8 hover:bg-stone-50/50 transition-colors duration-300">
              <div className="flex items-start gap-4 md:gap-6">
                <div className="mt-1 flex-shrink-0 text-indigo-900 bg-indigo-50 p-3 rounded-full">
                  {policy.icon}
                </div>
                <div className="w-full">
                  <h2 className="text-xl md:text-2xl font-serif font-medium text-gray-900 mb-4">
                    {policy.title}
                  </h2>
                  <div className="text-sm md:text-base">
                    {policy.content}
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
          {/* Subtle background blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <HiOutlineMail className="w-10 h-10 text-stone-300 mb-4" />
            <h2 className="text-2xl md:text-3xl font-serif mb-4">
              Contact Us
            </h2>
            <p className="text-stone-300 mb-6 font-light max-w-lg">
              For any privacy-related concerns or to exercise your data rights, please contact our support team at:
            </p>
            
            <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/10 w-full max-w-sm">
              <p className="text-xs text-stone-400 uppercase tracking-widest mb-1">Email Support</p>
              <a href="mailto:support@thevoguewardrobe.com" className="text-lg md:text-xl font-medium hover:text-indigo-300 transition-colors block truncate">
                support@thevoguewardrobe.com
              </a>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
};

export default PrivacyPolicy;