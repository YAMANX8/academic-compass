import React from "react";
import { Icon } from "@iconify/react";

const Ratings = ({ rating = 0, size = 24 }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = Math.floor(5 - rating);

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill()
        .map((_, i) => (
          <Icon
            key={`full-${i}`}
            icon='mdi:star'
            width={size}
            height={size}
            color="#ffd700"
          />
        ))}
      {halfStar && (
        <Icon
          key="half"
          icon="mdi:star-half-full"
          width={size}
          height={size}
          color="#ffd700"
        />
      )}
      {Array(emptyStars)
        .fill()
        .map((_, i) => (
          <Icon
            key={`empty-${i}`}
            icon="mdi:star-outline"
            width={size}
            height={size}
            color="#ffd700"
            style={{ opacity: 0.5 }}
          />
        ))}
    </div>
  );
};

export default Ratings;
