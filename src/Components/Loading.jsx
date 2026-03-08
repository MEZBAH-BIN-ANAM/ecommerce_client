import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        width="72"
        height="72"
        viewBox="0 0 100 100"
        aria-label="Loading"
      >
        {/* Background ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.15"
          strokeWidth="8"
        />

        {/* Animated ring */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray="70 200"
        >
          {/* Rotation */}
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 50"
            to="360 50 50"
            dur="1.1s"
            repeatCount="indefinite"
          />

          {/* Pulse effect */}
          <animate
            attributeName="stroke-dasharray"
            values="20 200; 70 200; 20 200"
            dur="1.1s"
            repeatCount="indefinite"
          />

          {/* Color cycling */}
          <animate
            attributeName="stroke"
            values="#6366f1; #22c55e; #06b6d4; #f59e0b; #6366f1"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
