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

const brainrotVideos = [
  {
    title: "Brainrot clip 1",
    url: "https://www.tiktok.com/@mrsahuur/video/7635267660724325639?q=brainrot&t=1777930197259",
  },
  {
    title: "Brainrot clip 2",
    url: "https://www.tiktok.com/@showmeurbankai/video/7635714768946449694?q=fruit%20ai%20innocent&t=1777930397078",
  },
  {
    title: "Brainrot clip 3",
    url: "https://www.tiktok.com/@gedagadigedagadayo/video/7395427862246935851?q=overstimulating%20brainrot&t=1777930635490",
  },
  {
    title: "Brainrot clip 4",
    url: "https://www.tiktok.com/@afahiyahcuyyyy._/video/7037829179471121690?q=rickroll&t=1777930833067",
  },
  {
    title: "Brainrot clip 5",
    url: "https://www.tiktok.com/@viralpick6/video/7635502933378993439?q=cute%20cat%20videos&t=1777931384341",
  },
  {
    title: "Brainrot clip 6",
    url: "https://www.tiktok.com/@1_hat3e_d4airy7/video/7629550823739002125?q=5%20min%20crafts%20sped%20up&t=1777931421627",
  },
  {
    title: "Brainrot clip 7",
    url: "https://www.tiktok.com/@kung_fu_grandpa/video/7288131843193408811?q=building%20in%20the%20forest%20sped%20up&t=1777931531956",
  },
  {
    title: "Brainrot clip 8",
    url: "https://www.tiktok.com/@thatssickkasf/video/7593212463055637791?q=2016&t=1777931595321",

      title: "Brainrot clip 8",
      url: "https://www.tiktok.com/@mrsahuur/video/7620014749652208914?is_from_webapp=1&sender_device=pc"
  },
];

const quiz = {
  questions: [
    {
      question: "What's a childhood memory that shaped who you are today?",
      options: ["A moment of comfort and safety", "An experience of joy and freedom", "A time of sweetness and innocence", "A memory of intensity and passion"],
    },
    {
      question: "How do you heal from heartbreak or deep emotional pain?",
      options: ["By seeking warmth and familiarity", "Through light-hearted distractions", "With something refreshing and new", "By indulging in intense experiences"],
    },
    {
      question: "What's your deepest fear in love and relationships?",
      options: ["Being alone forever", "Losing your sense of self", "Being hurt again", "Not finding true passion"],
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

export default function Home() {
  const [task, setTask] = useState("");
  const [response, setResponse] = useState("");
  const [personality, setPersonality] = useState("devil");
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(() => parseInt(localStorage.getItem("procrastination-streak") || "0"));
  const [milestone, setMilestone] = useState("");
  const [productivityScore, setProductivityScore] = useState(() => Math.floor(Math.random() * 15) + 85);
  const [snoozeCount, setSnoozeCount] = useState(0);
  const [snoozeText, setSnoozeText] = useState("");
  const [rouletteResult, setRouletteResult] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [panicActive, setPanicActive] = useState(false);
  const [showWellnessVideo, setShowWellnessVideo] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResult, setQuizResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiItems, setConfettiItems] = useState([]);
  const rouletteRef = useRef(null);
  const [doomscrollIndex, setDoomscrollIndex] = useState(0);
  const doomscrollRef = useRef(null);

  useEffect(() => {
    const handleMessage = (event) => {
      console.log('Message received:', event.data);
      if (event.data && (event.data.event === 'end' || event.data === 'ended' || event.data.event === 'onEnd')) {
        setDoomscrollIndex((prev) => (prev + 1) % brainrotVideos.length);
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
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
        emoji: ["🎉", "🎊", "⭐", "🦥", "✨"][Math.floor(Math.random() * 5)],
      }));
      setConfettiItems(items);
    } else {
      setConfettiItems([]);
    }
  }, [showConfetti]);

  useEffect(() => {
    if (showWellnessVideo) {
      const timer = setTimeout(() => setShowWellnessVideo(false), 6000); // 6 seconds
      return () => clearTimeout(timer);
    }
  }, [showWellnessVideo]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDoomscrollIndex((prev) => (prev + 1) % brainrotVideos.length);
    }, 45000); // 45 seconds
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

  const currentVideo = brainrotVideos[doomscrollIndex];
  const currentVideoId = currentVideo.url.split("/video/")[1]?.split("?")[0] ?? "";

  return (
    <div className="min-h-screen bg-[#0a0a2e] text-white flex flex-col items-center px-4 py-10 relative overflow-hidden" style={{fontFamily: 'Papyrus, serif'}}>
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
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold mb-2">
          🦥 Procrastinationator
        </h1>
      </div>

      {/* Stats Bar */}
      <div className="flex gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-center">
          <p className="text-sm text-purple-300">� Productivity</p>
          <p className="text-2xl font-bold text-green-400">
            {productivityScore}%
          </p>
        </div>
      </div>

      {/* Milestone Toast */}
      {milestone && (
        <div className="fade-in bg-purple-600/80 border border-purple-400 rounded-xl px-6 py-3 mb-6 text-center">
          <p className="font-bold">{milestone}</p>
        </div>
      )}

      {/* Wellness Guru Button */}
      <button
        onClick={() => setShowWellnessVideo(true)}
        className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold hover:bg-green-500 transition-all cursor-pointer mb-8"
      >
        🧘 Wellness Guru
      </button>

      {/* Press Me Button */}
      <button
        onClick={handleQuizStart}
        className="px-8 py-8 rounded-full bg-red-600 text-white font-bold hover:bg-red-500 transition-all cursor-pointer mb-8 shadow-lg hover:shadow-xl transform hover:scale-105"
      >
        Press Me
      </button>

      {/* Footer */}
      <p className="mt-12 text-white/20 text-sm">
        meow
      </p>

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
                  <p className="text-lg text-black">You are a <strong>{quizResult.name}</strong> cupcake! 🧁</p>
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

      {/* Doomscroll Corner */}
      <div
        ref={doomscrollRef}
        className="fixed bottom-4 left-4 w-48 bg-black rounded-none overflow-hidden shadow-2xl flex flex-col"
      >
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
    </div>
  );
}
