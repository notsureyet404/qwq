import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Music2, Volume2, VolumeX, BarChart3 } from 'lucide-react';
import { Track } from '../types';

interface SidebarProps {
  tracks: Track[];
}

const Sidebar: React.FC<SidebarProps> = ({ tracks }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  // 新增：进度条相关状态
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 辅助函数：格式化时间 (秒 -> mm:ss)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlay = (index: number) => {
    if (currentTrackIndex === index) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
    }
  };

  // 处理拖拽进度条
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time); // UI 立即响应
    if (audioRef.current) {
      audioRef.current.currentTime = time; // 设置音频时间
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback error:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0); // 播放结束归零
  };

  return (
    <aside className="w-full md:w-80 bg-neon-surface border-b md:border-b-0 md:border-r border-slate-800 flex flex-col sticky top-0 md:h-screen z-50 shadow-2xl shrink-0 max-h-[50vh] md:max-h-screen">
      {/* 顶部标题区 - 保持不变 */}
      <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-between md:block">
        <div>
            <h1 className="text-lg md:text-xl font-bold font-mono text-neon-blue flex items-center gap-2">
            <Music2 className="w-5 h-5 md:w-6 md:h-6" />
            EML×JMC
            </h1>
            <p className="text-[10px] md:text-xs text-slate-400 mt-1 md:mt-2">ddl is 31st January 2026</p>
        </div>
        
        <button 
            onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
            className="md:hidden text-slate-400 hover:text-white transition-colors p-2"
        >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      {/* 歌曲列表区 - 保持不变 */}
      <div className="flex-1 overflow-y-auto p-2 md:p-4 md:space-y-4">
        <div className="hidden md:block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
          demos
        </div>
        
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:gap-4">
            {tracks.map((track, index) => {
                const isActive = currentTrackIndex === index;
                return (
                    <div 
                        key={track.id}
                        className={`group relative p-3 md:p-4 rounded-lg border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                            isActive 
                            ? 'bg-slate-800/50 border-neon-purple/50 shadow-[0_0_15px_rgba(189,0,255,0.1)]' 
                            : 'bg-slate-900 border-slate-800 hover:border-slate-600'
                        }`}
                        onClick={() => togglePlay(index)}
                    >
                        <div className="flex justify-between items-start mb-1 md:mb-2 w-full">
                            <div className="overflow-hidden">
                                <h3 className={`font-bold text-xs md:text-sm truncate pr-1 ${isActive ? 'text-neon-pink' : 'text-slate-200'}`}>
                                    {track.title}
                                </h3>
                                <p className="text-[10px] md:text-xs text-slate-400 truncate">{track.artist}</p>
                            </div>
                            <button className={`p-1.5 md:p-2 rounded-full shrink-0 ${isActive ? 'bg-neon-purple text-white' : 'bg-slate-800 text-slate-400 group-hover:text-white'}`}>
                                {isActive && isPlaying ? <Pause size={12} className="md:w-4 md:h-4" /> : <Play size={12} className="md:w-4 md:h-4" />}
                            </button>
                        </div>
                        
                        {isActive && isPlaying && (
                            <div className="flex items-end justify-center h-2 md:h-4 gap-[2px] md:gap-1 mt-1">
                                {[...Array(8)].map((_, i) => (
                                    <div 
                                        key={i} 
                                        className="w-1 bg-neon-blue rounded-t-sm animate-pulse"
                                        style={{ 
                                            height: `${Math.random() * 100}%`,
                                            animationDuration: `${0.5 + Math.random() * 0.5}s`
                                        }} 
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      {/* Global Player Controls - 修改部分 */}
      {/* 仅在 Desktop 显示，添加了进度条 */}
      <div className="hidden md:block p-4 bg-slate-950 border-t border-slate-800">
        
        {/* 新增：进度条区域 */}
        <div className="mb-3 w-full">
           <input
             type="range"
             min={0}
             max={duration || 100} // 防止 duration 为 0 时出错
             value={currentTime}
             onChange={handleSeek}
             className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-neon-blue hover:accent-neon-purple transition-all"
           />
           <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
             <span>{formatTime(currentTime)}</span>
             <span>{formatTime(duration)}</span>
           </div>
        </div>

        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <BarChart3 className={`w-4 h-4 ${isPlaying ? 'text-neon-green animate-pulse' : 'text-slate-600'}`} />
                <span className="text-xs text-slate-400 font-mono truncate max-w-[120px]">
                    {currentTrackIndex !== null ? tracks[currentTrackIndex].title : 'IDLE'}
                </span>
            </div>
            <button 
                onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                className="text-slate-400 hover:text-white transition-colors"
            >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentTrackIndex !== null ? tracks[currentTrackIndex].url : undefined}
        onEnded={handleEnded}
        // 新增：监听时间更新
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        // 新增：监听元数据加载（获取总时长）
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />
    </aside>
  );
};

export default Sidebar;
