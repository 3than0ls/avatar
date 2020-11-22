import React from 'react';

// eslint-disable-next-line react/display-name
const Button = React.forwardRef(({ color = 'indigo', className = '', ...props }, ref) => {
  return (
    <div
      {...props}
      className={`cursor-pointer rounded-lg p-4 hover:font-semibold transition duration-500 ease-in-out bg-${color}-300 hover:bg-${color}-400 text-black text-center ${className}`}
    >
      {props.children}
    </div>
  );
});

export default Button;
