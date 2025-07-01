import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Users, Heart, Eye, MessageSquare, FileText, Share2, 
  TrendingUp, Calendar, BarChart3, Clock, Target, 
  Instagram, Youtube, Facebook, Twitter, Linkedin,
  Globe, Video, Image, Type, Layers, Radio, Menu, X,
  Home, Settings, Bell, Mail, User, LogOut,
  ChevronLeft, ChevronRight, Search, Plus, Activity,
  Users2,
  MessageCircle,
  Cloud,
  Computer,
  UserCheck,
  Speaker,
  BookOpen,
  HardHat,
  Handshake,
  Key,
  Book
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Dashboard Component (your existing component, modified)
const DashboardComponent = () => {
  const [currentPlatform, setCurrentPlatform] = useState('all');
  const [currentTimeframe, setCurrentTimeframe] = useState('12months');
  const [currentContentType, setCurrentContentType] = useState('all');

  // Data store (ProNeta removed and 'all' recalculated)
  const dataStore = {
    platforms: {
      all: { followers: 83146, likes: 4554, reach: 220035, engagement: 6.4, posts: 302, shares: 1762 },
      instagram: { followers: 14942, likes: 1061, reach: 34311, engagement: 3.6, posts: 68, shares: 287 },
      youtube: { followers: 31544, likes: 1758, reach: 102409, engagement: 8.9, posts: 42, shares: 892 },
      facebook: { followers: 18349, likes: 769, reach: 25856, engagement: 6.8, posts: 58, shares: 334 },
      twitter: { followers: 10488, likes: 578, reach: 22351, engagement: 4.5, posts: 89, shares: 243 },
      linkedin: { followers: 7823, likes: 388, reach: 15108, engagement: 8.1, posts: 45, shares: 156 },
    }
  };

  // Growth data (ProNeta removed)
  const growthData = {
    all: { follower: '+2.1%', likes: '+8.2%', reach: '+12.5%', engagement: '+3.8%', posts: '+5.2%', shares: '+15.7%' },
    instagram: { follower: '+1.8%', likes: '+6.5%', reach: '+9.2%', engagement: '+2.1%', posts: '+4.8%', shares: '+12.3%' },
    youtube: { follower: '+3.2%', likes: '+11.8%', reach: '+18.7%', engagement: '+5.9%', posts: '+7.1%', shares: '+22.4%' },
    facebook: { follower: '+1.5%', likes: '+5.8%', reach: '+8.1%', engagement: '+2.9%', posts: '+3.2%', shares: '+9.7%' },
    twitter: { follower: '+2.7%', likes: '+9.1%', reach: '+11.4%', engagement: '+4.2%', posts: '+6.8%', shares: '+14.2%' },
    linkedin: { follower: '+2.9%', likes: '+7.3%', reach: '+10.8%', engagement: '+5.1%', posts: '+4.5%', shares: '+11.8%' },
  };

  // Chart data generators (ProNeta removed)
  const getFollowersData = () => {
    return [
      { month: 'Jan', Instagram: 12500, YouTube: 28000, Facebook: 16800, Twitter: 9200, LinkedIn: 6500 },
      { month: 'Feb', Instagram: 12800, YouTube: 28500, Facebook: 17000, Twitter: 9400, LinkedIn: 6700 },
      { month: 'Mar', Instagram: 13200, YouTube: 29000, Facebook: 17200, Twitter: 9600, LinkedIn: 6900 },
      { month: 'Apr', Instagram: 13600, YouTube: 29500, Facebook: 17400, Twitter: 9800, LinkedIn: 7100 },
      { month: 'May', Instagram: 14000, YouTube: 30000, Facebook: 17600, Twitter: 10000, LinkedIn: 7300 },
      { month: 'Jun', Instagram: 14200, YouTube: 30200, Facebook: 17800, Twitter: 10100, LinkedIn: 7400 },
      { month: 'Jul', Instagram: 14400, YouTube: 30500, Facebook: 18000, Twitter: 10200, LinkedIn: 7500 },
      { month: 'Aug', Instagram: 14500, YouTube: 30800, Facebook: 18100, Twitter: 10300, LinkedIn: 7600 },
      { month: 'Sep', Instagram: 14600, YouTube: 31000, Facebook: 18200, Twitter: 10350, LinkedIn: 7650 },
      { month: 'Oct', Instagram: 14750, YouTube: 31200, Facebook: 18250, Twitter: 10400, LinkedIn: 7700 },
      { month: 'Nov', Instagram: 14850, YouTube: 31350, Facebook: 18300, Twitter: 10450, LinkedIn: 7750 },
      { month: 'Dec', Instagram: 14942, YouTube: 31544, Facebook: 18349, Twitter: 10488, LinkedIn: 7823 }
    ];
  };

  const getEngagementData = () => {
    return [
      { platform: 'Instagram', engagement: 3.6, color: '#E4405F' },
      { platform: 'Twitter', engagement: 4.5, color: '#1DA1F2' },
      { platform: 'Facebook', engagement: 6.8, color: '#1877F2' },
      { platform: 'LinkedIn', engagement: 8.1, color: '#0A66C2' },
      { platform: 'YouTube', engagement: 8.9, color: '#FF0000' },
    ];
  };

  const getDistributionData = () => {
    return [
      { name: 'YouTube', value: 31544, color: '#FF0000' },
      { name: 'Facebook', value: 18349, color: '#1877F2' },
      { name: 'Instagram', value: 14942, color: '#E4405F' },
      { name: 'Twitter', value: 10488, color: '#1DA1F2' },
      { name: 'LinkedIn', value: 7823, color: '#0A66C2' },
    ];
  };

  const getInteractionData = () => {
    return [
      { month: 'Jan', likes: 3200, comments: 850, shares: 420 },
      { month: 'Feb', likes: 3400, comments: 920, shares: 450 },
      { month: 'Mar', likes: 3600, comments: 980, shares: 480 },
      { month: 'Apr', likes: 3800, comments: 1050, shares: 510 },
      { month: 'May', likes: 4000, comments: 1120, shares: 540 },
      { month: 'Jun', likes: 4100, comments: 1180, shares: 560 },
      { month: 'Jul', likes: 4200, comments: 1250, shares: 580 },
      { month: 'Aug', likes: 4300, comments: 1320, shares: 600 },
      { month: 'Sep', likes: 4500, comments: 1400, shares: 620 },
      { month: 'Oct', likes: 4600, comments: 1480, shares: 640 },
      { month: 'Nov', likes: 4700, comments: 1550, shares: 660 },
      { month: 'Dec', likes: 4868, comments: 1632, shares: 685 }
    ];
  };

  const getContentTypeData = () => {
    return [
      { type: 'Video', performance: 85 },
      { type: 'Image', performance: 72 },
      { type: 'Text', performance: 65 },
      { type: 'Carousel', performance: 78 },
      { type: 'Stories', performance: 70 },
      { type: 'Live', performance: 82 }
    ];
  };

  const getROIData = () => {
    return [
      { platform: 'Instagram', roi: 7.2 },
      { platform: 'Twitter', roi: 5.8 },
      { platform: 'Facebook', roi: 8.1 },
      { platform: 'LinkedIn', roi: 9.3 },
      { platform: 'YouTube', roi: 9.7 },
    ];
  };

  // Platform mapping for chart data
  const platformDataMap = {
    instagram: 'Instagram',
    youtube: 'YouTube', 
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn'
  };

  // Get current platform data
  const currentData = dataStore.platforms[currentPlatform];
  const currentGrowth = growthData[currentPlatform];

  // KPI Cards data
  const kpiCards = [
    {
      title: 'Total Followers',
      value: currentData.followers.toLocaleString(),
      growth: currentGrowth.follower,
      icon: Users,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Total Likes',
      value: currentData.likes.toLocaleString(),
      growth: currentGrowth.likes,
      icon: Heart,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Total Reach',
      value: currentData.reach.toLocaleString(),
      growth: currentGrowth.reach,
      icon: Eye,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      title: 'Avg Engagement',
      value: currentData.engagement + '%',
      growth: currentGrowth.engagement,
      icon: MessageSquare,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Total Posts',
      value: currentData.posts.toLocaleString(),
      growth: currentGrowth.posts,
      icon: FileText,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Total Shares',
      value: currentData.shares.toLocaleString(),
      growth: currentGrowth.shares,
      icon: Share2,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  // Platform buttons data (ProNeta removed)
  const platformButtons = [
    { id: 'all', label: 'All Platforms', icon: Globe, color: '' },
    { id: 'instagram', label: 'Instagram', icon: Instagram, color: 'hover:bg-pink-500' },
    { id: 'twitter', label: 'Twitter', icon: Twitter, color: 'hover:bg-blue-400' },
    { id: 'facebook', label: 'Facebook', icon: Facebook, color: 'hover:bg-blue-600' },
    { id: 'linkedin', label: 'LinkedIn', icon: Linkedin, color: 'hover:bg-blue-700' },
    { id: 'youtube', label: 'YouTube', icon: Youtube, color: 'hover:bg-red-600' },
  ];

  const contentTypeButtons = [
    { id: 'all', label: 'All Content', icon: Layers },
    { id: 'video', label: 'Video', icon: Video },
    { id: 'image', label: 'Image', icon: Image },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'carousel', label: 'Carousel', icon: Layers },
    { id: 'live', label: 'Live', icon: Radio }
  ];

  // AI Suggestions data
  const suggestions = [
    {
      title: 'Optimal Posting Times',
      description: 'Your audience is most active on Instagram at 6-8 PM on weekdays. Consider scheduling your posts during these peak hours for maximum engagement.',
      priority: 'High Priority',
      icon: Clock,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'YouTube Growth Opportunity',
      description: 'Your YouTube engagement rate (8.9%) is highest among all platforms. Consider creating more long-form content to capitalize on this momentum.',
      priority: 'High Priority',
      icon: TrendingUp,
      gradient: 'from-pink-500 to-red-500'
    },
    {
      title: 'Content Strategy',
      description: 'Video content performs 3x better than static posts. Try incorporating more video content, especially tutorials and behind-the-scenes footage.',
      priority: 'Medium Priority',
      icon: Target,
      gradient: 'from-blue-400 to-cyan-400'
    }
  ];

  // Platform performance data (ProNeta removed)
  const platformPerformance = [
    {
      name: 'Instagram',
      followers: '14,942',
      reach: '34,311',
      engagement: '3.60%',
      likes: '1,061',
      color: '#E4405F',
      icon: Instagram
    },
    {
      name: 'Twitter',
      followers: '10,488',
      reach: '22,351',
      engagement: '4.50%',
      likes: '578',
      color: '#1DA1F2',
      icon: Twitter
    },
    {
      name: 'Facebook',
      followers: '18,349',
      reach: '25,856',
      engagement: '6.80%',
      likes: '769',
      color: '#1877F2',
      icon: Facebook
    },
    {
      name: 'LinkedIn',
      followers: '7,823',
      reach: '15,108',
      engagement: '8.10%',
      likes: '388',
      color: '#0A66C2',
      icon: Linkedin
    },
    {
      name: 'YouTube',
      followers: '31,544',
      reach: '102,409',
      engagement: '8.90%',
      likes: '1,758',
      color: '#FF0000',
      icon: Youtube
    },
  ];

  // Recent activities
  const recentActivities = [
    {
      platform: 'YouTube',
      action: 'New video uploaded',
      metric: '+15.2K views in 24hrs',
      time: '2 hours ago',
      color: '#FF0000',
      icon: Youtube
    },
    {
      platform: 'Instagram',
      action: 'Posted carousel',
      metric: '+2.8K likes, 150 comments',
      time: '5 hours ago',
      color: '#E4405F',
      icon: Instagram
    },
    {
      platform: 'Twitter',
      action: 'Tweet went viral',
      metric: '+8.5K retweets, 25K likes',
      time: '1 day ago',
      color: '#1DA1F2',
      icon: Twitter
    },
    {
      platform: 'LinkedIn',
      action: 'Article published',
      metric: '+1.2K reactions, 89 shares',
      time: '2 days ago',
      color: '#0A66C2',
      icon: Linkedin
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center shadow-md">
                <img 
                  src="https://assam.gov.in/sites/default/files/inline-images/SpeakerofAssam.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Biswajit Daimary</h1>
                <p className="text-lg text-slate-600">Member of the Assam Legislative Assembly</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <Select value={currentTimeframe} onValueChange={setCurrentTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="12months">Last 12 Months</SelectItem>
                </SelectContent>
              </Select>
              
              <input 
                type="date" 
                className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input 
                type="date" 
                className="px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${kpi.color}`}>
                  <kpi.icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1 text-green-600 font-semibold">
                  <TrendingUp className="w-4 h-4" />
                  {kpi.growth}
                </div>
              </div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                {kpi.title}
              </h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {kpi.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter Controls */}
      <Card className="border-slate-200 shadow-sm">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-600 font-medium min-w-20">Platform:</span>
              {platformButtons.map((platform) => (
                <Button
                  key={platform.id}
                  variant={currentPlatform === platform.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentPlatform(platform.id)}
                  className={`flex items-center gap-2 ${platform.color}`}
                >
                  <platform.icon className="w-4 h-4" />
                  {platform.label}
                </Button>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-slate-600 font-medium min-w-20">Content:</span>
              {contentTypeButtons.map((content) => (
                <Button
                  key={content.id}
                  variant={currentContentType === content.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentContentType(content.id)}
                  className="flex items-center gap-2"
                >
                  <content.icon className="w-4 h-4" />
                  {content.label}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Suggestions */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <Target className="w-6 h-6 text-indigo-500" />
            AI-Powered Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${suggestion.gradient} rounded-xl p-6 text-white relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full transform translate-x-8 -translate-y-8"></div>
                
                <h4 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <suggestion.icon className="w-5 h-5" />
                  {suggestion.title}
                </h4>
                <p className="text-white/90 leading-relaxed mb-4">
                  {suggestion.description}
                </p>
                <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                  {suggestion.priority}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Followers Growth - FIXED AREA CHART */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Followers Growth Over Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={getFollowersData()} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorInstagram" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E4405F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#E4405F" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorYouTube" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF0000" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FF0000" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorFacebook" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1877F2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1877F2" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorTwitter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1DA1F2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#1DA1F2" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorLinkedIn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0A66C2" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0A66C2" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorSingle" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  stroke="#64748b"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [value.toLocaleString(), '']}
                />
                <Legend />
                
                {/* Always show Instagram */}
                {(currentPlatform === 'all' || currentPlatform === 'instagram') && (
                  <Area 
                    type="monotone" 
                    dataKey="Instagram" 
                    stroke="#E4405F" 
                    strokeWidth={currentPlatform === 'instagram' ? 3 : 2}
                    fill="url(#colorInstagram)"
                    fillOpacity={currentPlatform === 'instagram' ? 0.7 : 0.4}
                    dot={{ fill: '#E4405F', strokeWidth: 2, r: currentPlatform === 'instagram' ? 5 : 3 }}
                  />
                )}
                
                {/* Always show YouTube */}
                {(currentPlatform === 'all' || currentPlatform === 'youtube') && (
                  <Area 
                    type="monotone" 
                    dataKey="YouTube" 
                    stroke="#FF0000" 
                    strokeWidth={currentPlatform === 'youtube' ? 3 : 2}
                    fill="url(#colorYouTube)"
                    fillOpacity={currentPlatform === 'youtube' ? 0.7 : 0.4}
                    dot={{ fill: '#FF0000', strokeWidth: 2, r: currentPlatform === 'youtube' ? 5 : 3 }}
                  />
                )}
                
                {/* Always show Facebook */}
                {(currentPlatform === 'all' || currentPlatform === 'facebook') && (
                  <Area 
                    type="monotone" 
                    dataKey="Facebook" 
                    stroke="#1877F2" 
                    strokeWidth={currentPlatform === 'facebook' ? 3 : 2}
                    fill="url(#colorFacebook)"
                    fillOpacity={currentPlatform === 'facebook' ? 0.7 : 0.4}
                    dot={{ fill: '#1877F2', strokeWidth: 2, r: currentPlatform === 'facebook' ? 5 : 3 }}
                  />
                )}
                
                {/* Always show Twitter */}
                {(currentPlatform === 'all' || currentPlatform === 'twitter') && (
                  <Area 
                    type="monotone" 
                    dataKey="Twitter" 
                    stroke="#1DA1F2" 
                    strokeWidth={currentPlatform === 'twitter' ? 3 : 2}
                    fill="url(#colorTwitter)"
                    fillOpacity={currentPlatform === 'twitter' ? 0.7 : 0.4}
                    dot={{ fill: '#1DA1F2', strokeWidth: 2, r: currentPlatform === 'twitter' ? 5 : 3 }}
                  />
                )}
                
                {/* Always show LinkedIn */}
                {(currentPlatform === 'all' || currentPlatform === 'linkedin') && (
                  <Area 
                    type="monotone" 
                    dataKey="LinkedIn" 
                    stroke="#0A66C2" 
                    strokeWidth={currentPlatform === 'linkedin' ? 3 : 2}
                    fill="url(#colorLinkedIn)"
                    fillOpacity={currentPlatform === 'linkedin' ? 0.7 : 0.4}
                    dot={{ fill: '#0A66C2', strokeWidth: 2, r: currentPlatform === 'linkedin' ? 5 : 3 }}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Platform Distribution */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Users className="w-5 h-5 text-purple-500" />
              Platform Distribution (Followers)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={getDistributionData()}
                  cx="50%"
                  cy="50%"
                  outerRadius={120}
                  dataKey="value"
                  label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getDistributionData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => value.toLocaleString()} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Engagement Rate */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-green-500" />
              Engagement Rate by Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getEngagementData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="platform" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="engagement" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Interaction */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-yellow-500" />
              Content Interaction Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={getInteractionData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="likes" stackId="1" stroke="#16a34a" fill="#16a34a" fillOpacity={0.6} />
                <Area type="monotone" dataKey="comments" stackId="1" stroke="#6366f1" fill="#6366f1" fillOpacity={0.6} />
                <Area type="monotone" dataKey="shares" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.6} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Content Type Performance */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-500" />
              Content Type Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={getContentTypeData()}>
                <PolarGrid />
                <PolarAngleAxis dataKey="type" />
                <PolarRadiusAxis angle={0} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="performance"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ROI by Platform */}
        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              ROI by Platform
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={getROIData()}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="platform" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Bar dataKey="roi" fill="#22c55e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Platform Performance Summary */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>Platform Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformPerformance.map((platform, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg border-l-4 border border-slate-200 hover:shadow-lg transition-shadow"
                style={{ borderLeftColor: platform.color }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <platform.icon className="w-8 h-8" style={{ color: platform.color }} />
                  <h4 className="text-xl font-bold text-slate-800">{platform.name}</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Followers:</span>
                    <span className="font-semibold text-slate-700">{platform.followers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Reach/Views:</span>
                    <span className="font-semibold text-slate-700">{platform.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Engagement:</span>
                    <span className="font-semibold text-slate-700">{platform.engagement}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Likes:</span>
                    <span className="font-semibold text-green-600">{platform.likes}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-indigo-500" />
            Recent Activity Highlights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: activity.color }}
                >
                  <activity.icon className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-semibold text-slate-800">{activity.action} on {activity.platform}</h4>
                  <p className="text-green-600 font-medium">{activity.metric}</p>
                </div>
                <div className="text-sm text-slate-500">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Reports Component
const ReportsComponent = () => {
  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-purple-500" />
            Advanced Reports
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-20">
            <BarChart3 className="w-16 h-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-700 mb-2">Detailed Performance Reports</h3>
            <p className="text-slate-500">Generate comprehensive reports with custom date ranges and metrics.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Welcome Page Component
const WelcomePage = ({ onClose }) => {
  return (
    <div className="fixed right-0 top-0 h-full w-[100%] bg-white border-l border-slate-200 shadow-2xl z-50 overflow-y-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">Constituency Reports</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Welcome Content */}
        <div className="space-y-6">
          {/* Profile Section */}
          <div className="text-center">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 shadow-lg">
              <img 
                src="https://assam.gov.in/sites/default/files/inline-images/SpeakerofAssam.jpg"
                alt="Biswajit Daimary"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-xl font-semibold text-slate-800">Welcome, Biswajit Daimary</h3>
            <p className="text-slate-600">Member of the Assam Legislative Assembly</p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-4">
            <h4 className="font-semibold text-slate-800 mb-3">Today's Overview</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Active Campaigns:</span>
                <span className="font-semibold text-blue-600">12</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Pending Messages:</span>
                <span className="font-semibold text-orange-600">8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">New Ideas:</span>
                <span className="font-semibold text-green-600">23</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Quick Actions</h4>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <FileText className="w-6 h-6 mb-2 text-blue-500" />
                <span className="text-sm">New Report</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <MessageCircle className="w-6 h-6 mb-2 text-green-500" />
                <span className="text-sm">Messages</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Users className="w-6 h-6 mb-2 text-purple-500" />
                <span className="text-sm">Manage Users</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center p-4 h-auto">
                <Settings className="w-6 h-6 mb-2 text-gray-500" />
                <span className="text-sm">Settings</span>
              </Button>
            </div>
          </div>

          {/* Recent Updates */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Recent Updates</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">New constituency feedback received</p>
                  <p className="text-xs text-slate-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Social media engagement up 15%</p>
                  <p className="text-xs text-slate-500">5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                <div>
                  <p className="text-sm font-medium text-slate-800">Monthly report generated</p>
                  <p className="text-xs text-slate-500">1 day ago</p>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Upcoming Events</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Samvad Sabha Meeting</p>
                  <p className="text-xs text-slate-500">Tomorrow, 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border border-slate-200 rounded-lg">
                <Users className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-slate-800">Youth Connect Session</p>
                  <p className="text-xs text-slate-500">July 5, 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// Main App Component with Sidebar
const HomeDash = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showWelcomePage, setShowWelcomePage] = useState(false);

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, component: DashboardComponent },
    { id: 'Usermanagment', label: 'Users', icon: Users2, component: ReportsComponent },
    { id: 'Messagesmanagment', label: 'Messages', icon: MessageCircle, component: ReportsComponent },
    { id: 'ideasmanagment', label: 'Ideas', icon: Cloud, component: ReportsComponent },
    { id: 'cms', label: 'CMS', icon: Computer, component: ReportsComponent },
    { id: 'govtproject', label: 'Govt Projects', icon: UserCheck, component: ReportsComponent },
    { id: 'engage', label: 'Campaigns', icon: Speaker, component: ReportsComponent },
    { id: 'samvad', label: 'Samvad Sabha', icon: BookOpen, component: ReportsComponent },
    { id: 'Yuva', label: 'Yuva Connect', icon: HardHat, component: ReportsComponent },
    { id: 'senior', label: 'Senior Citizen Sathi', icon: Handshake, component: ReportsComponent },
    { id: 'rozgar', label: 'Rozgar Junction', icon: Key, component: ReportsComponent },
    { id: 'leader', label: 'Rozgar ki Library', icon: Book, component: ReportsComponent },
  ];

  const currentComponent = navigationItems.find(item => item.id === currentPage)?.component || DashboardComponent;
  const CurrentComponent = currentComponent;

  return (
    <div className="flex h-screen bg-slate-50 relative">
      {/* Sidebar */}
      <div className={`bg-white border-r border-slate-200 transition-all duration-300 flex flex-col ${sidebarOpen ? 'w-64' : 'w-16'} z-50`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              
              <img src='https://abhastra.com/wp-content/uploads/2019/10/abhastra-colorful-logo-1-1536x399.png'/>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-500 hover:text-slate-700"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Profile Section */}
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
              <img 
                src="https://assam.gov.in/sites/default/files/inline-images/SpeakerofAssam.jpg"
                alt="Speaker of Assam"
                className="w-full h-full object-cover"
              />
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">Biswajit Daimary</p>
                <p className="text-xs text-slate-500 truncate">Member of the Assam Legislative Assembly
</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-scroll">
          <ul className="space-y-2">
            {navigationItems?.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    currentPage === item.id
                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                      : 'text-slate-600 hover:text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="font-medium">{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden z-30">
        {/* Top Bar - UPDATED */}
        <div className="bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(true)}
                  className="text-slate-500 hover:text-slate-700"
                >
                  <Menu className="w-5 h-5" />
                </Button>
              )}
              {/* Constituency Reports Button */}
              <Button
                onClick={() => setShowWelcomePage(true)}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                <FileText className="w-4 h-4" />
                Constituency Reports
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-2">
          <CurrentComponent />
        </div>
      </div>

      {/* Welcome Page Overlay */}
      {showWelcomePage && (
        <>
          {/* Background Overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={() => setShowWelcomePage(false)}></div>
          {/* Welcome Page */}
          <WelcomePage onClose={() => setShowWelcomePage(false)} />
        </>
      )}
    </div>
  );
};

export default HomeDash;