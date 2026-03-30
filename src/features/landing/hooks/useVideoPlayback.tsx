// src/features/landing/hooks/useVideoPlayback.ts
import { useEffect, useRef, useState } from "react";

interface UseVideoPlaybackProps {
  threshold?: number;
  autoPlay?: boolean;
}

export const useVideoPlayback = ({
  threshold = 0.01,
  autoPlay = true,
}: UseVideoPlaybackProps = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (autoPlay && videoRef.current) {
            videoRef.current.play();
          }
        }
      },
      { threshold },
    );

    const currentVideoRef = videoRef.current;

    if (currentVideoRef) {
      observer.observe(currentVideoRef);
    }

    return () => {
      if (currentVideoRef) {
        observer.unobserve(currentVideoRef);
      }
      observer.disconnect();
    };
  }, [threshold, autoPlay]);

  return { videoRef, isVisible };
};
