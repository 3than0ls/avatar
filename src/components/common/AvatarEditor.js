import React from 'react';
import RAE from 'react-avatar-editor';
import Slider from './Slider';
import Button from './Button';
import downloadImage from '~/utils/downloadImage';

const AvatarEditor = React.forwardRef(({ src, name, className }, ref) => {
  const [pos, setPos] = React.useState({ x: 0.5, y: 0.5 }); // 0 to 1

  const [scale, setScale] = React.useState(1);
  const [rotation, setRotation] = React.useState(0);
  const [radius, setRadius] = React.useState(0);

  // color is an option, add a color filter later
  const positionChange = (newPos) => {
    setPos(newPos);
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      <RAE
        ref={ref}
        image={src}
        width={384}
        height={384}
        scale={1 + scale / 100}
        rotate={rotation}
        position={pos}
        border={25}
        borderRadius={radius}
        onPositionChange={positionChange}
      />
      <span className="text-2xl my-4">Editor</span>
      <Slider key="scale" name="Scale Size" value={scale} setValue={setScale} ratio={1 / 10} isScale={true} />
      <Slider key="rotation" name="Rotation" value={rotation} setValue={setRotation} max={360} />
      <Slider key="radius" name="Border Radius" value={radius} setValue={setRadius} max={192} />
      <Button
        className="w-1/2 my-2"
        color="green"
        onClick={() => downloadImage(ref.current.getImageScaledToCanvas().toDataURL(), name)}
      >
        Save Edit
      </Button>
    </div>
  );
});

export default AvatarEditor;
