import React from 'react'

const TagLineCompo = ({ tag, heading }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in-up font-sans selection:bg-indigo-100 selection:text-indigo-900 mb-10">
      
      {/* 1. The Tagline (Colorful & Bold) */}
      <div className="flex items-center gap-3 mb-4">
        {/* Left decorative line */}
        <span className="w-10 h-[2px] bg-indigo-600 rounded-full opacity-80"></span>
        
        <span className="text-indigo-600 text-xs md:text-sm font-bold tracking-[0.3em] uppercase">
          {tag}
        </span>
        
        {/* Right decorative line */}
        <span className="w-10 h-[2px] bg-indigo-600 rounded-full opacity-80"></span>
      </div>

      {/* 2. The Main Heading (Heavy Streetwear Font) */}
      {heading && (
        <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight capitalize leading-tight">
          {heading}
        </h2>
      )}

    </div>
  )
}

export default TagLineCompo