import React from 'react';

export default function Slider({ name, value, setValue, max = 100 }) {
  return (
    <>
      <div className="text-lg">{name}</div>
      <div className="w-full mb-4 flex justify-center items-center text-center select-none">
        <div className="text-3xl text-gray-600 mx-5">-</div>
        <input
          type="range"
          min="1"
          max={max}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="slider w-1/2 h-2 rounded-md outline-none appearance-none transition duration-300 ease-in-out bg-gray-400 hover:bg-gray-500"
        />
        <div className="text-3xl text-gray-600 mx-5">+</div>
      </div>
    </>
  );
}
