import React from "react";

const Skeleton = ({
  variant = "text",
  count = 1,
  className = "",
}) => {
  const skeletonClass = {
    text: "skeleton-text",
    avatar: "skeleton-avatar",
    card: "skeleton-card",
  }[variant];

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${skeletonClass} ${className} mb-4`} />
      ))}
    </>
  );
};

export default Skeleton;
