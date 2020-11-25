import React from 'react';

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(({ color = 'indigo', className = '', ...props }, ref) => {
  // because of how purgecss works, only indigo and green color is supported
  const tailwindColors = color === 'indigo' ? ['bg-indigo-300', 'bg-indigo-400'] : ['bg-green-300', 'bg-green-400'];
  return (
    <div
      {...props}
      className={`cursor-pointer rounded-lg p-4 hover:font-semibold transition duration-500 ease-in-out ${tailwindColors[0]} hover:${tailwindColors[1]} text-black text-center ${className}`}
    >
      {props.children}
    </div>
  );
});

export default Button;
