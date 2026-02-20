'use client';

import { useState, useRef, useEffect } from 'react';
import './Player.css';

interface PlayerProps {
  src?: string;
}

export default function Player({ src = '/audio/Georgian.mp3' }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState('Натисніть для відтворення');
  const [isLoaded, setIsLoaded] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const mediaRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div className="player">
      <div className="player__controls">
        <button
          className={`player__button ${isPlaying ? 'player__button--playing' : ''}`}
          onClick={handleToggle}
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
            className="player__mute-btn"
            onClick={handleToggleMute}
            type="button"
            aria-label={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
            title={isMuted ? 'Увімкнути звук' : 'Вимкнути звук'}
          >
            {getVolumeIcon()}
          </button>
          <input
            className="player__volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            aria-label="Гучність"
          />
        </div>
      </div>

      <div className="player__progress" onClick={handleProgressClick}>
        <div className="player__progress-bar" style={{ width: `${progress}%` }} />
      </div>

      <div className="player__info">{info}</div>

      <audio 
        ref={mediaRef} 
        className="player__media" 
        src={src}
        preload="metadata"
        playsInline
        crossOrigin="anonymous"
      />
    </div>
  );
}
