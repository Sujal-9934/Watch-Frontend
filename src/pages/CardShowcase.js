import React from 'react';
import Card from '../components/card/Card';

const CardShowcase = () => {
  const handleCardClick = (cardTitle) => {
    alert(`You clicked on: ${cardTitle}`);
  };

  const watchProps = {
    title: ' Premium Watch',
    description: 'Elegant luxury watch with smart features and premium design.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop',
    footer: (
      <div className="flex justify-between items-center">
        <span className="text-gray-600 text-sm font-semibold">2999.99</span>
        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">View</button>
      </div>
    ),
    onClick: () => handleCardClick(' Premium Watch'),
  };
  // Additional cards defined in an array so we can map over them
  const cards = [
    watchProps,
    {
      title: ' Classic Watch',
      description: 'Timeless analog watch with leather strap and sapphire crystal.',
      image: 'https://tse2.mm.bing.net/th/id/OIP.jNHx-XPIHq8BYdAE3PjC0AHaHa?rs=1&pid=ImgDetMain&o=7&rm=3p',
      footer: <div className="text-gray-600 text-sm font-semibold">2500.00</div>,
      onClick: () => handleCardClick('Classic Watch'),
    },
    {
      title: ' Sport Watch',
      description: 'Lightweight sport watch with GPS and heart-rate monitoring.',
      image: 'https://www.bing.com/th/id/OIP.PRAZorMrV3eL3FXjtvU4SAHaJ2?w=160&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2',
      footer: <div className="text-gray-600 text-sm font-semibold">1790.00</div>,
      onClick: () => handleCardClick('Sport Watch'),
    },
    {
      title: ' Luxury Chrono',
      description: 'High-end chronograph with sapphire glass and ceramic bezel.',
      image: 'https://i.ytimg.com/vi/2bchIORxEhk/maxresdefault.jpg',
      footer: <div className="text-gray-600 text-sm font-semibold">10499.00</div>,
      onClick: () => handleCardClick('Luxury Chrono'),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Card Component Showcase</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {cards.map((c, idx) => (
            <div key={idx} className="w-full">
              <Card {...c} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardShowcase;
