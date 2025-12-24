import React from 'react';

const Card = ({ 
	title, 
	description, 
	image, 
	footer, 
	onClick, 
	className = '',
	children 
}) => {
	return (
		<div
			className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col h-full ${className}`}
			onClick={onClick}
		>
			{/* Card Image */}
			{image && (
				<div className="overflow-hidden h-48 md:h-56 lg:h-64">
					<img
						src={image}
						alt={title}
						className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
					/>
				</div>
			)}

			{/* Card Content */}
			<div className="p-6 flex-1">
				{title && (
					<h3 className="text-xl font-bold text-gray-800 mb-2">
						{title}
					</h3>
				)}
        
				{description && (
					<p className="text-gray-600 text-sm mb-4">
						{description}
					</p>
				)}

				{children && (
					<div className="mb-4">
						{children}
					</div>
				)}
			</div>

			{/* Card Footer */}
			{footer && (
				<div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
					{footer}
				</div>
			)}
		</div>
	);
};

export default Card;

