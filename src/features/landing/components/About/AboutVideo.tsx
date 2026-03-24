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

// src/features/landing/components/About/AboutVideo.tsx

export const AboutVideo: React.FC<AboutVideoProps> = ({
  videoRef,
  videoSrc,
  isVisible,
  stats
}) => {
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Forzamos el silenciado por código para asegurar el autoplay
      video.muted = true; 
      
      if (isVisible) {
        // El timeout evita conflictos con la carga inicial del DOM
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(err => console.log('Autoplay bloqueado:', err));
        }
      } else {
        video.pause();
      }
    }
  }, [isVisible, videoRef]);

  return (
    <div className={`relative ... ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}>
      <div className="relative mx-auto w-full max-w-[340px]">
        <div className="relative overflow-hidden rounded-2xl bg-black shadow-2xl">
          <video
            ref={videoRef}
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            controls={true}
            src={videoSrc} 
            className="w-full aspect-[9/16] object-cover"
          >
            Tu navegador no soporta video.
          </video>
        </div>
      </div>
    </div>
  );
};