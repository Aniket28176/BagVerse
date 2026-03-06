import React from "react";

const ProductSkeleton = () => {
  return (
    <div className="w-full max-w-sm rounded-2xl overflow-hidden bg-white card-shadow">
      {/* Image skeleton */}
      <div className="w-full h-64 bg-gray-200 animate-shimmer"></div>

      {/* Content skeleton */}
      <div className="p-4 md:p-5">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded mb-3 w-3/4 animate-shimmer"></div>

        {/* Rating skeleton */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 bg-gray-200 rounded animate-shimmer"></div>
            ))}
          </div>
          <div className="w-16 h-4 bg-gray-200 rounded animate-shimmer ml-auto"></div>
        </div>

        {/* Price skeleton */}
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-shimmer"></div>
          <div className="h-6 w-16 bg-gray-200 rounded animate-shimmer"></div>
        </div>

        {/* Description skeleton */}
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-200 rounded animate-shimmer"></div>
          <div className="h-4 bg-gray-200 rounded animate-shimmer w-5/6"></div>
        </div>

        {/* Buttons skeleton */}
        <div className="flex gap-2">
          <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
          <div className="flex-1 h-10 bg-gray-200 rounded-lg animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

const SkeletonGrid = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

export { ProductSkeleton, SkeletonGrid };
