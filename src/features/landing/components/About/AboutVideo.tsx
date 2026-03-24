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
  stats
}) => {
  // Control adicional de reproducción
  useEffect(() => {
    if (videoRef.current) {
      if (isVisible) {
        videoRef.current.play().catch(err => {
          console.log('Error playing video:', err);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isVisible, videoRef]);

  return (
    <div
      className={`relative order-1 lg:order-2 transition-all duration-1000 delay-300 transform ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
      }`}
    >
      <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[300px] md:max-w-[340px]">
        <div className="absolute -inset-3 bg-gradient-to-r from-primary-color/20 to-luxe-island/20 rounded-2xl blur-xl opacity-50" />

        <div className="relative overflow-hidden rounded-xl md:rounded-2xl bg-black/5 shadow-2xl">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            autoPlay
            controls
            preload="auto"
            className="w-full aspect-[9/16] object-cover"
          >
            <source src={videoSrc} type="video/mp4" />
            Tu navegador no soporta la reproducción de video.
          </video>
        </div>
      </div>
    </div>
  );
};