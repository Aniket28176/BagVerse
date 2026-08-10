import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useLocation } from "react-router-dom";

const Stairs = ({ children }) => {
  const currentPath = useLocation().pathname;

  const stairParentRef = useRef(null);
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      // Hide page initially
      gsap.set(pageRef.current, {
        opacity: 0,
      });

      // Show stairs overlay
      tl.set(stairParentRef.current, {
        display: "block",
      });

      // Animate stairs in
      tl.from(".stair", {
        height: 0,
        duration: 0.5,
        stagger: {
          each: 0.08,
          from: "end",
        },
      });

      // Animate stairs out
      tl.to(".stair", {
        y: "100%",
        duration: 0.5,
        stagger: {
          each: 0.08,
          from: "end",
        },
      });

      // Hide overlay
      tl.set(stairParentRef.current, {
        display: "none",
      });

      // Reset stairs position for next navigation
      tl.set(".stair", {
        y: "0%",
        height: "100%",
      });

      // Show page after animation
      tl.to(pageRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    {
      dependencies: [currentPath],
      scope: stairParentRef,
    }
  );

  return (
    <>
      {/* Stairs Overlay */}
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-50 hidden"
      >
        <div className="flex h-full w-full">
          <div className="stair w-1/5 bg-black"></div>
          <div className="stair w-1/5 bg-black"></div>
          <div className="stair w-1/5 bg-black"></div>
          <div className="stair w-1/5 bg-black"></div>
          <div className="stair w-1/5 bg-black"></div>
        </div>
      </div>

      {/* Page Content */}
      <div ref={pageRef} className="w-full opacity-0">
        {children}
      </div>
    </>
  );
};

export default Stairs;