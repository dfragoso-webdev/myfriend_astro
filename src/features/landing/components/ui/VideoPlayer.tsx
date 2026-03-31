// src/features/landing/components/ui/VideoPlayer.tsx
import React, { useEffect } from 'react';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

interface VideoPlayerProps {
  src: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  preload?: 'auto' | 'metadata' | 'none';
  poster?: string;
  threshold?: number;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  preload = 'metadata',
  poster,
  threshold = 0.3,
}) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLVideoElement>({
    threshold,
    triggerOnce: false,
  });

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (isIntersecting && autoPlay) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.debug('Autoplay blocked');
        });
      }
    } else if (!isIntersecting) {
      video.pause();
    }
  }, [isIntersecting, autoPlay, ref]);

  return (
    <video
      ref={ref}
      src={src}
      muted={muted}
      controls={true}
      loop={loop}
      playsInline={playsInline}
      preload={preload}
      poster={poster}
      className={`object-cover ${className}`}
      width="100%"
      height="auto"
    />
  );
};