import React from 'react';

interface InfoCardProps {
  title: string;
  images: string[]; // An array of image URLs
  findings: string;
  readMore: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, images, findings, readMore }) => {
  return (
    <div className="info-card bg-white p-4 rounded-lg shadow-lg">
      {/* Title */}
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {/* Images */}
      <div className="images mb-4">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`image-${index}`} className="w-full h-auto mb-2 rounded-md" />
        ))}
      </div>

      {/* Findings */}
      <p className="findings text-gray-700 mb-4">{findings}</p>

      {/* Read More */}
      <a href={readMore} className="read-more text-blue-500 hover:underline">
        Read more...
      </a>
    </div>
  );
};

export default InfoCard;
