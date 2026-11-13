"use client";

import React from "react";

// Native hardware-accelerated scrolling with zero JS hijacking or trackpad inertia fighting
export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
