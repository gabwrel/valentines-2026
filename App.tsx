import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { HeartBackground } from "./components/HeartBackground";
import { TimelineCard } from "./components/TimelineCard";
import { PlayfulNoButton } from "./components/PlayfulNoButton";
import { TimelineItem, AppPhase } from "./types";
import { ChevronDown, Sparkles, Heart, Volume2, VolumeX } from "lucide-react";
// Import audio so Vite copies and resolves it for production builds (Vercel)
import musicSrc from "./assets/music/music.mp3";

const timelineData: TimelineItem[] = [
  {
    id: 1,
    icon: "🕰️",
    title: "2023",
    description:
      "Our first Valentine's together. We ate at Afriques and it used to be a place of my childhood. Now it now reminds me of being a place where we first spent our first valentines together.",
  },
  {
    id: 2,
    icon: "✨",
    title: "2024",
    description:
      "We celebrated Valentine’s the day after because of work. It was our first time eating at Mestizo and everytime we go back there adds more happy memories. It's been a place for us ever since ❤️",
  },
  {
    id: 3,
    icon: "📸",
    title: "2025",
    description:
      "Another post-Valentine’s celebration 😂. Slurping ramen at Roxas made us realize we prefer Batchoy and there's no place too far for me to go just to be with you. Promise I won't arrive way too early next time.",
  },
  {
    id: 4,
    icon: "🫣",
    title: "2026",
    description: "This year I hope we can celebrate it this time on the 14th.",
  },
];

const App: React.FC = () => {
  const [phase, setPhase] = useState<AppPhase | "loading">("loading");
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#fff5f5", "#fdf2f2", "#fff1f2"],
  );

  const opacityIntro = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const scaleIntro = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

  // Handle music playback based on phase changes
  useEffect(() => {
    if ((phase === "scrolling" || phase === "accepted") && audioRef.current) {
      audioRef.current
        .play()
        .catch((e) => console.log("Soft audio play failed:", e));
    }
  }, [phase]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted;
  }, [isMuted]);

  const startExperience = () => {
    setPhase("scrolling");
  };

  const handleYes = () => {
    setPhase("accepted");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetExperience = () => {
    setPhase("scrolling");
  };

  return (
    <motion.div
      style={{ backgroundColor: background }}
      className="min-h-screen selection:bg-rose-200"
    >
      <audio ref={audioRef} loop src={musicSrc} />

      <HeartBackground fast={phase === "accepted"} />

      {/* Mute Toggle */}
      {phase !== "loading" && (
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="fixed bottom-6 right-6 z-50 p-3 bg-white/50 backdrop-blur-md rounded-full text-rose-500 shadow-sm hover:shadow-md transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {phase === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-rose-50 text-center p-6"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="mb-8 text-rose-500"
            >
              <Heart size={64} fill="currentColor" />
            </motion.div>
            <h1 className="text-3xl font-bold text-rose-900 serif italic mb-8">
              A little story for you...
            </h1>
            <button
              onClick={startExperience}
              className="px-12 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-xl shadow-rose-200 hover:bg-rose-600 transition-all active:scale-95"
            >
              Begin Our Story
            </button>
          </motion.div>
        )}

        {phase === "scrolling" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative z-10"
          >
            {/* Section 1: Intro */}
            <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
              <motion.div style={{ opacity: opacityIntro, scale: scaleIntro }}>
                <h1 className="text-4xl md:text-6xl font-bold text-rose-900 mb-8 leading-tight italic serif">
                  Valentine’s for us always meant being
                  <br className="hidden md:block" /> together.
                </h1>
                <p className="text-xl md:text-2xl text-rose-700 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
                  But still
                  <br />I want to ask you properly
                </p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="flex flex-col items-center text-rose-400 gap-2"
                >
                  <span className="text-sm tracking-widest uppercase font-medium">
                    Scroll down
                  </span>
                  <ChevronDown size={24} />
                </motion.div>
              </motion.div>
            </section>

            {/* Section 2: Timeline */}
            <section className="max-w-4xl mx-auto px-6 py-24 relative">
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-rose-200 hidden md:block" />
              <div className="flex flex-col">
                {timelineData.map((item, index) => (
                  <TimelineCard key={item.id} item={item} index={index} />
                ))}
              </div>
            </section>

            {/* Section 3: Build-up Section */}
            <section className="h-screen flex flex-col items-center justify-center p-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ margin: "-100px" }}
              >
                <p className="text-2xl md:text-3xl text-rose-700 font-light max-w-2xl mx-auto leading-relaxed italic serif">
                  So even if Valentine’s already means “us”… <br />
                  <br />
                  I still want to ask. <br />
                  <br />
                  Because choosing you is never automatic — <br />
                  it’s intentional.
                </p>
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mt-12 flex flex-col items-center text-rose-300 gap-2 opacity-50"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </motion.div>
            </section>

            {/* Section 4: The Ask (Main Moment) */}
            <section className="h-screen flex flex-col items-center justify-center p-6 text-center space-y-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ margin: "-100px" }}
                className="space-y-12"
              >
                <h2 className="text-4xl md:text-6xl font-bold text-rose-900 serif px-4">
                  Will you go out with me this <br /> Valentine’s Day?
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button
                    onClick={handleYes}
                    className="group relative px-10 py-4 bg-rose-500 text-white rounded-full font-bold text-xl shadow-lg shadow-rose-200 hover:bg-rose-600 transition-all hover:scale-105 flex items-center gap-2"
                  >
                    <Heart className="group-hover:fill-current" size={24} />
                    💗 Yes
                  </button>
                  <PlayfulNoButton />
                </div>
              </motion.div>
            </section>
          </motion.div>
        )}

        {phase === "accepted" && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 text-center bg-rose-50/80 backdrop-blur-xl"
          >
            <div className="space-y-8 max-w-2xl">
              <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-9xl drop-shadow-xl"
              >
                💕
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-bold text-rose-900 serif italic">
                Yay!
              </h1>
              <p className="text-2xl md:text-3xl text-rose-700 font-light leading-relaxed">
                I already knew the answer. <br />I just wanted to ask you
                properly.
              </p>
              <div className="pt-8 flex flex-col items-center gap-4">
                <p className="text-rose-600 text-xl font-bold tracking-widest flex items-center gap-3">
                  <Sparkles className="animate-pulse" size={24} />
                  SEE YOU ON OUR DATE
                  <Sparkles className="animate-pulse" size={24} />
                </p>
                <button
                  onClick={resetExperience}
                  className="mt-4 text-rose-400 underline underline-offset-4 text-sm opacity-50 hover:opacity-100 transition-opacity"
                >
                  Watch our story again
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
