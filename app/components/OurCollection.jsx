'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import TagLineCompo from './TagLineCompo';
import { HiArrowRight } from 'react-icons/hi';
import axios from 'axios';
import { base_url, img_url } from './urls';
import { motion, useAnimation, useInView } from 'framer-motion'; // Additional hooks for fine control

const OurCollection = () => {
  const [allCollection, setAllCollection] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollection = async () => {
    try {
      const response = await axios.get(`${base_url}/collection/getcollection`);
      const data = await response.data;
      if (data.success) {
        setAllCollection(data.data);
      } else {
        setAllCollection([]);
      }
    } catch (error) {
      setAllCollection([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollection();
  }, []);

  // Variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98], // Custom smooth easing
      },
    },
  };

  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      {/* Animated floating background blobs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        className="absolute -top-40 -right-40 w-[60vw] h-[60vw] bg-amber-100/40 rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        animate={{ opacity: 0.3, scale: 1.2 }}
        transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 0.5 }}
        className="absolute -bottom-40 -left-40 w-[50vw] h-[50vw] bg-stone-300/20 rounded-full blur-[100px] pointer-events-none"
      />

      {/* Animated Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10"
      >
        <TagLineCompo tag="Explore India" heading="Regional Treasures" />
      </motion.div>

      <div className="container mx-auto px-4 lg:px-8 mt-16 relative z-10">
        {loading ? (
          /* Premium loading skeleton with shimmer effect */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative w-full aspect-[4/5] rounded-sm overflow-hidden bg-stone-200">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
              </div>
            ))}
          </div>
        ) : (
          allCollection.length > 0 && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1, margin: '-50px' }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
            >
              {allCollection.map((item, index) => (
                <motion.div key={item._id} variants={cardVariants}>
                  <Link
                    href={`/collection/${item.slug || item._id}`}
                    className="group block w-full relative overflow-hidden rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-500"
                  >
                    <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-[4/5] overflow-hidden">
                      {/* Image with soft zoom and scale on hover */}
                      <motion.img
                        src={`${img_url}/${item.image}`}
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                      />

                      {/* Dynamic gradient overlay that changes intensity on hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                        initial={{ opacity: 0.7 }}
                        whileHover={{ opacity: 0.9 }}
                        transition={{ duration: 0.4 }}
                      />

                      {/* Card content */}
                      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end items-center text-center">
                        {/* Animated color bar */}
                        <motion.span
                          className="block h-[2px] mb-6 rounded-full"
                          style={{ backgroundColor: item.color || '#e5e5e5' }}
                          initial={{ width: '2rem' }}
                          whileHover={{ width: '5rem' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        />

                        {/* Title with lift effect */}
                        <motion.h3
                          className="text-3xl lg:text-4xl font-serif text-white tracking-wide mb-3"
                          initial={{ y: 0 }}
                          whileHover={{ y: -4 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.title}
                        </motion.h3>

                        {/* Subtitle */}
                        <motion.p
                          className="text-stone-200 text-xs md:text-sm tracking-[0.2em] uppercase mb-0"
                          initial={{ opacity: 0.8 }}
                          whileHover={{ opacity: 1, y: -2 }}
                          transition={{ duration: 0.3 }}
                        >
                          {item.des}
                        </motion.p>

                        {/* "View Collection" link that slides up on hover */}
                        <motion.div
                          className="overflow-hidden mt-6"
                          initial={{ y: 20, opacity: 0 }}
                          whileHover={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.1, duration: 0.4 }}
                        >
                          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-white font-semibold border-b border-white/30 pb-1 hover:border-white transition-colors">
                            View Collection
                            <motion.span
                              initial={{ x: 0 }}
                              whileHover={{ x: 6 }}
                              transition={{ type: 'spring', stiffness: 400 }}
                            >
                              <HiArrowRight className="text-lg" />
                            </motion.span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )
        )}
      </div>

      {/* Custom CSS for shimmer animation (add to your global styles or keep here with <style jsx>) */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.8s infinite;
        }
      `}</style>
    </section>
  );
};

export default OurCollection;