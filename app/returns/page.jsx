"use client"
import React, { useState } from 'react'
import { 
  HiOutlineRefresh, 
  HiOutlineTruck, 
  HiOutlineCash, 
  HiOutlineCheckCircle,
  HiChevronDown,
  HiChevronUp
} from 'react-icons/hi'

const ReturnsPage = () => {
  // State for the interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How long does it take to process a refund?",
      answer: "Once we receive your return, please allow 3-5 business days for our team to inspect the item and process your refund. The funds will automatically be applied to your original payment method, which can take an additional 2-7 days depending on your bank."
    },
    {
      question: "Do I have to pay for return shipping?",
      answer: "We offer free return shipping for exchanges or items that arrived damaged. For standard returns (refund to original payment method), a flat fee of ₹100 will be deducted from your total refund amount."
    },
    {
      question: "Can I return items bought on sale?",
      answer: "Items marked as 'Final Sale' or purchased during major clearance events cannot be returned or exchanged unless they arrive defective."
    },
    {
      question: "How do I exchange for a different size?",
      answer: "The fastest way to ensure you get the size you want is to initiate a return for your current item and place a new order for the correct size. Alternatively, you can select 'Exchange' in our return portal, though inventory is not guaranteed until the return is processed."
    }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 font-sans">
      
      {/* Header Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Returns & Exchanges</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We want you to love your purchase. If you're not completely satisfied, we gladly accept most returns by mail within 30 days of purchase.
        </p>
        <div className="mt-8">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors shadow-sm">
            Start a Return
          </button>
        </div>
      </div>

      {/* Policy Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-gray-50 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-800">
            <HiOutlineRefresh size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">30-Day Window</h3>
          <p className="text-sm text-gray-600">Return your items within 30 days of the delivery date.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-800">
            <HiOutlineCheckCircle size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Item Condition</h3>
          <p className="text-sm text-gray-600">Items must be unworn, unwashed, and have original tags attached.</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-2xl text-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-gray-800">
            <HiOutlineCash size={24} />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Fast Refunds</h3>
          <p className="text-sm text-gray-600">Refunds are processed within 3-5 days of receiving your return.</p>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
        <div className="relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Request</h4>
              <p className="text-sm text-gray-600">Click "Start a Return" above and enter your order number and email.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">Pack</h4>
              <p className="text-sm text-gray-600">Print your prepaid shipping label and pack your items securely.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center">
              <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Ship</h4>
              <p className="text-sm text-gray-600">Drop your package off at any authorized shipping location.</p>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border-b border-gray-200 last:border-0 ${openFaq === index ? 'bg-gray-50' : 'bg-white'}`}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
              >
                <span className="font-medium text-gray-900">{faq.question}</span>
                <span className="text-gray-400 ml-4">
                  {openFaq === index ? <HiChevronUp size={20} /> : <HiChevronDown size={20} />}
                </span>
              </button>
              
              {/* Expandable Content */}
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Support Contact Footer */}
      <div className="mt-16 text-center bg-gray-50 rounded-2xl p-8">
        <p className="text-gray-900 font-medium mb-2">Still have questions?</p>
        <p className="text-gray-600 text-sm mb-4">Our support team is here to help.</p>
        <a href="mailto:support@yourstore.com" className="text-gray-900 font-semibold underline hover:text-gray-600 transition-colors">
          Contact Support
        </a>
      </div>

    </div>
  )
}

export default ReturnsPage