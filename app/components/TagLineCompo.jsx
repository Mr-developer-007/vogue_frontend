import React from 'react'

const TagLineCompo = ({ tag, heading }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center animate-fade-in-up font-sans selection:bg-indigo-100 selection:text-indigo-900 mb-8">
      
      {/* 1. The Tagline (Colorful & Bold) */}
      <div className="flex items-center gap-3 mb-1">
        {/* Left decorative line */}
        <span className="w-10 h-[2px] bg-[#828282] rounded-full opacity-80"></span>
        
        <span className="text-[#828282] text-xs font-bold tracking-[0.3em] uppercase">
          {tag}
        </span>
        
        {/* Right decorative line */}
        <span className="w-10 h-[2px] bg-[#828282] rounded-full opacity-80"></span>
      </div>

      {/* 2. The Main Heading (Heavy Streetwear Font) */}
      {heading && (
        <h2 className=" uppercase  text-xl md:text-4xl font-black text-gray-900 font-serif leading-tight">
          {heading}
        </h2>
      )}

    </div>
  )
}

export default TagLineCompo