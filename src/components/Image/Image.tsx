import { useRef } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image = ({ src, alt, className }: ImageProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);

  return (
    <img
      ref={imgRef}
      src={src}
      onError={() => {
        if (imgRef.current) {
          imgRef.current.src =
            'https://plchldr.co/i/300x300?bg=cffafe&fc=0e7490&text=Oops';
          imgRef.current.alt = 'Image not available';
        }
      }}
      alt={alt}
      className={className}
    />
  );
};

export default Image;
