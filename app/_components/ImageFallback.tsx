"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

type ImageFallbackProps = ImageProps & {
  fallbackSrc: string;
};

const ImageFallback = ({
  src,
  alt = "",
  fallbackSrc,
  ...props
}: ImageFallbackProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackSrc : src}
      {...props}
    />
  );
};

export default ImageFallback;
