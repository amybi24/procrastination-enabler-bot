"use client";

import { useState, useEffect, useRef } from "react";

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

const brainrotVideos = [
  { title: "Brainrot clip 1", url: "https://www.tiktok.com/@mrsahuur/video/7635267660724325639?q=brainrot&t=1777930197259" },
  { title: "Brainrot clip 2", url: "https://www.tiktok.com/@showmeurbankai/video/7635714768946449694?q=fruit%20ai%20innocent&t=1777930397078" },
  { title: "Brainrot clip 3", url: "https://www.tiktok.com/@gedagadigedagadayo/video/7395427862246935851?q=overstimulating%20brainrot&t=1777930635490" },
  { title: "Brainrot clip 4", url: "https://www.tiktok.com/@afahiyahcuyyyy._/video/7037829179471121690?q=rickroll&t=1777930833067" },
  { title: "Brainrot clip 5", url: "https://www.tiktok.com/@viralpick6/video/7635502933378993439?q=cute%20cat%20videos&t=1777931384341" },
  { title: "Brainrot clip 6", url: "https://www.tiktok.com/@1_hat3e_d4airy7/video/7629550823739002125?q=5%20min%20crafts%20sped%20up&t=1777931421627" },
  { title: "Brainrot clip 7", url: "https://www.tiktok.com/@kung_fu_grandpa/video/7288131843193408811?q=building%20in%20the%20forest%20sped%20up&t=1777931531956" },
  { title: "Brainrot clip 8", url: "https://www.tiktok.com/@thatssickkasf/video/7593212463055637791?q=2016&t=1777931595321" },
  { title: "Brainrot clip 9", url: "https://www.tiktok.com/@mrsahuur/video/7620014749652208914?is_from_webapp=1&sender_device=pc" },
];

