import React, { useState, useRef } from 'react';
// Add this dependency: npm install framer-motion
import { motion, useMotionValue, useTransform, useInView, useSpring } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  DollarSign, 
  Phone, 
  MessageCircle,
  Download,
  Star,
  Shield,
  Zap,
  Trophy,
  Target,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

function AnimatedSection({ children, id }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-20"
    >
      {children}
    </motion.section>
  );
}


export default function Home1() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  // --- 3D Hero Section Logic ---
  const heroRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Add spring for smoother animations
  const springConfig = { stiffness: 100, damping: 20, mass: 1 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  const glareX = useTransform(x, [-1, 1], ["-100%", "200%"]);
  const glareY = useTransform(y, [-1, 1], ["-100%", "200%"]);

  const handleMouseMove = (e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // --- Corrected FloatingIcon Component ---
  const FloatingIcon = ({ icon: Icon, className, animate }) => (
    <motion.div
      className={`absolute ${className}`}
      style={{
        // FIX: The output range must be an array of the same length as the input range.
        translateX: useTransform(mouseXSpring, [-0.5, 0.5], [animate.translateX, -animate.translateX]),
        translateY: useTransform(mouseYSpring, [-0.5, 0.5], [animate.translateY, -animate.translateY]),
      }}
    >
      <Icon className="w-12 h-12 text-orange-400/30" strokeWidth={1}/>
    </motion.div>
  );

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? -1 : index);
  };
