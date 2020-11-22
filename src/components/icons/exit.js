import React from 'react';

export default function Exit(props) {
  const style = {
    fill: props.fill || 'none',
    stroke: props.color || '#000000',
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    strokeMiterlimit: 10,
  };
  return (
    <svg
      version="1.1"
      id="Icons"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox={props.viewBox || '0 0 32 32'}
      width={props.width || 32}
      height={props.height || 32}
      className={props.className}
    >
      <circle style={style} cx="16" cy="16" r="13" />
      <line style={style} x1="13.2" y1="13.2" x2="18.8" y2="18.8" />
      <line style={style} x1="13.2" y1="18.8" x2="18.8" y2="13.2" />
    </svg>
  );
}
