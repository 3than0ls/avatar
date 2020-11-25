import React from 'react';

export default function Loading(props) {
  const style = {
    fill: props.fill || 'none',
    stroke: props.color || '#000000',
    strokeWidth: 3,
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
      <path
        style={style}
        d="m16.0 1.527559l0 0c6.610676 0 12.38113 4.479434 14.020414 10.883634c1.6392841 6.4042006 -1.2693119 13.105212 -7.066984 16.281376c-5.7976704 3.1761665 -13.010645 2.0201015 -17.525288 -2.808876c-4.514642 -4.8289795 -5.1833243 -12.103342 -1.6246912 -17.674442"
      />
    </svg>
  );
}
