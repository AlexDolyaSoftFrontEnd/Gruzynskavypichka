'use client';

import { useState, useRef, useEffect, MouseEvent } from 'react';
import './Player.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMusic, faGripLines } from '@fortawesome/free-solid-svg-icons';

interface PlayerProps {
  src?: string;
  onClose?: () => void;
}

export default function Player({ src = '/audio.mp3', onClose }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState('Натисніть для відтворення');
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const mediaRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media) return;

    media.volume = volume;

    const handleTimeUpdate = () => {
      if (media.duration) {
        const percent = (media.currentTime / media.duration) * 100;
        setProgress(percent);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setInfo('Відтворення завершено');
    };

    const handleError = (e: Event) => {
      const target = e.target as HTMLAudioElement;
      console.error('Audio error details:', {
        errorCode: target.error?.code,
        errorMessage: target.error?.message,
        networkState: target.networkState,
        readyState: target.readyState,
        src: target.src
      });
      
      let errorMsg = 'Помилка завантаження файлу';
      if (target.error?.code === 4) {
        errorMsg = 'Формат файлу не підтримується';
      } else if (target.networkState === 3) {
        errorMsg = 'Файл не знайдено';
      }
      setInfo(errorMsg);
    };

    const handleCanPlay = () => {
      setIsLoaded(true);
      setInfo('Готово до відтворення');
    };

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    media.addEventListener('timeupdate', handleTimeUpdate);
    media.addEventListener('ended', handleEnded);
    media.addEventListener('error', handleError);
    media.addEventListener('canplaythrough', handleCanPlay);
    media.addEventListener('loadedmetadata', handleLoadedMetadata);

    return () => {
      media.removeEventListener('timeupdate', handleTimeUpdate);
      media.removeEventListener('ended', handleEnded);
      media.removeEventListener('error', handleError);
      media.removeEventListener('canplaythrough', handleCanPlay);
      media.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, [volume]);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | globalThis.MouseEvent) => {
      if (!isDragging) return;
      
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      const maxX = window.innerWidth - (playerRef.current?.offsetWidth || 0);
      const maxY = window.innerHeight - (playerRef.current?.offsetHeight || 0);
      
      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handlePlay = async () => {
    if (!mediaRef.current) return;

    try {
      await mediaRef.current.play();
      setIsPlaying(true);
      setInfo('Відтворюється...');
    } catch (error) {
      console.warn('Playback failed:', error);
      setInfo('Помилка відтворення');
    }
  };

  const handlePause = () => {
    if (!mediaRef.current) return;

    mediaRef.current.pause();
    setIsPlaying(false);
    setInfo('Натисніть для відтворення');
  };

  const handleToggle = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current || !mediaRef.current.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    mediaRef.current.currentTime = pos * mediaRef.current.duration;
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    
    if (mediaRef.current) {
      mediaRef.current.volume = newVolume;
    }
    
    setIsMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
    if (!mediaRef.current) return;
    
    if (isMuted) {
      mediaRef.current.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      mediaRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return '🔇';
    if (volume < 0.5) return '🔈';
    return '🔊';
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.player__interactive')) return;
    
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    });
  };

  const handleClose = () => {
    if (mediaRef.current) {
      mediaRef.current.pause();
      mediaRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    
    if (onClose) {
      onClose();
    }
  };

  return (
    <div
      ref={playerRef}
      className="player"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default'
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="player__header">
        {/* Close Button (Left) */}
        {onClose && (
          <button
            className="player__close-btn player__interactive"
            onClick={handleClose}
            type="button"
            aria-label="Закрити"
            title="Закрити і зупинити"
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        )}

        {/* Title (Center) */}
        <div className="player__title">
          <FontAwesomeIcon icon={faMusic} className="player__title-icon" />
          <span>Music</span>
        </div>

        {/* Drag Handle (Right) */}
        <div className="player__drag-handle" title="Перетягнути">
          <FontAwesomeIcon icon={faGripLines} className="player__drag-icon" />
        </div>
      </div>

      <div className="player__controls">
        <button
          className={`player__button player__interactive ${isPlaying ? 'player__button--playing' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            handleToggle();
          }}
          type="button"
          aria-label={isPlaying ? 'Пауза' : 'Відтворити'}
          disabled={!isLoaded}
        >
          <span className="player__icon" />
          <span className="player__pause">
            <span className="player__bar" />
            <span className="player__bar" />
          </span>
        </button>

        <div className="player__volume">
          <button
            className="player__mute-btn player__interactive"
            onClick={(e) => {
              e.stopPropagation();
              handleToggleMute();
            }}
            type="button"
            aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
            title={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
          >
            {getVolumeIcon()}
          </button>
          <input
            className="player__volume-slider player__interactive"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => {
              e.stopPropagation();
              handleVolumeChange(e);
            }}
            onClick={(e) => e.stopPropagation()}
            aria-label="Гучність"
          />
        </div>
      </div>

      <div 
        className="player__progress player__interactive" 
        onClick={(e) => {
          e.stopPropagation();
          handleProgressClick(e);
        }}
      >
        <div className="player__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="player__info">{info}</div>

      <audio 
        ref={mediaRef} 
        className="player__media" 
        src={currentSrc}
        preload="metadata"
        playsInline
        crossOrigin="anonymous"
      />
    </div>
  );
}
