import { ChangeEvent, useEffect, useState } from "react";

type ImageDimmension = {
  width: number;
  height: number;
};

export const useImageDimensions = () => {
  const [fileInputEvent, setFileInputEvent] =
    useState<ChangeEvent<HTMLInputElement> | null>(null);
  const [isPending, setIsPending] = useState(false);

  const [imageDimensions, setImageDimensions] =
    useState<ImageDimmension | null>(null);

  useEffect(() => {
    const file = fileInputEvent?.target.files?.[0];
    if (!file) return;

    setIsPending(true);

    const reader = new FileReader();
    const img = new Image();

    img.onload = () => {
      setImageDimensions({ width: img.width, height: img.height });
      setIsPending(false);
    };

    reader.onloadend = (e) => {
      if (!e.target || typeof e.target?.result !== "string") return;
      img.src = e.target.result;
    };

    reader.readAsDataURL(file);

    return () => {
      img.onload = null;
      reader.onloadend = null;
    };
  }, [fileInputEvent]);

  return { imageDimensions, setFileInputEvent, isPending } as const;
};