const navigate = useNavigate();

  const apkUrl = 'https://github.com/xdashutosh/apks/raw/refs/heads/main/app-release.apk';
  const fileName = 'app-release.apk';

  const handleDownload = async () => {
    try {
      const response = await fetch(apkUrl);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed, falling back to direct link:', error);
      window.open(apkUrl, '_blank');
    }
  };
  
  const gameRates = [
    { name: 'Single Digit', rate: '10 KA 95', icon: Target, color: 'from-blue-500 to-blue-600' },
    { name: 'Jodi Digit', rate: '10 KA 950', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { name: 'Single Panna', rate: '10 KA 1400', icon: Star, color: 'from-purple-500 to-purple-600' },
    { name: 'Double Panna', rate: '10 KA 2800', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
    { name: 'Triple Panna', rate: '10 KA 7000', icon: Zap, color: 'from-red-500 to-pink-500' },
    { name: 'Half Sangam', rate: '10 KA 10000', icon: Shield, color: 'from-indigo-500 to-purple-500' },
    { name: 'Full Sangam', rate: '10 KA 100000', icon: DollarSign, color: 'from-emerald-500 to-teal-500' }
  ];

  const liveGames = [
    { name: 'SRIDEVI MORNING', numbers: '120 - 35 - 357', status: 'Betting is Close', trend: 'up' },
    { name: 'MANGAL MORNING', numbers: '457 - 63 - 337', status: 'Betting is Close', trend: 'down' },
    { name: 'SITA MORNING', numbers: '468 - 85 - 267', status: 'Betting is Close', trend: 'up' },
    { name: 'GEETA MORNING', numbers: '358 - 67 - 359', status: 'Betting is Close', trend: 'up' },
    { name: 'KARNATAKA DAY', numbers: '250 - 70 - 389', status: 'Betting is Close', trend: 'down' },
    { name: 'TULSI MORNING', numbers: '145 - 06 - 899', status: 'Betting is Close', trend: 'up' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased overflow-x-hidden">
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#fbe2e3,transparent)]"></div>
      </div>

      <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/70 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="flex items-center space-x-3 group">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                <div className="text-center">
                  <div className="text-white font-bold text-base leading-tight">Kalyan</div>
                  <div className="text-white font-bold text-xs leading-tight">555</div>
                </div>
              </div>
              <div className="text-2xl font-bold">
                <span className="text-slate-900">Kalyan</span>
                <span className="text-orange-500">555</span>
              </div>
            </motion.div>

            <nav className="hidden md:flex space-x-10">
              {['Home', 'Charts'].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  onClick={() => navigate("/main-market")}
                  className="relative text-slate-600 hover:text-orange-500 font-medium text-lg transition-colors duration-300 cursor-pointer group"
                >
                  {item}
                  <span className="absolute bottom-[-2px] left-0 w-0 h-0.5 bg-gradient-to-r from-orange-400 to-red-500 group-hover:w-full transition-all duration-300"></span>
                </motion.span>
              ))}
            </nav>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Button onClick={handleDownload} className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:shadow-orange-400/40 text-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                <Download className="w-5 h-5 mr-2" />
                Download App
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <motion.section 
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative min-h-[calc(100vh-80px)] w-full flex flex-col items-center justify-center overflow-hidden bg-transparent py-20 px-4"
      >
        <FloatingIcon icon={DollarSign} className="top-1/4 left-1/4" animate={{translateX: -40, translateY: -60}} />
        <FloatingIcon icon={Trophy} className="bottom-1/4 right-1/4" animate={{translateX: 40, translateY: 60}} />
        <FloatingIcon icon={Star} className="top-1/3 right-1/4" animate={{translateX: 60, translateY: -40}} />
        <FloatingIcon icon={Zap} className="bottom-1/3 left-1/4" animate={{translateX: -60, translateY: 40}} />

        <div className="relative z-10 text-center">
            <motion.div variants={itemVariants} className="mb-4">
              <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 py-1 px-4 text-sm font-semibold rounded-full shadow-sm">
                India's Most Trusted Gaming App
              </Badge>
            </motion.div>
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">
                Welcome to Kalyan 555
            </motion.h1>
            <motion.p variants={itemVariants} className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10">
                Experience the thrill of the game with the fastest results, secure transactions, and 24/7 support.
            </motion.p>
        </div>
        
        <motion.div 
            style={{ 
              transformStyle: "preserve-3d",
              rotateX,
              rotateY,
            }}
            variants={itemVariants}
        >
          <div style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }} className="relative h-96 w-56 md:h-[450px] md:w-[250px] rounded-[24px] border-2 border-b-4 border-r-4 border-slate-900 bg-slate-900 p-1 shadow-2xl">
              <div className="h-full w-full rounded-[18px] bg-slate-100 overflow-hidden">
                  <img src="https://saraa777.site/images/screenshots/banner-shot.png" alt="App Screenshot" className="h-full w-full object-cover"/>
              </div>
              <motion.div style={{
                  transform: "translateZ(0px)",
                  backgroundImage: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4), rgba(255,255,255,0) 40%)`,
              }} className="absolute inset-0 h-full w-full rounded-[18px] opacity-50"></motion.div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="mt-12">
            <Button onClick={handleDownload} size="lg" className="px-10 py-7 text-xl font-bold bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:shadow-orange-500/50 text-white rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Download className="w-6 h-6 mr-3"/>
                Download & Play Now
            </Button>
        </motion.div>
      </motion.section>

      {/* Rest of the components (unchanged) */}
      <AnimatedSection id="pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">Game Rates</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">The best rates in the market, guaranteed. More play, more win.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {gameRates.map((rate, index) => {
              const IconComponent = rate.icon;
              return (
                <motion.div key={index} variants={itemVariants}>
                  <div className="group relative cursor-pointer rounded-2xl p-0.5 bg-gradient-to-br from-slate-200 to-slate-300 hover:from-orange-400 hover:to-red-400 transition-all duration-300 shadow-md hover:shadow-xl">
                    <Card className="relative bg-white rounded-[14px] h-full transform transition-transform duration-300 group-hover:-translate-y-1">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 bg-gradient-to-br ${rate.color} rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-2">{rate.name}</h3>
                        <p className="text-slate-600 text-lg font-semibold">{rate.rate}</p>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>
      
      <AnimatedSection id="games">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants} className="text-center mb-16">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">Live Markets</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto">Real-time gaming action with live updates and instant results.</p>
              </motion.div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {liveGames.map((game, index) => (
                      <motion.div key={index} variants={itemVariants}>
                          <Card className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl border-0 group transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 overflow-hidden rounded-2xl">
                              <CardContent className="p-6 relative">
                                  <div className="flex items-start justify-between mb-4">
                                      <div>
                                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">{game.name}</h3>
                                          <Badge variant="destructive" className="mt-2 text-sm font-medium">{game.status}</Badge>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        {game.trend === 'up' ? 
                                          <TrendingUp className="w-5 h-5 text-green-500" /> : 
                                          <TrendingDown className="w-5 h-5 text-red-500" />
                                        }
                                      </div>
                                  </div>
                                  <p className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6 font-mono tracking-wider">{game.numbers}</p>
                                  <div className="flex gap-3">
                                      <Button onClick={() => navigate('/chart/jodichart')} variant="outline" className="flex-1">Jodi Chart</Button>
                                      <Button onClick={() => navigate('/chart/panachart')} variant="outline" className="flex-1">Pana Chart</Button>
                                  </div>
                              </CardContent>
                          </Card>
                      </motion.div>
                  ))}
              </div>
          </div>
      </AnimatedSection>

      <AnimatedSection id="about">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                  <motion.div variants={itemVariants}>
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700 mb-4">Why Choose Us?</Badge>
                      <h3 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-6">The Ultimate Gaming Experience</h3>
                      <p className="text-lg text-slate-600 mb-8 leading-relaxed">Kalyan 555 is built on a foundation of trust, speed, and user satisfaction. We provide a seamless and secure platform for you to enjoy your favorite games without any hassle.</p>
                      
                      <div className="space-y-6">
                        {[
                          { icon: Zap, title: "Fastest Results", description: "Get live updates and results quicker than anyone else." },
                          { icon: Shield, title: "Secure & Trusted", description: "Your data and funds are protected with industry-leading security." },
                          { icon: MessageCircle, title: "24/7 Customer Support", description: "Our team is always here to help you with any queries." },
                        ].map((feature, index) => (
                           <div key={index} className="flex items-start space-x-4">
                             <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center text-white shrink-0">
                               <feature.icon className="w-6 h-6" />
                             </div>
                             <div>
                               <h4 className="font-bold text-lg text-slate-800">{feature.title}</h4>
                               <p className="text-slate-600">{feature.description}</p>
                             </div>
                           </div>
                        ))}
                      </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="relative h-[500px]">
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-300 to-red-300 rounded-3xl blur-2xl opacity-40"></div>
                      <img src="https://img.freepik.com/premium-photo/mobile-offer-excited-young-indian-man-looking-smartphone-screen_116547-74635.jpg" alt="Joyful person using phone" className="relative w-full h-full object-cover rounded-3xl shadow-2xl"/>
                  </motion.div>
              </div>
          </div>
      </AnimatedSection>
      
      <AnimatedSection id="faq">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div variants={itemVariants} className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                      Frequently Asked <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">Questions</span>
                  </h2>
                  <p className="text-xl text-slate-600">Have questions? We have answers. If you can't find it here, contact us.</p>
              </motion.div>
              
              <div className="space-y-4">
                {[
                  {
                    question: "How do I start playing on Kalyan 555?",
                    answer: "It's simple! Just download the app using the button on our site, register your account, add funds to your wallet, and you're ready to start playing in your favorite markets."
                  },
                  {
                    question: "How do I deposit and withdraw money?",
                    answer: "We support multiple secure payment methods, including UPI, bank transfer, and popular digital wallets. Withdrawals are processed quickly and sent directly to your verified bank account."
                  },
                  {
                    question: "Is my personal and financial information safe?",
                    answer: "Absolutely. We use end-to-end encryption and the latest security protocols to ensure your data and transactions are always protected. Your privacy and security are our top priorities."
                  },
                  {
                    question: "What are the minimum deposit and withdrawal amounts?",
                    answer: "The minimum deposit is ₹500, and the minimum withdrawal amount is ₹1000. These limits ensure smooth and efficient transaction processing for all our users."
                  },
                ].map((faq, index) => (
                  <motion.div key={index} variants={itemVariants}>
                      <Card className="cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white transition-all duration-300 border-0 shadow-lg hover:shadow-xl group rounded-xl" onClick={() => toggleFaq(index)}>
                          <CardHeader>
                              <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg font-semibold text-slate-800 group-hover:text-orange-600 transition-colors duration-300">
                                      {faq.question}
                                  </CardTitle>
                                  <div className="w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full group-hover:bg-orange-100 transition-colors duration-300">
                                      <motion.div animate={{ rotate: expandedFaq === index ? 90 : 0 }}>
                                          <ChevronRight className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${expandedFaq === index ? 'rotate-90 text-orange-500' : ''}`} />
                                      </motion.div>
                                  </div>
                              </div>
                          </CardHeader>
                          <motion.div initial={false} animate={{ height: expandedFaq === index ? 'auto' : 0, opacity: expandedFaq === index ? 1 : 0 }} className="overflow-hidden">
                              <CardContent className="pt-0">
                                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                              </CardContent>
                          </motion.div>
                      </Card>
                  </motion.div>
                ))}
              </div>
          </div>
      </AnimatedSection>
      
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">K</span>
                </div>
                <span className="text-2xl font-bold text-white">Kalyan 555</span>
            </div>
            <p className="text-slate-400 max-w-lg mx-auto mb-8">
                The ultimate destination for online gaming. Please play responsibly. You must be 18+ to play.
            </p>
            <div className="mt-8 flex justify-center space-x-6">
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Terms of Service</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
                <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">Contact Us</a>
            </div>
            <p className="mt-8 text-sm text-slate-500">© {new Date().getFullYear()} Kalyan 555. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}