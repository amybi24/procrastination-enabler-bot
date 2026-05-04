"use client";

import { useState, useEffect, useRef } from "react";

const personalities = [
  { id: "devil", emoji: "😈", name: "Devil on Your Shoulder" },
  { id: "wellness", emoji: "🧘", name: "Wellness Guru" },
  { id: "statistician", emoji: "📊", name: "Fake Statistician" },
  { id: "parent", emoji: "🧡", name: "Supportive Parent" },
];

const milestones = {
  1: "Baby's first procrastination! 🍼",
  3: "A pattern is forming... 👀",
  5: "You're a natural at this! 🌟",
  10: "Double digits! It's a lifestyle now 💅",
  15: "Your to-do list filed a missing persons report 🚨",
  25: "Your productivity filed for divorce 💔",
  50: "Legendary Procrastinator status unlocked 🏆",
  100: "You are the final boss of doing nothing 👑",
};

const distractions = [
  "Watch a 2-hour video essay about something you'll forget tomorrow 🎬",
  "Take a quiz to find out what type of bread you are 🍞",
  "Reorganize your Spotify playlists by vibe and emotional damage level 🎵",
  "Google your own name to see if you're famous yet 🔍",
  "Start a show you absolutely do not have time for 📺",
  "Deep clean one specific drawer and nothing else 🧹",
  "Learn exactly three words in a language you'll never use 🗣️",
  "Look up flights to places you cannot afford ✈️",
  "See how many things in your room you can balance on your head 🤹",
  "Research an obscure conspiracy theory for 45 minutes 🕵️",
  "Try to break your screen time record 📱",
  "Rearrange your app icons by color 🎨",
  "Read the Wikipedia page for a random country 🌍",
  "Watch cooking videos for food you'll never make 👨‍🍳",
  "Calculate how many days old you are and have a crisis about it 📅",
  "Browse real estate listings in cities you'll never move to 🏡",
  "Rank every movie you've ever seen in a spreadsheet 🎬",
  "Stare at your ceiling and contemplate the void 🕳️",
  "See what your name means on Urban Dictionary 😳",
  "Try to draw a perfect circle freehand for 20 minutes ⭕",
];

const snoozeExcuses = [
  "You can't work on an empty soul. Rest first. 🛋️",
  "Mercury is in retrograde. It's literally not safe to be productive. 🪐",
  "Your future self is more qualified for this. Let them handle it. 🫡",
  "You haven't hydrated enough to think clearly. Drink water for 20 minutes. 💧",
  "The vibes are off. You can feel it. Trust the vibes. 🌀",
  "You should really stretch first. For like an hour. 🧘",
  "Your creativity peaks at 3am. Come back then. 🌙",
  "You can't rush greatness. And by greatness I mean doing nothing. 👑",
  "The WiFi seems slow. Better not risk losing your work. 📶",
  "You owe it to yourself to watch just ONE more video first. 📱",
  "Starting tasks on an even-numbered minute is bad luck. Wait. ⏰",
  "Your chair isn't ergonomically optimal. Fix that first. (Don't.) 🪑",
  "You should probably eat something first. A full meal. With dessert. 🍕",
  "Science says breaks boost productivity. This is a preemptive break. 🔬",
  "You look tired. Not physically. Emotionally. Rest your emotions. 😴",
];

const panicResponses = [
  "OK OK FINE. Step 1: Open the document. Step 2: Write your name on it. Congrats, you're basically done. Take a break. 📝",
  "ALRIGHT here's the plan: panic for 10 minutes, cry a little, then write the whole thing in a caffeine-fueled frenzy. Works every time. ☕",
  "HELP? You want HELP? I don't... I don't know how to do that. Have you tried turning your anxiety off and on again? 🔄",
  "Deep breaths. In... out... ok you're calm now. Now close your laptop and take a nap. Wait no that's wrong. Uhhh... do the thing? 😅",
  "I believe in you! You can do this! ...in like 2 hours though, right? No rush. Actually there is a rush. I'm confused. 🫠",
  "Fine. Real talk. You should probably just start. BUT HEAR ME OUT... what if you didn't? No ok start. Unless... 🤔",
];

