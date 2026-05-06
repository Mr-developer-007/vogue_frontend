"use client";

import React, { useState, useEffect, useCallback } from "react";

const PremiumPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Check session storage and handle popup visibility with delay
  useEffect(() => {
    // Don't show popup if already closed in this session
    const hasBeenClosed = sessionStorage.getItem("premiumPopupClosed") === "true";
    if (hasBeenClosed) {
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1800); // 1.8 second delay for more premium feel

    return () => clearTimeout(timer);
  }, []);

  // Handle body scroll lock when popup is visible
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isVisible]);

  // Handle ESC key to close popup
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape" && isVisible) {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [isVisible]);

  const handleCopyCode = useCallback(() => {
    navigator.clipboard.writeText("WELCOME30");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  }, []);

  const closePopup = useCallback(() => {
    setIsVisible(false);
    sessionStorage.setItem("premiumPopupClosed", "true");
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <style>
        {`
          /* Premium Popup Styles */
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');

          .premium-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(12px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            animation: premiumFadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          }

          .premium-modal {
            position: relative;
            background: #ffffff;
            max-width: 500px;
            width: 90%;
            padding: 48px 40px;
            border-radius: 32px;
            text-align: center;
            box-shadow: 0 40px 60px -20px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(0, 0, 0, 0.02);
            animation: premiumSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          }

          .premium-modal:hover {
            transform: translateY(-2px);
            box-shadow: 0 48px 70px -20px rgba(0, 0, 0, 0.45);
          }

          .premium-close {
            position: absolute;
            top: 24px;
            right: 24px;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: transparent;
            border: none;
            font-size: 20px;
            cursor: pointer;
            color: #9ca3af;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            line-height: 1;
          }

          .premium-close:hover {
            background-color: #f3f4f6;
            color: #1f2937;
            transform: scale(1.05);
          }

          .premium-badge {
            display: inline-block;
            font-family: 'Inter', sans-serif;
            font-size: 11px;
            letter-spacing: 4px;
            text-transform: uppercase;
            color: #b49358;
            background: rgba(180, 147, 88, 0.1);
            padding: 6px 14px;
            border-radius: 40px;
            margin-bottom: 24px;
            font-weight: 500;
          }

          .premium-title {
            font-family: 'Playfair Display', 'Georgia', serif;
            font-size: 38px;
            font-weight: 600;
            color: #0a0a0a;
            margin: 0 0 16px 0;
            line-height: 1.2;
            letter-spacing: -0.02em;
          }

          .premium-divider {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #b49358, #e6d5b8, #b49358);
            margin: 0 auto 20px auto;
          }

          .premium-text {
            font-family: 'Inter', sans-serif;
            font-size: 15px;
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 32px;
            font-weight: 400;
          }

          .premium-text strong {
            color: #b49358;
            font-weight: 600;
          }

          .premium-coupon-wrapper {
            background: linear-gradient(135deg, #faf9f7 0%, #f5f3ef 100%);
            border-radius: 20px;
            padding: 4px;
            margin-bottom: 32px;
            box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02), 0 2px 6px rgba(0, 0, 0, 0.05);
          }

          .premium-coupon-box {
            background: #ffffff;
            border-radius: 16px;
            padding: 20px 16px;
            font-family: 'Courier New', 'SF Mono', monospace;
            font-size: 28px;
            font-weight: 700;
            color: #0a0a0a;
            letter-spacing: 4px;
            text-align: center;
            border: 1px dashed #e5e2dc;
            transition: all 0.2s ease;
            cursor: pointer;
          }

          .premium-coupon-box:hover {
            border-color: #b49358;
            background: #fffdf9;
          }

          .premium-coupon-label {
            font-family: 'Inter', sans-serif;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #9ca3af;
            margin-bottom: 8px;
            display: block;
          }

          .premium-btn {
            background: #0a0a0a;
            color: #ffffff;
            border: none;
            width: 100%;
            padding: 18px 24px;
            font-family: 'Inter', sans-serif;
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            border-radius: 60px;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            overflow: hidden;
          }

          .premium-btn::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.15);
            transform: translate(-50%, -50%);
            transition: width 0.5s ease, height 0.5s ease;
          }

          .premium-btn:hover::before {
            width: 300px;
            height: 300px;
          }

          .premium-btn:hover {
            background: #1a1a1a;
            transform: scale(1.02);
            letter-spacing: 2.5px;
          }

          .premium-btn:active {
            transform: scale(0.98);
          }

          .premium-btn.copied {
            background: #b49358;
            letter-spacing: 1px;
          }

          @keyframes premiumFadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          @keyframes premiumSlideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            .premium-modal {
              padding: 36px 24px;
              border-radius: 28px;
            }
            .premium-title {
              font-size: 30px;
            }
            .premium-coupon-box {
              font-size: 22px;
              letter-spacing: 3px;
              padding: 16px 12px;
            }
            .premium-btn {
              padding: 16px 20px;
            }
          }
        `}
      </style>

      <div className="premium-overlay" onClick={closePopup}>
        <div
          className="premium-modal"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label="Premium offer popup"
        >
          <button
            className="premium-close"
            onClick={closePopup}
            aria-label="Close popup"
          >
            ✕
          </button>

          <div className="premium-badge">Exclusive Access</div>
          <h2 className="premium-title">Elevate Your Style</h2>
          <div className="premium-divider" />
          <p className="premium-text">
            Welcome to the definitive destination for premium fashion. Enjoy{" "}
            <strong>30% off</strong> your first order with us.
          </p>

          <div className="premium-coupon-wrapper">
            <div
              className="premium-coupon-box"
              onClick={handleCopyCode}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleCopyCode()}
            >
              <span className="premium-coupon-label">Your code</span>
              WELCOME30
            </div>
          </div>

          <button
            className={`premium-btn ${isCopied ? "copied" : ""}`}
            onClick={handleCopyCode}
          >
            {isCopied ? "✓ Code Copied!" : "Copy Code & Shop Now"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PremiumPopup;