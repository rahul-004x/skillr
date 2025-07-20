// HeaderSkeleton.tsx

import React from "react";

/**
 * Skeleton loader for the header section.
 * Mimics the layout of the actual header while data is loading.
 */
export default function HeaderSkeleton(): React.ReactElement {
  return (
    <section className="animate-pulse mx-auto my-8 w-full max-w-2xl space-y-8 bg-white px-4 print:space-y-4">
      <header className="flex items-start justify-between gap-4 md:items-center">
        <div className="flex-1 space-y-1.5">
          {/* Name skeleton */}
          <div className="mb-1 h-7 w-40 rounded bg-gray-200 dark:bg-gray-700" />
          {/* About skeleton */}
          <div className="mb-1 h-4 w-64 rounded bg-gray-200 dark:bg-gray-700" />
          {/* Location skeleton */}
          <div className="mb-2 h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
          {/* Social links skeleton */}
          <div className="flex gap-x-1 pt-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"
              />
            ))}
          </div>
          {/* Print contact info skeleton */}
          <div className="mt-2 hidden gap-x-2 print:flex">
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
            <span className="h-4 w-2" />
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
            <span className="h-4 w-2" />
            <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
        {/* Avatar skeleton */}
        <div className="flex size-28 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700">
          <svg
            className="h-12 w-12 text-gray-300 dark:text-gray-600"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
      </header>
    </section>
  );
}
