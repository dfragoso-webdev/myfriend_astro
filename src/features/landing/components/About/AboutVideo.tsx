// src/features/landing/components/About/AboutVideo.tsx
import React, { type RefObject, useEffect } from 'react';

interface AboutVideoProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  videoSrc: string;
  isVisible: boolean;
  stats: {
    number: string;
    label: string;
  };
}

export const AboutVideo: React.FC<AboutVideoProps> = ({
  videoRef,
  videoSrc,
  isVisible,
  stats,
}) => {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;

    if (isVisible) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.log('Autoplay bloqueado:', err));
      }
    } else {
      video.pause();
    }
  }, [isVisible, videoRef]);

  return (
    <div className="relative">
      <div className="relative mx-auto w-full max-w-[300px]">
        <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl" style={{ aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            src={videoSrc}
            className="w-full h-full object-cover"
            width={300}
            height={533}
          >
            Tu navegador no soporta video.
          </video>
        </div>
      </div>
    </div>
  );
};