export default function Home() {
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  const [personality, setPersonality] = useState("devil");
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);
  const [milestone, setMilestone] = useState("");
  const [productivityScore, setProductivityScore] = useState(92);
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [snoozeText, setSnoozeText] = useState("");
  const [rouletteResult, setRouletteResult] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [panicActive, setPanicActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const rouletteRef = useRef(null);

  useEffect(() => {
    setProductivityScore(Math.floor(Math.random() * 15) + 85);
    const saved = localStorage.getItem("procrastination-streak");
    if (saved) setStreak(parseInt(saved));
  }, []);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.trim().toUpperCase() === "HELP") {
      setPanicActive(true);
      setResponse(
        panicResponses[Math.floor(Math.random() * panicResponses.length)]
      );
      setTask("");
      return;
    }

    if (!task.trim() || loading) return;

    setPanicActive(false);
    setLoading(true);
    setResponse("");
    setMilestone("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, personality }),
      });

      const data = await res.json();

      if (data.error) {
        setResponse(data.error);
      } else {
        setResponse(data.message);
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem("procrastination-streak", newStreak.toString());
        if (milestones[newStreak]) {
          setMilestone(milestones[newStreak]);
          triggerConfetti();
        }
        setProductivityScore(Math.floor(Math.random() * 15) + 85);
      }
    } catch (error) {
      setResponse("Even the bot is procrastinating right now. Try again! 🦥");
    }

    setLoading(false);
    setTask("");
  };

  const handleSnooze = () => {
    const newCount = snoozeCount + 1;
    setSnoozeCount(newCount);
    setSnoozeText(
      snoozeExcuses[Math.floor(Math.random() * snoozeExcuses.length)]
    );
  };

  const handleRoulette = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setRouletteResult("");

    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      setRouletteResult(
        distractions[Math.floor(Math.random() * distractions.length)]
      );
      spins++;
      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
      }
    }, 100);
  };

  const handleShare = () => {
    if (!response) return;
    const shareText = `🦥 The Procrastination Enabler Bot says:\n\n"${response}"\n\nMy productivity score: ${productivityScore}% | Streak: ${streak} tasks avoided`;
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a2e] via-[#1a1045] to-[#0d0d2b] text-white flex flex-col items-center px-4 py-10 relative overflow-hidden">
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${Math.random() * 3 + 2}s`,
              }}
            >
              {["🎉", "🎊", "⭐", "🦥", "✨"][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
          🦥 Procrastination Enabler Bot
        </h1>
        <p className="text-lg text-purple-300">
          Your productivity&apos;s worst nightmare
        </p>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-purple-300">🔥 Streak</p>
          <p className="text-2xl font-bold">{streak}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-purple-300">📊 Productivity</p>
          <p className="text-2xl font-bold text-green-400">
            {productivityScore}%
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-purple-300">😴 Snoozes</p>
          <p className="text-2xl font-bold text-orange-400">{snoozeCount}</p>
        </div>
      </div>

      {/* Milestone Toast */}
      {milestone && (
        <div className="fade-in bg-purple-600/80 border border-purple-400 rounded-xl px-6 py-3 mb-6 text-center">
          <p className="font-bold">{milestone}</p>
        </div>
      )}

      {/* Personality Selector */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {personalities.map((p) => (
          <button
            key={p.id}
            onClick={() => setPersonality(p.id)}
            className={`px-4 py-3 rounded-xl border transition-all cursor-pointer ${
              personality === p.id
                ? "bg-purple-600 border-purple-400 glow-pulse"
                : "bg-white/5 border-white/10 hover:bg-white/10"
            }`}
          >
            <span className="text-xl">{p.emoji}</span>
            <p className="text-sm mt-1">{p.name}</p>
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder='What should you be doing right now? (Type "HELP" for panic mode)'
            className="flex-1 px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 text-lg"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-lg hover:from-orange-400 hover:to-yellow-400 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Enabling..." : "🦥 Enable Me"}
          </button>
        </div>
      </form>

      {/* Response Card */}
      {(response || loading) && (
        <div className="fade-in w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {panicActive
                  ? "🚨"
                  : personalities.find((p) => p.id === personality)?.emoji}
              </span>
              <span className="text-sm text-purple-300 font-medium">
                {panicActive
                  ? "PANIC MODE"
                  : personalities.find((p) => p.id === personality)?.name}
              </span>
            </div>
            {response && !loading && (
              <button
                onClick={handleShare}
                className="text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
              >
                {copied ? "✅ Copied!" : "📋 Share"}
              </button>
            )}
          </div>
          {loading ? (
            <div className="flex items-center gap-2 text-white/50">
              <div className="animate-spin h-4 w-4 border-2 border-purple-400 border-t-transparent rounded-full"></div>
              <span>Crafting your excuse...</span>
            </div>
          ) : (
            <p
              className={`text-lg leading-relaxed ${
                panicActive ? "text-red-300" : ""
              }`}
            >
              {response}
            </p>
          )}
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl mb-8">
        {/* Snooze Button */}
        <button
          onClick={handleSnooze}
          className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-red-600 to-red-500 text-white font-bold text-lg hover:from-red-500 hover:to-red-400 transition-all active:scale-95 cursor-pointer"
        >
          😴 Snooze Responsibilities
        </button>

        {/* Roulette Button */}
        <button
          onClick={handleRoulette}
          disabled={isSpinning}
          className="flex-1 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-lg hover:from-emerald-500 hover:to-teal-400 transition-all disabled:opacity-50 active:scale-95 cursor-pointer"
        >
          {isSpinning ? "🌀 Spinning..." : "🎰 Distraction Roulette"}
        </button>
      </div>

      {/* Snooze Result */}
      {snoozeText && (
        <div className="fade-in w-full max-w-2xl bg-red-500/10 border border-red-500/30 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-red-300 font-medium">
              😴 Snooze says:
            </span>
          </div>
          <p className="text-lg">{snoozeText}</p>
        </div>
      )}

      {/* Roulette Result */}
      {rouletteResult && (
        <div
          ref={rouletteRef}
          className={`fade-in w-full max-w-2xl bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 mb-6 ${
            isSpinning ? "animate-pulse" : ""
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-emerald-300 font-medium">
              🎰 You should:
            </span>
          </div>
          <p className="text-lg">{rouletteResult}</p>
        </div>
      )}

      {/* Footer */}
      <p className="mt-12 text-white/20 text-sm">
        Built for absolutely no productive reason whatsoever
      </p>
    </div>
  );
}
