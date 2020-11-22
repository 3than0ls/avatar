import React from 'react';

export default function Search(props) {
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
      <circle style={style} cx="13" cy="13" r="9" />
      <path style={style} d="M17,21l7,7c1.1,1.1,2.9,1.1,4,0l0,0c1.1-1.1,1.1-2.9,0-4l-7-7" />
    </svg>
  );
}
