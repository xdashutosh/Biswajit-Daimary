import React, { useState, useEffect } from 'react';
import { ChevronRight, Trophy, Coins, Users, Shield, Zap, Star, ArrowRight, DollarSign, TrendingUp, Sparkles, Crown, Gem, Target, Award, Timer, Gift, Wallet, Clock, CreditCard, BadgeCheck, Banknote, PiggyBank, Percent, Calculator, IndianRupee, Play } from 'lucide-react';

export default function Home2() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [countUp, setCountUp] = useState({ users: 0, winners: 0, payout: 0 });

  const [animatedNumbers, setAnimatedNumbers] = useState([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    // Animate counter
    const counterInterval = setInterval(() => {
      setCountUp(prev => ({
        users: Math.min(prev.users + 237, 125000),
        winners: Math.min(prev.winners + 89, 45000),
        payout: Math.min(prev.payout + 50000, 10000000)
      }));
    }, 50);

    // Auto-rotate testimonials
    const testimonialInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 4);
    }, 4000);

    // Animate random numbers
    const numberInterval = setInterval(() => {
      const newNumbers = Array.from({ length: 5 }, () => ({
        value: Math.floor(Math.random() * 100) + 1,
        x: Math.random() * window.innerWidth,
        y: -50
      }));
      setAnimatedNumbers(prev => [...prev.slice(-20), ...newNumbers]);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(counterInterval);
      clearInterval(testimonialInterval);
      clearInterval(numberInterval);
    };
  }, []);

  const games = [
    { 
      name: "Single Digit", 
      range: "0-9", 
      payout: "1 KA 10", 
      minBet: "₹10",
      description: "Pick a single number from 0 to 9",
      icon: "🎯",
      gradient: "from-purple-600 to-pink-600",
      details: "Choose any single digit and win 10 times your bet amount"
    },
    { 
      name: "Jodi Digits", 
      range: "00-99", 
      payout: "1 KA 100", 
      minBet: "₹10",
      description: "Pick a two-digit combination",
      icon: "🎰",
      gradient: "from-blue-600 to-cyan-600",
      details: "Select any two-digit number combination from 00 to 99"
    },
    { 
      name: "Single Pana", 
      range: "000-999", 
      payout: "1 KA 150", 
      minBet: "₹10",
      description: "Three-digit number with all different digits",
      icon: "🔥",
      gradient: "from-green-600 to-emerald-600",
      details: "Pick 3 different digits like 123, 456, 789"
    },
    { 
      name: "Double Pana", 
      range: "000-999", 
      payout: "1 KA 300", 
      minBet: "₹10",
      description: "Three-digit number with two same digits",
      icon: "💎",
      gradient: "from-orange-600 to-red-600",
      details: "Choose numbers like 112, 223, 334 with two identical digits"
    },
    { 
      name: "Triple Pana", 
      range: "000-999", 
      payout: "1 KA 700", 
      minBet: "₹10",
      description: "Three identical digits",
      icon: "👑",
      gradient: "from-pink-600 to-purple-600",
      details: "Select triple numbers like 111, 222, 333, 444"
    },
    { 
      name: "Half Sangam", 
      range: "0-9 + Pana", 
      payout: "1 KA 1000", 
      minBet: "₹10",
      description: "Combination of single digit + pana",
      icon: "⚡",
      gradient: "from-yellow-600 to-orange-600",
      details: "Match single digit from one session with pana from another"
    },
    { 
      name: "Full Sangam", 
      range: "Pana + Pana", 
      payout: "1 KA 10000", 
      minBet: "₹10",
      description: "Combination of two panas",
      icon: "💰",
      gradient: "from-red-600 to-pink-600",
      details: "Ultimate jackpot! Match both opening and closing panas"
    }
  ];

  const liveGames = [
    { name: "SRIDEVI MORNING", result: "120 - 35 - 357", status: "Betting is Close", time: "11:05 AM" },
    { name: "MANGAL MORNING", result: "457 - 63 - 337", status: "Betting is Close", time: "11:20 AM" },
    { name: "SITA MORNING", result: "468 - 85 - 267", status: "Betting is Close", time: "11:35 AM" },
    { name: "GEETA MORNING", result: "358 - 67 - 359", status: "Betting is Close", time: "11:50 AM" },
    { name: "KARNATAKA DAY", result: "250 - 70 - 389", status: "Betting is Close", time: "12:05 PM" },
    { name: "TULSI MORNING", result: "145 - 06 - 899", status: "Betting is Close", time: "12:20 PM" },
    { name: "MILAN MORNING", result: "579 - 14 - 347", status: "Betting is Close", time: "12:35 PM" },
    { name: "ANDHRA MORNING", result: "228 - 25 - 249", status: "Betting is Close", time: "12:50 PM" },
    { name: "KALYAN MORNING", result: "490 - 35 - 249", status: "Betting is Close", time: "01:05 PM" },
    { name: "JANTA DAY", result: "189 - 82 - 129", status: "Betting is Close", time: "01:20 PM" },
    { name: "TIME BAZAR MORNING", result: "123 - 67 - 250", status: "Betting is Close", time: "01:35 PM" },
    { name: "MAIN BAZAR MORNING", result: "223 - 73 - 120", status: "Betting is Close", time: "01:50 PM" }
  ];

  const testimonials = [
    { name: "Rajesh K.", win: "₹45,000", game: "Triple Pana", text: "Won big on my third try! The platform is genuine and payouts are instant." },
    { name: "Priya S.", win: "₹22,500", game: "Double Pana", text: "I've been playing for 3 months now. Consistent wins and great support team!" },
    { name: "Amit P.", win: "₹87,000", game: "Full Sangam", text: "Life-changing win! Withdrew my money within minutes. Highly recommended!" },
    { name: "Sunita D.", win: "₹15,800", game: "Single Digit", text: "Started with just ₹100 and now I'm earning daily. Amazing platform!" }
  ];

  const apkUrl = 'https://github.com/xdashutosh/apks/raw/refs/heads/main/app-release.apk';
  const fileName = 'app-release.apk';

  const handleDownload = async () => {
    try {
      console.log('Fetching file...');
      
      // Fetch the file with no-cors to avoid redirect issues
      const response = await fetch(apkUrl, {
        method: 'GET',
        mode: 'cors', // Try cors first
        cache: 'no-cache'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Get the blob data
      const blob = await response.blob();
      console.log('File fetched, size:', blob.size, 'bytes');
      
      // Force download using blob URL
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      
      document.body.appendChild(a);
      a.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
      
      console.log('Download initiated');
      
    } catch (error) {
      console.error('Blob download failed:', error);
      
      // Alternative method - create iframe download
      try {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = apkUrl + '?download=1';
        document.body.appendChild(iframe);
        
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 5000);
        
        console.log('Iframe download initiated');
      } catch (iframeError) {
        console.error('Iframe download failed:', iframeError);
        // Last resort - forced download attribute
        const link = document.createElement('a');
        link.href = apkUrl;
        link.download = fileName;
        link.setAttribute('download', fileName);
        link.click();
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30" />
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.15) 0%, transparent 50%)`
          }}
        />
        
        {/* Floating Numbers Animation */}
        {animatedNumbers.map((num, i) => (
          <div
            key={i}
            className="absolute text-2xl font-bold text-purple-400/20 animate-bounce"
            style={{
              left: `${num.x}px`,
              transform: `translateY(${scrollY * 0.5 + num.y}px)`,
              animation: `fall ${5 + Math.random() * 5}s linear`
            }}
          >
            {num.value}
          </div>
        ))}

        {/* Glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-black/90 backdrop-blur-xl shadow-2xl' : ''}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 blur-lg opacity-75 animate-pulse" />
                <h1 className="relative text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  MATKA 777
                </h1>
              </div>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#games" className="hover:text-purple-400 transition-colors">Games</a>
              <a href="#live-games" className="hover:text-purple-400 transition-colors">Live Games</a>
              <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
              <a href="#winners" className="hover:text-purple-400 transition-colors">Winners</a>
              <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
              <button className="relative group overflow-hidden px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 font-semibold transition-transform hover:scale-105">
                <span className="relative z-10" onClick={handleDownload}>Download App</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            {/* Floating badges */}
            <div className="flex justify-center gap-4 mb-6">
              <div className="px-4 py-2 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-500/30 animate-bounce" style={{ animationDelay: '0.1s' }}>
                <span className="text-sm">🔥 Instant Payouts</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-pink-900/50 backdrop-blur-sm border border-pink-500/30 animate-bounce" style={{ animationDelay: '0.2s' }}>
                <span className="text-sm">✨ 24/7 Live Games</span>
              </div>
              <div className="px-4 py-2 rounded-full bg-purple-900/50 backdrop-blur-sm border border-purple-500/30 animate-bounce" style={{ animationDelay: '0.3s' }}>
                <span className="text-sm">🏆 Daily Winners</span>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
                WIN BIG WITH
              </span>
              <br />
              <span className="relative inline-block mt-2">
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 blur-2xl opacity-50 animate-pulse" />
                <span className="relative text-white">MATKA 777</span>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              India's Most Trusted Online Matka Platform
              <br />
              <span className="text-lg text-purple-400">Pick Your Lucky Number • Place Your Bet • Win Instantly!</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <button onClick={handleDownload} className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/50">
                <span className="flex items-center gap-2">
                  Start Playing Now <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 border-2 border-purple-500 rounded-full font-bold text-lg hover:bg-purple-500/20 transition-all hover:scale-105">
                <span className="flex items-center gap-2">
                  <Play className="w-5 h-5" /> Watch Demo
                </span>
              </button>
            </div>

            {/* Live Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-purple-400">{countUp.users.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Active Players</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
                <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-yellow-400">{countUp.winners.toLocaleString()}+</div>
                <div className="text-sm text-gray-400">Daily Winners</div>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 hover:scale-105 transition-transform">
                <IndianRupee className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-green-400">₹{(countUp.payout / 100000).toFixed(1)}L+</div>
                <div className="text-sm text-gray-400">Total Payouts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-8 h-8 rotate-90 text-purple-400" />
        </div>
      </section>

      {/* Live Games Section */}
      <section id="live-games" className="py-20 px-6 bg-gradient-to-b from-black to-purple-900/10">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Live Games & Results
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real-time updates from all active games</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-12">
            {liveGames.map((game, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-900/90 to-black backdrop-blur-sm rounded-xl p-4 border border-gray-800 hover:border-purple-500/50 transition-all">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-sm text-purple-400">{game.name}</h3>
                  <span className="text-xs text-red-400 bg-red-900/30 px-2 py-1 rounded">
                    {game.status}
                  </span>
                </div>
                <div className="text-2xl font-bold text-white mb-2">{game.result}</div>
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Next: {game.time}</span>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-yellow-600/20 text-yellow-400 rounded border border-yellow-600/30 hover:bg-yellow-600/30">
                      Jodi Chart
                    </button>
                    <button className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded border border-blue-600/30 hover:bg-blue-600/30">
                      Pana Chart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Game Rules Section */}
          <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
            <h3 className="text-2xl font-bold mb-6 text-center">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Game Rules & Payouts
              </span>
            </h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Basic Games</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Single Digit (0-9)</span>
                    <span className="text-green-400">1 KA 10</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Jodi Digits (00-99)</span>
                    <span className="text-green-400">1 KA 100</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Pana Games</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Single Pana</span>
                    <span className="text-green-400">1 KA 150</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Double Pana</span>
                    <span className="text-green-400">1 KA 300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Triple Pana</span>
                    <span className="text-green-400">1 KA 700</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-purple-400">Sangam Games</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Half Sangam</span>
                    <span className="text-green-400">1 KA 1000</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Full Sangam</span>
                    <span className="text-green-400">1 KA 10000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
              <p className="text-sm text-yellow-300">
                <strong>Note:</strong> "1 KA" means if you bet ₹1, you win the amount shown. For example, 1 KA 100 means ₹1 bet wins ₹100, ₹10 bet wins ₹1000, and so on.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Section */}
      <section id="games" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Choose Your Game
              </span>
            </h2>
            <p className="text-xl text-gray-400">Multiple ways to win big every day!</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {games.map((game, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity"
                     style={{ backgroundImage: `linear-gradient(135deg, ${game.gradient.split(' ')[1]} 0%, ${game.gradient.split(' ')[3]} 100%)` }} />
                
                <div className="relative p-6">
                  <div className="text-4xl mb-3">{game.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{game.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                  <p className="text-xs text-gray-500 mb-4">{game.details}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Range:</span>
                      <span className="font-semibold">{game.range}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Payout:</span>
                      <span className="font-semibold text-green-400">{game.payout}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Min Bet:</span>
                      <span className="font-semibold">{game.minBet}</span>
                    </div>
                  </div>

                  <button className={`w-full py-3 rounded-lg bg-gradient-to-r ${game.gradient} font-semibold transition-all hover:shadow-lg hover:scale-105 text-sm`}>
                    Play Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                How It Works
              </span>
            </h2>
            <p className="text-xl text-gray-400">Start winning in just 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: CreditCard, title: "1. Register & Deposit", desc: "Create your account and add funds securely using UPI, Bank Transfer, or Wallets" },
              { icon: Target, title: "2. Pick Your Numbers", desc: "Choose your lucky numbers from our various game modes and place your bet" },
              { icon: Gift, title: "3. Win & Withdraw", desc: "Win up to 10000x your bet! Instant withdrawals to your bank account" }
            ].map((step, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                  <step.icon className="w-16 h-16 text-purple-400 mb-4 mx-auto" />
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Why Choose Matka 777?
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Shield, title: "100% Secure", desc: "Bank-grade security for all transactions" },
              { icon: Zap, title: "Instant Payouts", desc: "Get your winnings in minutes, not days" },
              { icon: Clock, title: "24/7 Games", desc: "Play anytime, anywhere on any device" },
              { icon: Percent, title: "Best Odds", desc: "Highest payout rates in the industry" },
              { icon: BadgeCheck, title: "Licensed & Legal", desc: "Fully licensed and regulated platform" },
              { icon: Users, title: "Live Support", desc: "24/7 customer support via chat & phone" }
            ].map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-transform">
                <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20 hover:border-purple-500/50 transition-all">
                  <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Winners Section */}
      <section id="winners" className="py-20 px-6 bg-gradient-to-b from-purple-900/10 to-black">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Recent Winners
              </span>
            </h2>
            <p className="text-xl text-gray-400">Real players, real wins, real money!</p>
          </div>

          {/* Live ticker */}
          <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm rounded-full p-4 mb-12 overflow-hidden">
            <div className="flex animate-scroll-left whitespace-nowrap">
              {[...Array(10)].map((_, i) => (
                <span key={i} className="mx-8 flex items-center">
                  <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                  Player{Math.floor(Math.random() * 9000) + 1000} won ₹{Math.floor(Math.random() * 50000) + 5000} in {games[Math.floor(Math.random() * games.length)].name}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-gray-800 transition-all duration-500 ${
                  activeTestimonial === index ? 'scale-105 border-purple-500 shadow-2xl shadow-purple-600/30' : ''
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-3">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-400">{testimonial.game}</div>
                  </div>
                </div>
                <div className="text-2xl font-bold text-green-400 mb-2">{testimonial.win}</div>
                <p className="text-gray-400 text-sm">{testimonial.text}</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 p-12 md:p-20">
            <div className="absolute inset-0 bg-black/20" />
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Win Big?</h2>
              <p className="text-xl mb-8 opacity-90">Join thousands of winners today!</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={handleDownload} className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                  Register Now - Get ₹100 Bonus
                </button>
                <button onClick={handleDownload} className="px-8 py-4 bg-black/30 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-black/40 transition-all">
                  Download App
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
                MATKA 777
              </h3>
              <p className="text-gray-400">India's most trusted online matka platform with instant payouts.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">How to Play</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Results</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">FAQs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-purple-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">WhatsApp Support</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-purple-400 transition-colors">Responsible Gaming</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Payment Partners</h4>
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'VISA', 'PhonePe', 'GPay', 'Paytm', 'Bank'].map((payment, i) => (
                  <div key={i} className="bg-gray-800 rounded px-2 py-1 text-xs text-center">
                    {payment}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center pt-8 border-t border-gray-800">
            <p className="text-gray-400">&copy; 2024 Matka 777. All rights reserved. Play responsibly. 18+</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fall {
          to {
            transform: translateY(calc(100vh + 100px));
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-scroll-left {
          animation: scroll-left 30s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}