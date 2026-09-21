import React, {useEffect, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, RotateCw} from 'lucide-react';
import './styles.css';

const DEMO_VIDEO = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';

function Player({src}) {
  const videoRef = useRef(null);
  const [playing,setPlaying] = useState(false);
  const [muted,setMuted] = useState(false);
  const [progress,setProgress] = useState(0);
  const [duration,setDuration] = useState(0);
  const [controls,setControls] = useState(true);
  const hideTimer = useRef(null);

  const reveal = () => {
    setControls(true);
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(()=>setControls(false), 2200);
  };

  useEffect(()=> {
    reveal();
    return ()=>clearTimeout(hideTimer.current);
  },[]);

  const togglePlay = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { await v.play(); setPlaying(true); }
    else { v.pause(); setPlaying(false); }
    reveal();
  };

  const seek = (delta) => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = Math.max(0, Math.min(v.duration || 0, v.currentTime + delta));
    reveal();
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    reveal();
  };

  const fullscreen = async () => {
    const v = videoRef.current;
    if (!v) return;
    if (document.fullscreenElement) await document.exitFullscreen();
    else await v.requestFullscreen?.();
    reveal();
  };

  const format = (s) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s/60);
    const sec = Math.floor(s%60).toString().padStart(2,'0');
    return `${m}:${sec}`;
  };

  return <main className="stage" onMouseMove={reveal} onTouchStart={reveal}>
    <div className={`player ${controls ? 'controls-visible':''}`}>
      <video
        ref={videoRef}
        src={src}
        playsInline
        preload="metadata"
        onClick={togglePlay}
        onLoadedMetadata={e=>setDuration(e.currentTarget.duration)}
        onTimeUpdate={e=>setProgress(e.currentTarget.currentTime)}
        onPlay={()=>setPlaying(true)}
        onPause={()=>setPlaying(false)}
      />
      <div className="vignette"/>
      <button className="center-play" aria-label="Play" onClick={togglePlay}>
        {playing ? <Pause size={27}/> : <Play size={27} fill="currentColor"/>}
      </button>
      <div className="controls">
        <input
          className="timeline"
          type="range"
          min="0" max={duration || 0.01} step="0.01"
          value={progress}
          onChange={e=>{videoRef.current.currentTime=Number(e.target.value);reveal()}}
          aria-label="Timeline"
        />
        <div className="control-row">
          <div className="left">
            <button onClick={togglePlay}>{playing ? <Pause/> : <Play fill="currentColor"/>}</button>
            <button onClick={()=>seek(-10)}><RotateCcw/></button>
            <button onClick={()=>seek(10)}><RotateCw/></button>
            <button onClick={toggleMute}>{muted ? <VolumeX/> : <Volume2/>}</button>
            <span className="time">{format(progress)} / {format(duration)}</span>
          </div>
          <button onClick={fullscreen}><Maximize/></button>
        </div>
      </div>
    </div>
  </main>
}

function Home() {
  return <div className="home"><Player src={DEMO_VIDEO}/></div>;
}

function App() {
  const path = window.location.pathname;
  return <Home />;
}

createRoot(document.getElementById('root')).render(<App/>);
