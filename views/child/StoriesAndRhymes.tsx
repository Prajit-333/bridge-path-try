
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const StoriesAndRhymes: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'rhymes' | 'stories'>('rhymes');

    const rhymes = [
        { id: 1, title:'Baa Baa Black Sheep', duration: '1:24', url: 'https://res.cloudinary.com/djudf1lfv/video/upload/v1771589269/audio_evolv1_fhxn4r.mp3' },
        { id: 2, title: 'Itsy Bitsy Spider', duration: '0:58', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' },
        { id: 3, title: 'Old MacDonald', duration: '2:15', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
    ];

    const stories = [
        {
            id: 1,
            title: 'The Thirsty Crow',
            desc: 'Smart thinking helps a crow find water.',
            videoUrl: 'https://res.cloudinary.com/djudf1lfv/video/upload/v1771589635/Thirsty_Crow_Story_in_English___Moral_stories_for_Kids___Bedtime_Stories_for_Children_720P_HD_oh0vyo.mp4',
            thumbnail: 'https://cdn.dribbble.com/userupload/42447740/file/original-4ac4c263170ae40af25010731d158347.jpg?resize=1200x900&vertical=center'
        },
        {
            id: 2,
            title: 'The Lion and the Mouse',
            desc: 'A story about kindness and friendship.',
            videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            thumbnail: 'https://picsum.photos/seed/lion/400/225'
        },
    ];

    const [currentAudio, setCurrentAudio] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const togglePlay = (id: number, url: string) => {
        if (activeTab === 'stories') return; // Don't play audio if in stories tab

        if (currentAudio === id) {
            if (isPlaying) {
                audioRef.current?.pause();
                setIsPlaying(false);
            } else {
                audioRef.current?.play();
                setIsPlaying(true);
            }
        } else {
            setCurrentAudio(id);
            setIsPlaying(true);
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
            }
        }
    };

    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    // Stop audio when switching to stories
    useEffect(() => {
        if (activeTab === 'stories' && isPlaying) {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    }, [activeTab]);

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{
                backgroundColor: '#f1f8e9',
                backgroundImage:
                    'linear-gradient(rgba(241, 248, 233, 0.82), rgba(241, 248, 233, 0.82)), url(https://lh3.googleusercontent.com/aida/ADBb0uj-yIddZnneWgyGnYokHkeQsNRPGOzGrGo5IDEw5r_kpyCi7k9Fabwkqph3Sw9gwXYsFeubvH6D4K_bK96g1FPJyvp6ifQdfrAgnWxxgdI7jav3MEMPoI_I8aVfRkKn4PvkLMp4SGUCy5sC-iItTs9mkwqiMrswpaCZ4oSunKBRnHVNjoig9iYVAXOf8AHQBXe2OHkEbpMTT6MNXtXCD8dfoXZ0HH5_qeHmr3yIdG7ByMHSzOVFt7opjJKJMFXtSZHKQNbDKQHa9Q)',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                backgroundPosition: 'center',
            }}
        >
            <header className="sticky top-0 z-50 bg-white/85 backdrop-blur-md border-b border-slate-200/70 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate('/child')} className="size-10 rounded-full hover:bg-slate-100/70 flex items-center justify-center">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold">Stories & Rhymes</h1>
                </div>
            </header>

            {/* Tabs */}
            <div className="p-4 flex gap-4 max-w-2xl mx-auto w-full">
                <button
                    onClick={() => setActiveTab('rhymes')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'rhymes' ? 'bg-primary text-white shadow-md' : 'bg-white/85 backdrop-blur-md text-slate-700 border border-white/60 shadow-sm'}`}
                >
                    <span className="material-symbols-outlined">music_note</span>
                    Rhymes
                </button>
                <button
                    onClick={() => setActiveTab('stories')}
                    className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${activeTab === 'stories' ? 'bg-primary text-white shadow-md' : 'bg-white/85 backdrop-blur-md text-slate-700 border border-white/60 shadow-sm'}`}
                >
                    <span className="material-symbols-outlined">videocam</span>
                    Stories
                </button>
            </div>

            <main className="flex-1 overflow-y-auto p-4 max-w-2xl mx-auto w-full">
                {activeTab === 'rhymes' ? (
                    <div className="w-full space-y-4">
                        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} />
                        {rhymes.map(rhyme => (
                            <div key={rhyme.id} className={`bg-white/88 backdrop-blur-md p-4 rounded-2xl shadow-sm border-2 border-white/60 transition-all flex items-center justify-between ${currentAudio === rhyme.id ? 'border-primary bg-primary/10' : 'hover:border-slate-200/70'}`}>
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${currentAudio === rhyme.id ? 'bg-primary text-white' : 'bg-slate-100/90 text-slate-500'}`}>
                                        <span className="material-symbols-outlined">music_note</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800">{rhyme.title}</h3>
                                        <p className="text-sm text-slate-500">{rhyme.duration}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => togglePlay(rhyme.id, rhyme.url)}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${currentAudio === rhyme.id && isPlaying ? 'bg-primary text-white shadow-md' : 'bg-slate-100/90 text-slate-700 hover:bg-slate-200/90'}`}
                                >
                                    <span className="material-symbols-outlined text-2xl">
                                        {currentAudio === rhyme.id && isPlaying ? 'pause' : 'play_arrow'}
                                    </span>
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="w-full space-y-6">
                        {stories.map(story => (
                            <div key={story.id} className="bg-white/88 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden">
                                <div className="aspect-video bg-slate-100 relative">
                                    <video
                                        src={story.videoUrl}
                                        poster={story.thumbnail}
                                        controls
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-bold text-slate-800">{story.title}</h3>
                                    <p className="text-sm text-slate-500 mt-1">{story.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default StoriesAndRhymes;