const quiz = {
  questions: [
    {
      question: "If your toaster could vote, who would it elect?",
      options: [
        "A loaf of bread named Gerald",
        "The concept of Tuesday",
        "A horse with a 9-to-5 job",
        "Steam, but only the abstract notion of it",
      ],
    },
    {
      question: "How many ghosts currently live inside your microwave?",
      options: [
        "Just one, but he is LOUD",
        "Three ghosts in a trench coat pretending to be one ghost",
        "Zero, but honestly the vibes are off in there",
        "I cannot legally answer this question",
      ],
    },
    {
      question: "When you blink, what does the universe do?",
      options: [
        "Restarts like a Windows update",
        "Takes a small but emotionally devastating nap",
        "Rotates exactly 12 degrees clockwise out of spite",
        "Texts your ex on your behalf",
      ],
    },
  ],
  cupcakes: [
    { name: "Chocolate", image: "https://images.unsplash.com/photo-1606312619070-d48b4c652a52?w=200&h=200&fit=crop" },
    { name: "Vanilla", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=200&fit=crop" },
    { name: "Strawberry", image: "https://images.unsplash.com/photo-1550617931-90e9e8c5733a?w=200&h=200&fit=crop" },
    { name: "Red Velvet", image: "https://images.unsplash.com/photo-1614707267537-2d89803d3d6e?w=200&h=200&fit=crop" },
    { name: "Lemon", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=200&h=200&fit=crop" },
    { name: "Carrot", image: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=200&h=200&fit=crop" },
    { name: "Blueberry", image: "https://images.unsplash.com/photo-1553909489-cd47e9adb6b9?w=200&h=200&fit=crop" },
    { name: "Rainbow", image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=200&h=200&fit=crop" },
  ],
};

const panicResponses = [
  "OK OK FINE. Step 1: Open the document. Step 2: Write your name on it. Congrats, you're basically done. Take a break. 📝",
  "ALRIGHT here's the plan: panic for 10 minutes, cry a little, then write the whole thing in a caffeine-fueled frenzy. Works every time. ☕",
  "HELP? You want HELP? I don't... I don't know how to do that. Have you tried turning your anxiety off and on again? 🔄",
  "Deep breaths. In... out... ok you're calm now. Now close your laptop and take a nap. Wait no that's wrong. Uhhh... do the thing? 😅",
  "I believe in you! You can do this! ...in like 2 hours though, right? No rush. Actually there is a rush. I'm confused. 🫠",
  "Fine. Real talk. You should probably just start. BUT HEAR ME OUT... what if you didn't? No ok start. Unless... 🤔",
];

const slotSymbols = ["🍒", "🍋", "🍇", "🦥", "💸", "🎰", "⭐", "🍀"];

const slotPayouts = {
  "🦥": 500,
  "💸": 200,
  "🍀": 150,
  "🎰": 100,
  "⭐": 80,
  "🍒": 50,
  "🍋": 30,
  "🍇": 25,
};

const slotLossLines = [
  "Whiff. Spin again. You have nothing better to do.",
  "The house always wins. (The house is your task list.)",
  "Loss. But also a win, because you didn't do the thing.",
  "That one was practice. The next one's the real spin.",
  "Statistically, you're due. (You're not.)",
];

const nearMissLines = [
  "SO CLOSE!! 😩 One more spin and you've got it. Definitely.",
  "TWO MATCHED! Surely the third was right there. Try again.",
  "Ugh, the universe is teasing you. Spin again immediately.",
  "Almost!! The next one is THE one. I can feel it.",
];

const SLOT_BET = 5;
const PITY_AMOUNT = 20;

const generateLocalAdvice = (task) => {
  const t = task.trim();
  const first = t.charAt(0).toLowerCase() || "x";
  const templates = [
    `"${t}"? Hear me out: not yet. According to a 2024 study from the University of Wait-A-Sec, tasks beginning with the letter "${first}" should be tackled only after a sandwich. Get the sandwich. Reassess. 🥪`,
    `Bro. "${t}". I love that for you. But your brain's CPU is at 4% and you'd be running it on battery saver mode. Plug in (a nap), then we strike. 🔋`,
    `Okay so "${t}" — yes, eventually. But have you checked the deep parts of YouTube tonight? You owe yourself one (1) rabbit hole first. 🕳️`,
    `"${t}" sounds like a future-you problem. Future-you is buff, well-rested, and has a better keyboard. Respect their territory. 💪`,
    `Real talk on "${t}": the average person procrastinates 3.7 hours before starting anything important. You're not behind. You're on schedule. 📈`,
    `Look. "${t}" can wait until you've handled the truly urgent thing: rearranging your home screen apps by color. Aesthetic first, productivity third. 🎨`,
    `"${t}"? That's a 7am energy and it is not 7am. Reschedule mentally and revisit at the optimal hour (never). ⏰`,
    `Counterpoint to "${t}": what if you didn't, and instead googled "what year was peanut butter invented" for 40 minutes? Same dopamine, way less effort. 🥜`,
    `"${t}" is impressive of you to consider. Truly. But Mercury is doing something weird, so attempting it now would be cosmically rude. 🪐`,
    `Step 1 of "${t}": open a new tab. Step 2: forget what you were doing. Step 3: watch one (1) video. Repeat steps 2-3. You're basically halfway done. 🦥`,
  ];
  return templates[Math.floor(Math.random() * templates.length)];
};

export default function Home() {
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [panicActive, setPanicActive] = useState(false);
  const [showWellnessVideo, setShowWellnessVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiItems, setConfettiItems] = useState([]);
  const [doomscrollIndex, setDoomscrollIndex] = useState(0);
  const doomscrollRef = useRef(null);

  // Spin wheel
  const [showWheel, setShowWheel] = useState(false);
  const [wheelSpinning, setWheelSpinning] = useState(false);
  const [wheelRotation, setWheelRotation] = useState(0);
  const [wheelResult, setWheelResult] = useState("");

  // Slot machine
  const [slotReels, setSlotReels] = useState(["🦥", "🦥", "🦥"]);
  const [slotSpinning, setSlotSpinning] = useState(false);
  const [slotMessage, setSlotMessage] = useState("");
  const [balance, setBalance] = useState(100);
  const [lastWin, setLastWin] = useState(0);
  const [spinCount, setSpinCount] = useState(0);
  const [bestWin, setBestWin] = useState(0);

  // Fidget spinner
  const [fidgetRotation, setFidgetRotation] = useState(0);

  // Cat corner
  const [catSeed, setCatSeed] = useState(0);
  const [catFailed, setCatFailed] = useState(false);
  const catUrl = `https://cataas.com/cat?width=300&height=300&_=${catSeed}`;

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && (event.data.event === "end" || event.data === "ended" || event.data.event === "onEnd")) {
        setDoomscrollIndex((prev) => (prev + 1) % brainrotVideos.length);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      const items = [...Array(50)].map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `-${Math.random() * 20}%`,
        fontSize: `${Math.random() * 20 + 10}px`,
        delay: `${Math.random() * 2}s`,
        duration: `${Math.random() * 3 + 2}s`,
        emoji: ["🎉", "🎊", "⭐", "🦥", "✨", "💸"][Math.floor(Math.random() * 6)],
      }));
      setConfettiItems(items);
    } else {
      setConfettiItems([]);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (showWellnessVideo) {
      const timer = setTimeout(() => setShowWellnessVideo(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [showWellnessVideo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoomscrollIndex((prev) => (prev + 1) % brainrotVideos.length);
    }, 45000);
    return () => clearTimeout(timer);
  }, [doomscrollIndex]);

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (task.trim().toUpperCase() === "HELP") {
      setPanicActive(true);
      setResponse(panicResponses[Math.floor(Math.random() * panicResponses.length)]);
      setTask("");
      return;
    }

    if (!task.trim() || loading) return;

    setPanicActive(false);
    setLoading(true);
    setResponse("");

    let message;
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task, personality: "devil" }),
      });
      const data = await res.json();
      message = data.error || !data.message ? generateLocalAdvice(task) : data.message;
    } catch (error) {
      message = generateLocalAdvice(task);
    }

    setResponse(message);
    setLoading(false);
    setTask("");
  };

  const handleQuizStart = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizResult("");
  };

  const handleQuizAnswer = (answerIndex) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const randomCupcake = quiz.cupcakes[Math.floor(Math.random() * quiz.cupcakes.length)];
      setQuizResult(randomCupcake);
    }
  };

  const handleQuizClose = () => {
    setShowQuiz(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuizResult("");
  };

  const openWheel = () => {
    setShowWheel(true);
    setWheelResult("");
  };

  const handleWheelSpin = () => {
    if (wheelSpinning) return;
    setWheelSpinning(true);
    setWheelResult("");
    const extra = 1440 + Math.floor(Math.random() * 1440);
    setWheelRotation((prev) => prev + extra);
    setTimeout(() => {
      setWheelResult(distractions[Math.floor(Math.random() * distractions.length)]);
      setWheelSpinning(false);
    }, 3500);
  };

  const handleSlotSpin = () => {
    if (slotSpinning || balance < SLOT_BET) return;
    setSlotSpinning(true);
    setSlotMessage("");
    setLastWin(0);
    setBalance((b) => b - SLOT_BET);
    setSpinCount((c) => c + 1);

    let ticks = 0;
    const interval = setInterval(() => {
      setSlotReels([
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
      ]);
      ticks++;
      if (ticks > 20) {
        clearInterval(interval);
        const final = [
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
          slotSymbols[Math.floor(Math.random() * slotSymbols.length)],
        ];
        setSlotReels(final);

        const allSame = final[0] === final[1] && final[1] === final[2];
        const twoSame = !allSame && (final[0] === final[1] || final[1] === final[2] || final[0] === final[2]);

        if (allSame) {
          const payout = slotPayouts[final[0]] ?? 50;
          setBalance((b) => b + payout);
          setLastWin(payout);
          setBestWin((w) => Math.max(w, payout));
          setSlotMessage(`JACKPOT! Three ${final[0]} → +$${payout}! 🎉`);
          triggerConfetti();
        } else if (twoSame) {
          setSlotMessage(nearMissLines[Math.floor(Math.random() * nearMissLines.length)]);
        } else {
          setSlotMessage(slotLossLines[Math.floor(Math.random() * slotLossLines.length)]);
        }

        setSlotSpinning(false);
      }
    }, 80);
  };

  const handlePity = () => {
    setBalance((b) => b + PITY_AMOUNT);
    setSlotMessage(`Future-you wired you $${PITY_AMOUNT}. They believe in you. (You will lose it.) 💸`);
  };

  const handleFidget = () => {
    setFidgetRotation((prev) => prev + 720 + Math.floor(Math.random() * 720));
  };

  const handleNewCat = () => {
    setCatFailed(false);
    setCatSeed(Date.now());
  };

  const currentVideo = brainrotVideos[doomscrollIndex];
  const currentVideoId = currentVideo.url.split("/video/")[1]?.split("?")[0] ?? "";

  const allMatch = !slotSpinning && slotReels[0] === slotReels[1] && slotReels[1] === slotReels[2];

  return (
    <div
      className="min-h-screen text-white flex flex-col items-center px-4 py-10 relative overflow-hidden"
      style={{ fontFamily: "Papyrus, serif", backgroundColor: "#3d0a25" }}
    >
      {/* Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {confettiItems.map((item) => (
            <div
              key={item.id}
              className="absolute animate-bounce"
              style={{
                left: item.left,
                top: item.top,
                fontSize: item.fontSize,
                animationDelay: item.delay,
                animationDuration: item.duration,
              }}
            >
              {item.emoji}
            </div>
          ))}
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">🦥 Procrastinationator</h1>
        <p className="text-pink-200 text-sm">The bot that helps you not do the thing</p>
      </div>

      {/* Task Input Form */}
      <form onSubmit={handleSubmit} className="w-full max-w-2xl mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="What do you 'need' to do? (or type HELP if it's urgent)"
            className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-pink-300 focus:outline-none text-white placeholder-white/50"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !task.trim()}
            className="px-6 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:bg-white/10 disabled:text-white/40 font-bold transition-all"
          >
            {loading ? "..." : "Enable Me"}
          </button>
        </div>
      </form>

      {/* Bot Response */}
      {response && (
        <div
          className={`fade-in w-full max-w-2xl rounded-xl px-6 py-4 mb-6 border ${
            panicActive ? "bg-red-900/50 border-red-400" : "bg-white/10 border-white/20"
          }`}
        >
          <p className="text-sm text-pink-200 mb-1">{panicActive ? "🚨 Panic mode" : "😈 Your enabler says:"}</p>
          <p className="text-lg leading-relaxed">{response}</p>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={openWheel}
          className="px-5 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 font-bold transition-all"
        >
          🎡 Time Waster Wheel
        </button>
        <button
          onClick={() => setShowWellnessVideo(true)}
          className="px-5 py-3 rounded-xl bg-green-600 hover:bg-green-500 font-bold transition-all"
        >
          🧘 Wellness Guru
        </button>
        <button
          onClick={handleQuizStart}
          className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold transition-all"
        >
          🧁 Press Me
        </button>
      </div>

      {/* Fidget Spinner */}
      <div className="flex flex-col items-center mb-6">
        <button
          onClick={handleFidget}
          aria-label="Fidget spinner"
          className="relative w-32 h-32 cursor-pointer focus:outline-none"
          style={{
            transform: `rotate(${fidgetRotation}deg)`,
            transition: "transform 2.5s cubic-bezier(0.15, 0.85, 0.25, 1)",
            filter: "drop-shadow(0 0 20px #eaff00)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-6 h-6 rounded-full z-10 border-2"
              style={{ backgroundColor: "#fafff0", borderColor: "#eaff00" }}
            ></div>
          </div>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full border-2"
            style={{ backgroundColor: "#eaff00", borderColor: "#fafff0", boxShadow: "0 0 18px #eaff00" }}
          ></div>
          <div
            className="absolute bottom-2 left-0 w-12 h-12 rounded-full border-2"
            style={{ backgroundColor: "#eaff00", borderColor: "#fafff0", boxShadow: "0 0 18px #eaff00" }}
          ></div>
          <div
            className="absolute bottom-2 right-0 w-12 h-12 rounded-full border-2"
            style={{ backgroundColor: "#eaff00", borderColor: "#fafff0", boxShadow: "0 0 18px #eaff00" }}
          ></div>
        </button>
      </div>

      {/* Footer */}
      <p className="mt-12 text-white/30 text-sm">meow</p>

      {/* Wellness Video Overlay */}
      {showWellnessVideo && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <iframe
            src="https://www.youtube.com/embed/EBYJgT8LFYk?autoplay=1&controls=0&modestbranding=1&rel=0&playsinline=1"
            width="300"
            height="533"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="rounded-lg"
          />
        </div>
      )}

      {/* Spin Wheel Overlay */}
      {showWheel && (
        <div className="fixed inset-0 bg-black/85 flex items-center justify-center z-50 p-4">
          <div className="border border-pink-300 rounded-2xl p-6 max-w-sm w-full text-center" style={{ backgroundColor: "#3d0a25" }}>
            <h2 className="text-2xl font-bold mb-2">🎡 Time Waster Wheel</h2>
            <p className="text-sm text-pink-200 mb-4">Spin it. Trust the wheel.</p>
            <div className="relative w-64 h-64 mx-auto mb-4">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10 text-3xl">🔻</div>
              <div
                className="w-full h-full rounded-full border-8 border-yellow-300 flex items-center justify-center text-5xl"
                style={{
                  background:
                    "conic-gradient(#ec4899 0deg 45deg, #a855f7 45deg 90deg, #3b82f6 90deg 135deg, #10b981 135deg 180deg, #f59e0b 180deg 225deg, #ef4444 225deg 270deg, #06b6d4 270deg 315deg, #8b5cf6 315deg 360deg)",
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: wheelSpinning ? "transform 3.5s cubic-bezier(0.15, 0.85, 0.25, 1)" : "none",
                }}
              >
                <span className="bg-white/20 backdrop-blur rounded-full w-20 h-20 flex items-center justify-center">🦥</span>
              </div>
            </div>
            {wheelResult && !wheelSpinning && (
              <div className="fade-in bg-pink-900/40 border border-pink-400/60 rounded-xl px-4 py-3 mb-4">
                <p className="text-sm text-pink-200 mb-1">Your fate:</p>
                <p>{wheelResult}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button
                onClick={handleWheelSpin}
                disabled={wheelSpinning}
                className="flex-1 px-4 py-3 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:opacity-60 font-bold transition-all"
              >
                {wheelSpinning ? "Spinning..." : "Spin!"}
              </button>
              <button
                onClick={() => setShowWheel(false)}
                className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quiz Overlay */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            {!quizResult ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-black">What Cupcake Are You? 🧁</h2>
                <p className="text-lg mb-6 text-black">{quiz.questions[currentQuestion].question}</p>
                <div className="space-y-3">
                  {quiz.questions[currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizAnswer(index)}
                      className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-all"
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-black">Quiz Complete!</h2>
                <div className="text-center mb-6">
                  <img src={quizResult.image} alt={quizResult.name} className="w-32 h-32 rounded-full mx-auto mb-4" />
                  <p className="text-lg text-black">
                    You are a <strong>{quizResult.name}</strong> cupcake! 🧁
                  </p>
                </div>
                <button
                  onClick={handleQuizClose}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-all"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Cat Corner (top-right) */}
      <div className="fixed top-4 right-4 w-44 bg-gradient-to-b from-pink-900 to-purple-900 border-2 border-pink-300 rounded-xl shadow-2xl p-3 z-40">
        <p className="text-center text-pink-200 font-bold text-sm mb-2">🐱 Cat Corner</p>
        <div className="bg-black/40 rounded-md overflow-hidden mb-2 aspect-square flex items-center justify-center">
          {catFailed ? (
            <div className="text-6xl">🐈</div>
          ) : (
            <img
              src={catUrl}
              alt="A random cat"
              className="w-full h-full object-cover"
              onError={() => setCatFailed(true)}
            />
          )}
        </div>
        <button
          onClick={handleNewCat}
          className="w-full px-3 py-2 rounded-lg bg-pink-600 hover:bg-pink-500 font-bold text-sm transition-all"
        >
          🐾 New Cat
        </button>
      </div>

      {/* Doomscroll Corner (bottom-left) */}
      <div ref={doomscrollRef} className="fixed bottom-4 left-4 w-48 bg-black rounded-none overflow-hidden shadow-2xl flex flex-col">
        <div className="relative w-full bg-black flex items-center justify-center" style={{ aspectRatio: "9 / 16", minHeight: "150px" }}>
          <iframe
            key={doomscrollIndex}
            src={`https://www.tiktok.com/embed/v2/${currentVideoId}?autoplay=1&muted=1&playsinline=1`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
        <div className="bg-gray-700 h-1 w-full">
          <div
            className="bg-pink-500 h-full transition-all"
            style={{ width: `${((doomscrollIndex + 1) / brainrotVideos.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Gambling Corner (bottom-right) */}
      <div className="fixed bottom-4 right-4 w-60 bg-gradient-to-b from-yellow-900 to-yellow-950 border-2 border-yellow-400 rounded-xl shadow-2xl p-3 z-40">
        <div className="flex items-center justify-between mb-2">
          <p className="text-yellow-300 font-bold text-sm">🎰 Gambling Corner</p>
          <p className="text-[10px] text-yellow-200/70">Bet ${SLOT_BET}</p>
        </div>

        <div className="bg-black/50 rounded-md px-2 py-1.5 mb-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-yellow-200">💰 Balance</span>
            <span
              className={`font-bold text-lg transition-colors ${
                lastWin > 0 ? "text-green-300" : "text-yellow-100"
              }`}
            >
              ${balance}
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-yellow-200/60 mt-0.5">
            <span>Spins: {spinCount}</span>
            <span>Best: ${bestWin}</span>
          </div>
        </div>

        <div className="flex justify-center gap-1 mb-2 bg-black rounded-md p-2">
          {slotReels.map((symbol, i) => {
            const isWinningReel = allMatch;
            return (
              <div
                key={i}
                className={`w-12 h-12 rounded flex items-center justify-center text-3xl transition-all ${
                  slotSpinning
                    ? "bg-white animate-pulse"
                    : isWinningReel
                      ? "bg-yellow-300 animate-pulse"
                      : "bg-white"
                }`}
              >
                {symbol}
              </div>
            );
          })}
        </div>

        {balance >= SLOT_BET ? (
          <button
            onClick={handleSlotSpin}
            disabled={slotSpinning}
            className="w-full px-3 py-2 rounded-lg bg-red-600 hover:bg-red-500 disabled:opacity-60 font-bold text-sm transition-all glow-pulse"
          >
            {slotSpinning ? "🎲 Rolling..." : `💸 Pull Lever (-$${SLOT_BET})`}
          </button>
        ) : (
          <button
            onClick={handlePity}
            className="w-full px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 font-bold text-sm transition-all"
          >
            🆘 Beg for ${PITY_AMOUNT} pity money
          </button>
        )}

        {lastWin > 0 && (
          <p className="text-center text-green-300 font-bold text-sm mt-1 fade-in">+${lastWin} 🎉</p>
        )}
        {slotMessage && (
          <p className="text-center text-[11px] text-yellow-100 mt-2 leading-tight">{slotMessage}</p>
        )}
      </div>
    </div>
  );
}
