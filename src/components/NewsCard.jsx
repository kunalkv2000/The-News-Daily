import React from "react";

const NewsCard = ({ title, image, description, link }) => {
  // Default empty string for description
  // console.log(image, "Image URL passed to NewsCard");
  // Check if any of the required properties are null or undefined
  if (!title || !link) {
    return null; // If any of the essential props are missing, don't render the card
  }

  return (
    <div className="p-2  flex flex-row">
      <div class="rounded overflow-hidden shadow-lg flex flex-col">
        <div class="relative">
          {image ? (
            <img
              src={image ? encodeURI(image) : "/placeholder-image.jpg"}
              alt={title}
              className="w-full h-[200px] object-cover"
            />
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 text-sm">No Image Available</span>
            </div>
          )}
          <div class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25"></div>
        </div>
        <div class="px-6 py-4 mb-auto">
          <a
            href={link}
            target="_blank"
            class="font-medium text-lg hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          >
            {title}
          </a>
          <p class="text-gray-500 text-sm">
            {description && description.length > 120
              ? `${description.substring(0, 120)}...`
              : description || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
