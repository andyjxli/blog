import React from 'react';

interface LandProps {
  title: string;
  description: string;
}

function Land({ title, description }: LandProps) {
  return (
    <div className="w-layout-container">
      <header className="w-page-header">
        <h1 className="w-page-header__headline">{title}</h1>
        <p className="w-page-header__copy">{description}</p>
      </header>
    </div>
  );
}

export default Land;
