'use client';

import React from 'react';

export default function AnimatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="w-full animate-page-in"
      style={{ viewTransitionName: 'page' }}
    >
      {children}
    </div>
  );
}
