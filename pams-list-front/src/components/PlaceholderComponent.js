import React from 'react';

const PlaceholderComponent = ({ text }) => {
  return (
    <div className="container">
      <h1>{text}</h1>
      <p>This is a placeholder component for the {text} page. Content will be added here later.</p>
    </div>
  );
};

export default PlaceholderComponent;