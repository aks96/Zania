import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { data } from './mock-data';
import './styles.css';

const ItemType = 'CARD';

const ImageWithSpinner = ({ src, alt }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="image-container">
      {isLoading && <div className="spinner"></div>}
      <img
        src={src}
        alt={alt}
        className="card-thumbnail"
        onLoad={handleImageLoad}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};

const DraggableCard = ({ document, index, moveCard }) => {
  const [, dragRef] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (item) => {
      if (item.index !== index) {
        moveCard(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="card"
    >
      <div className="image-wrapper">
        <ImageWithSpinner src={document.thumbnail} alt={document.title} />
      </div>
      <div className="card-content">
        <h2>{document.title}</h2>
        <p>{document.type}</p>
      </div>
    </div>
  );
};

const DocumentList = () => {
  const [documents, setDocuments] = useState(data);

  // Function to reorder documents array
  const moveCard = (fromIndex, toIndex) => {
    const updatedDocuments = [...documents];
    const [movedItem] = updatedDocuments.splice(fromIndex, 1);
    updatedDocuments.splice(toIndex, 0, movedItem);
    setDocuments(updatedDocuments);
  };

  return (
    <div className="card-container">
      {documents.map((document, index) => (
        <DraggableCard
          key={document.position}
          document={document}
          index={index}
          moveCard={moveCard}
        />
      ))}
    </div>
  );
};

export default DocumentList;
