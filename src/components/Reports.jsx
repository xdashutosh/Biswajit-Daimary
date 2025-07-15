import React, { useState, useEffect, useRef } from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Users, FileText, Lightbulb, Building, TrendingUp, Vote } from 'lucide-react';
import * as d3 from 'd3';

// BTC Districts Bubble Map Component
const BTCDistrictsMap = ({ selectedDistrict, selectedConstituency, districtData }) => {
  const svgRef = useRef();

  // BTC Districts coordinates and data
  const btcDistrictsData = [
    { name: 'Kokrajhar', users: districtData?.users || 892, lat: 26.4031, lng: 90.2717, x: 200, y: 150, constituencies: 12 },
    { name: 'Baksa', users: districtData?.users || 634, lat: 26.8000, lng: 91.1000, x: 350, y: 120, constituencies: 11 },
    { name: 'Udalguri', users: districtData?.users || 567, lat: 26.7500, lng: 92.1000, x: 450, y: 110, constituencies: 10 },
    { name: 'Chirang', users: districtData?.users || 423, lat: 26.6500, lng: 90.6500, x: 280, y: 140, constituencies: 7 },
    { name: 'Tamulpur', users: districtData?.users || 298, lat: 26.6800, lng: 91.8000, x: 400, y: 130, constituencies: 0 }
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create BTC region outline (simplified polygon)
    const btcOutline = [
      [150, 100], [200, 90], [300, 85], [400, 80], [500, 85], [550, 95],
      [580, 110], [590, 130], [580, 150], [550, 170], [500, 180],
      [400, 185], [300, 180], [200, 175], [150, 160], [140, 130], [150, 100]
    ];

    // Draw BTC boundary
    g.append("path")
      .datum(btcOutline)
      .attr("d", d3.line())
      .attr("fill", "#e6f3ff")
      .attr("stroke", "#2563eb")
      .attr("stroke-width", 2)
      .attr("opacity", 0.3);

    const maxUsers = d3.max(btcDistrictsData, d => d.users);
    const minUsers = d3.min(btcDistrictsData, d => d.users);
    
    const sizeScale = d3.scaleSqrt()
      .domain([minUsers, maxUsers])
      .range([15, 50]);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([minUsers, maxUsers]);

    // Create bubbles for each district
    const bubbles = g.selectAll(".district-bubble")
      .data(btcDistrictsData)
      .enter()
      .append("g")
      .attr("class", "district-bubble")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    bubbles.append("circle")
      .attr("r", 0)
      .attr("fill", d => d.name === selectedDistrict ? "#ef4444" : colorScale(d.users))
      .attr("stroke", d => d.name === selectedDistrict ? "#dc2626" : "#fff")
      .attr("stroke-width", d => d.name === selectedDistrict ? 4 : 2)
      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("r", d => sizeScale(d.users));

    // Add district labels
    bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", "12px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .text(d => d.name)
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 500)
      .style("opacity", 1);

    // Add title
    const titleText = selectedConstituency && selectedConstituency !== 'all'
      ? `BTC - ${selectedDistrict} District - ${selectedConstituency} Constituency`
      : `Bodoland Territorial Council - Districts Overview`;
    
    g.append("text")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#1e40af")
      .text(titleText);

  }, [selectedDistrict, selectedConstituency, districtData]);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        width="100%"
        height="300"
        viewBox="0 0 600 300"
        className="border border-gray-200 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50"
      />
    </div>
  );
};

const Reports = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('Kokrajhar');
  const [selectedConstituency, setSelectedConstituency] = useState('all');

  // BTC Districts and their constituencies
  const btcDistricts = {
    'Kokrajhar': {
      label: 'Kokrajhar',
      constituencies: [
        { value: 'Srirampur', label: 'Srirampur (Non-ST)', type: 'Non-ST' },
        { value: 'Guma', label: 'Guma (Open)', type: 'Open' },
        { value: 'Saraibil', label: 'Saraibil (ST)', type: 'ST' },
        { value: 'Kachugaon', label: 'Kachugaon (ST)', type: 'ST' },
        { value: 'Jamduar', label: 'Jamduar (ST)', type: 'ST' },
        { value: 'Fakiragram', label: 'Fakiragram (Non-ST)', type: 'Non-ST' },
        { value: 'Banargaon', label: 'Banargaon (ST)', type: 'ST' },
        { value: 'Dotma', label: 'Dotma (ST)', type: 'ST' },
        { value: 'Debargaon', label: 'Debargaon (ST)', type: 'ST' },
        { value: 'Salakati', label: 'Salakati (ST)', type: 'ST' },
        { value: 'Baokhungri', label: 'Baokhungri (ST)', type: 'ST' },
        { value: 'Parbatjhora', label: 'Parbatjhora (ST)', type: 'ST' }
      ]
    },
    'Baksa': {
      label: 'Baksa',
      constituencies: [
        { value: 'Mathanguri', label: 'Mathanguri', type: 'General' },
        { value: 'Salbari', label: 'Salbari', type: 'General' },
        { value: 'Koklabari', label: 'Koklabari', type: 'General' },
        { value: 'Dihira', label: 'Dihira', type: 'General' },
        { value: 'Mushalpur', label: 'Mushalpur', type: 'General' },
        { value: 'Baganpara', label: 'Baganpara', type: 'General' },
        { value: 'Darangajuli', label: 'Darangajuli', type: 'ST' },
        { value: 'Nagrijuli', label: 'Nagrijuli', type: 'General' },
        { value: 'Goibari', label: 'Goibari', type: 'General' },
        { value: 'Suklai_Serfang', label: 'Suklai Serfang', type: 'General' },
        { value: 'Goreswar', label: 'Goreswar', type: 'General' }
      ]
    },
    'Udalguri': {
      label: 'Udalguri',
      constituencies: [
        { value: 'Khoirabari', label: 'Khoirabari', type: 'ST' },
        { value: 'Bhergaon', label: 'Bhergaon', type: 'ST' },
        { value: 'Nonwi_Serfang', label: 'Nonwi Serfang', type: 'ST' },
        { value: 'Khaling_Duar', label: 'Khaling Duar', type: 'ST' },
        { value: 'Mudoibari', label: 'Mudoibari', type: 'ST' },
        { value: 'Harisinga', label: 'Harisinga', type: 'ST' },
        { value: 'Dhansiri', label: 'Dhansiri', type: 'General' },
        { value: 'Bhairabkunda', label: 'Bhairabkunda', type: 'ST' },
        { value: 'Pasnwi_Serfang', label: 'Pasnwi Serfang', type: 'ST' },
        { value: 'Rowta', label: 'Rowta', type: 'ST' }
      ]
    },
    'Chirang': {
      label: 'Chirang',
      constituencies: [
        { value: 'Chirang', label: 'Chirang', type: 'ST' },
        { value: 'Chirang_Duars', label: 'Chirang Duars', type: 'ST' },
        { value: 'Kajalgaon', label: 'Kajalgaon', type: 'ST' },
        { value: 'Nichima', label: 'Nichima', type: 'ST' },
        { value: 'Subhaijhar', label: 'Subhaijhar', type: 'ST' },
        { value: 'Thuribari', label: 'Thuribari', type: 'Open' },
        { value: 'Manas_Serfang', label: 'Manas Serfang', type: 'ST' }
      ]
    },
    'Tamulpur': {
      label: 'Tamulpur',
      constituencies: [
        { value: 'Tamulpur_Central', label: 'Tamulpur Central', type: 'General' },
        { value: 'Tamulpur_East', label: 'Tamulpur East', type: 'General' }
      ]
    }
  };

  // Reset constituency when district changes
  useEffect(() => {
    setSelectedConstituency('all');
  }, [selectedDistrict]);

  // Generate constituency-specific data
  const generateConstituencyData = (district, constituency) => {
    if (!constituency || constituency === 'all') return null;

    // Base multipliers for different constituencies (simulating different population sizes)
    const constituencyMultipliers = {
      // Kokrajhar multipliers
      'Srirampur': 1.2, 'Guma': 1.1, 'Saraibil': 0.9, 'Kachugaon': 1.0,
      'Jamduar': 0.8, 'Fakiragram': 1.3, 'Banargaon': 0.7, 'Dotma': 0.9,
      'Debargaon': 1.1, 'Salakati': 0.8, 'Baokhungri': 0.6, 'Parbatjhora': 0.7,
      // Baksa multipliers
      'Mathanguri': 1.1, 'Salbari': 1.0, 'Koklabari': 1.2, 'Dihira': 0.8,
      'Mushalpur': 1.3, 'Baganpara': 0.9, 'Darangajuli': 0.7, 'Nagrijuli': 0.8,
      'Goibari': 0.9, 'Suklai_Serfang': 0.6, 'Goreswar': 0.7,
      // Udalguri multipliers
      'Khoirabari': 0.9, 'Bhergaon': 1.1, 'Nonwi_Serfang': 0.7, 'Khaling_Duar': 0.8,
      'Mudoibari': 1.0, 'Harisinga': 0.9, 'Dhansiri': 1.2, 'Bhairabkunda': 0.6,
      'Pasnwi_Serfang': 0.7, 'Rowta': 1.0,
      // Chirang multipliers
      'Chirang': 1.2, 'Chirang_Duars': 0.9, 'Kajalgaon': 1.0, 'Nichima': 0.8,
      'Subhaijhar': 0.7, 'Thuribari': 1.1, 'Manas_Serfang': 0.6,
      // Tamulpur multipliers
      'Tamulpur_Central': 1.1, 'Tamulpur_East': 0.9
    };

    const multiplier = constituencyMultipliers[constituency] || 1.0;
    const baseUsers = Math.round((80000 + Math.random() * 40000) * multiplier);

    return {
      users: baseUsers,
      voterTurnout: Math.round(65 + Math.random() * 20),
      citizenData: [
        { name: 'Farmers', value: Math.round(30 + Math.random() * 15), color: '#FF8042' },
        { name: 'Students', value: Math.round(20 + Math.random() * 10), color: '#0088FE' },
        { name: 'Government Employees', value: Math.round(10 + Math.random() * 8), color: '#00C49F' },
        { name: 'Private Employees', value: Math.round(8 + Math.random() * 7), color: '#FFBB28' },
        { name: 'Business Owners', value: Math.round(5 + Math.random() * 5), color: '#8884D8' },
        { name: 'Others', value: Math.round(5 + Math.random() * 5), color: '#82CA9D' }
      ],
      monthlyComplaints: Array.from({length: 13}, (_, i) => ({
        month: ['Jul 2024', 'Aug 2024', 'Sep 2024', 'Oct 2024', 'Nov 2024', 'Dec 2024', 
                'Jan 2025', 'Feb 2025', 'Mar 2025', 'Apr 2025', 'May 2025', 'Jun 2025', 'Jul 2025'][i],
        complaints: Math.round((8 + Math.random() * 12) * multiplier),
        resolved: Math.round((6 + Math.random() * 10) * multiplier),
        pending: Math.round((1 + Math.random() * 3) * multiplier)
      })),
      complaintCategories: [
        { category: 'Water Supply', count: Math.round((15 + Math.random() * 10) * multiplier), high: Math.round(5 * multiplier), medium: Math.round(8 * multiplier), low: Math.round(7 * multiplier) },
        { category: 'Road Infrastructure', count: Math.round((12 + Math.random() * 8) * multiplier), high: Math.round(4 * multiplier), medium: Math.round(6 * multiplier), low: Math.round(5 * multiplier) },
        { category: 'Electricity', count: Math.round((10 + Math.random() * 6) * multiplier), high: Math.round(3 * multiplier), medium: Math.round(5 * multiplier), low: Math.round(4 * multiplier) },
        { category: 'Healthcare', count: Math.round((8 + Math.random() * 5) * multiplier), high: Math.round(2 * multiplier), medium: Math.round(4 * multiplier), low: Math.round(3 * multiplier) },
        { category: 'Education', count: Math.round((6 + Math.random() * 4) * multiplier), high: Math.round(2 * multiplier), medium: Math.round(3 * multiplier), low: Math.round(2 * multiplier) },
        { category: 'Administrative Services', count: Math.round((5 + Math.random() * 3) * multiplier), high: Math.round(1 * multiplier), medium: Math.round(2 * multiplier), low: Math.round(2 * multiplier) }
      ],
      budgetData: [
        { category: 'Infrastructure Development', allocated: Math.round((15 + Math.random() * 5) * multiplier), spent: Math.round((8 + Math.random() * 4) * multiplier), remaining: Math.round((5 + Math.random() * 3) * multiplier) },
        { category: 'Social Welfare', allocated: Math.round((10 + Math.random() * 3) * multiplier), spent: Math.round((6 + Math.random() * 2) * multiplier), remaining: Math.round((3 + Math.random() * 2) * multiplier) },
        { category: 'Healthcare Services', allocated: Math.round((8 + Math.random() * 2) * multiplier), spent: Math.round((5 + Math.random() * 2) * multiplier), remaining: Math.round((2 + Math.random() * 1) * multiplier) },
        { category: 'Education Programs', allocated: Math.round((6 + Math.random() * 2) * multiplier), spent: Math.round((4 + Math.random() * 1) * multiplier), remaining: Math.round((2 + Math.random() * 1) * multiplier) }
      ]
    };
  };

  // Get current data (constituency if selected, otherwise district)
  const getCurrentData = () => {
    if (selectedConstituency && selectedConstituency !== 'all') {
      return generateConstituencyData(selectedDistrict, selectedConstituency);
    }
    
    // Return district-level data as before (you can keep your existing district data here)
    const districtData = {
      'Kokrajhar': { users: 892000, constituencies: 12 },
      'Baksa': { users: 634000, constituencies: 11 },
      'Udalguri': { users: 567000, constituencies: 10 },
      'Chirang': { users: 423000, constituencies: 7 },
      'Tamulpur': { users: 298000, constituencies: 2 }
    };
    
    return {
      users: districtData[selectedDistrict]?.users || 500000,
      constituencies: districtData[selectedDistrict]?.constituencies || 0,
      // Add placeholder district-level data structure here
      citizenData: [
        { name: 'Farmers', value: 35, color: '#FF8042' },
        { name: 'Students', value: 25, color: '#0088FE' },
        { name: 'Government Employees', value: 15, color: '#00C49F' },
        { name: 'Private Employees', value: 12, color: '#FFBB28' },
        { name: 'Business Owners', value: 8, color: '#8884D8' },
        { name: 'Others', value: 5, color: '#82CA9D' }
      ],
      monthlyComplaints: [],
      complaintCategories: [],
      budgetData: []
    };
  };

  const currentData = getCurrentData();

  // Ideas implementation data
  const ideaCategories = [
    { category: 'Digital Services', total: 23, implemented: 8, inProgress: 9, pending: 6 },
    { category: 'Agriculture Tech', total: 34, implemented: 12, inProgress: 15, pending: 7 },
    { category: 'Education Reform', total: 18, implemented: 6, inProgress: 7, pending: 5 },
    { category: 'Healthcare Access', total: 25, implemented: 9, inProgress: 10, pending: 6 },
    { category: 'Tourism Development', total: 15, implemented: 4, inProgress: 6, pending: 5 },
    { category: 'Environmental Conservation', total: 28, implemented: 10, inProgress: 12, pending: 6 }
  ];

  // Satisfaction data
  const satisfactionData = [
    { service: 'Water Supply', satisfaction: 75, complaints: 8 },
    { service: 'Electricity', satisfaction: 82, complaints: 5 },
    { service: 'Road Quality', satisfaction: 70, complaints: 12 },
    { service: 'Healthcare', satisfaction: 78, complaints: 7 },
    { service: 'Education', satisfaction: 85, complaints: 4 },
    { service: 'Administrative Services', satisfaction: 88, complaints: 3 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="12"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header with District and Constituency Selectors */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                BTC Constituency Dashboard
              </h1>
              <p className="text-gray-600">
                {selectedConstituency && selectedConstituency !== 'all'
                  ? `Analytics for ${selectedConstituency} Constituency, ${selectedDistrict} District`
                  : `District-level analytics for ${selectedDistrict} District`
                }
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
              {/* District Selector */}
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">District:</label>
                <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Choose a district" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {Object.keys(btcDistricts).map((districtKey) => (
                      <SelectItem key={districtKey} value={districtKey}>
                        {btcDistricts[districtKey].label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Constituency Selector */}
              <div className="flex items-center gap-2">
                <Vote className="h-5 w-5 text-green-600" />
                <label className="text-sm font-medium text-gray-700">Constituency:</label>
                <Select value={selectedConstituency} onValueChange={setSelectedConstituency}>
                  <SelectTrigger className="w-64">
                    <SelectValue placeholder="Choose a constituency" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">All Constituencies</SelectItem>
                    {btcDistricts[selectedDistrict]?.constituencies.map((constituency) => (
                      <SelectItem key={constituency.value} value={constituency.value}>
                        {constituency.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">
                      {selectedConstituency && selectedConstituency !== 'all' ? 'Constituency Users' : 'District Users'}
                    </p>
                    <p className="text-2xl font-bold">
                      {selectedConstituency && selectedConstituency !== 'all'
                        ? `${(currentData.users / 1000).toFixed(1)}K` 
                        : `${(currentData.users / 100000).toFixed(1)} Lacs`
                      }
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            {selectedConstituency && selectedConstituency !== 'all' && (
              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm">Voter Turnout</p>
                      <p className="text-2xl font-bold">{currentData.voterTurnout}%</p>
                    </div>
                    <Vote className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">
                      {selectedConstituency && selectedConstituency !== 'all' ? 'Constituency Type' : 'Total Constituencies'}
                    </p>
                    <p className="text-2xl font-bold">
                      {selectedConstituency && selectedConstituency !== 'all'
                        ? btcDistricts[selectedDistrict]?.constituencies.find(c => c.value === selectedConstituency)?.type || 'General'
                        : currentData.constituencies
                      }
                    </p>
                  </div>
                  <Building className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100 text-sm">Total Complaints</p>
                    <p className="text-2xl font-bold">
                      {selectedConstituency && selectedConstituency !== 'all'
                        ? currentData.monthlyComplaints?.reduce((sum, month) => sum + month.complaints, 0) || 0
                        : 'N/A'
                      }
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {selectedConstituency && selectedConstituency !== 'all' ? (
          /* Constituency-level data display */
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="complaints">Complaints</TabsTrigger>
              <TabsTrigger value="projects">Projects</TabsTrigger>
              <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Citizen Demographics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Citizen Demographics - {selectedConstituency}</CardTitle>
                    <CardDescription>Distribution by profession</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={currentData.citizenData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {currentData.citizenData?.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {currentData.citizenData?.map((item, index) => (
                        <div key={index} className="flex items-center">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Ideas Implementation Status */}
                <Card>
                  <CardHeader>
                    <CardTitle>Ideas Implementation Status</CardTitle>
                    <CardDescription>Local citizen ideas by implementation stage</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={ideaCategories}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={10}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="implemented" stackId="a" fill="#00C49F" name="Implemented" />
                        <Bar dataKey="inProgress" stackId="a" fill="#FFBB28" name="In Progress" />
                        <Bar dataKey="pending" stackId="a" fill="#FF8042" name="Pending" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="complaints" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Monthly Complaints Trend */}
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Complaints & Resolution - {selectedConstituency}</CardTitle>
                    <CardDescription>Complaints received and resolved over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={currentData.monthlyComplaints}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="month" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={10}
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="complaints" stackId="1" stroke="#8884d8" fill="#8884d8" name="Total Complaints" />
                        <Area type="monotone" dataKey="resolved" stackId="2" stroke="#82ca9d" fill="#82ca9d" name="Resolved" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Complaint Categories */}
                <Card>
                  <CardHeader>
                    <CardTitle>Complaints by Category - {selectedConstituency}</CardTitle>
                    <CardDescription>Category-wise complaint distribution</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={currentData.complaintCategories}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="category" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={10}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0088FE" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Allocation & Utilization - {selectedConstituency}</CardTitle>
                  <CardDescription>Financial overview across local projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={currentData.budgetData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="allocated" fill="#8884d8" name="Allocated (₹Lacs)" />
                      <Bar dataKey="spent" fill="#82ca9d" name="Spent (₹Lacs)" />
                      <Bar dataKey="remaining" fill="#ff7300" name="Remaining (₹Lacs)" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="satisfaction" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Citizen Satisfaction by Service - {selectedConstituency}</CardTitle>
                  <CardDescription>Satisfaction ratings for local services</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <ComposedChart data={satisfactionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" angle={-45} textAnchor="end" height={80} />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="satisfaction" fill="#00C49F" name="Satisfaction %" />
                      <Line yAxisId="right" type="monotone" dataKey="complaints" stroke="#ff7300" name="Complaint Rate" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          /* District-level overview when no constituency is selected */
          <Card>
            <CardHeader>
              <CardTitle>Select a Constituency</CardTitle>
              <CardDescription>Choose a constituency from {selectedDistrict} district to view detailed analytics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {btcDistricts[selectedDistrict]?.constituencies.map((constituency) => (
                  <Card 
                    key={constituency.value} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 border-gray-200 hover:border-blue-300"
                    onClick={() => setSelectedConstituency(constituency.value)}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center justify-between">
                        {constituency.label}
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          constituency.type === 'ST' ? 'bg-green-100 text-green-800' :
                          constituency.type === 'Non-ST' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {constituency.type}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600">Click to view detailed constituency analytics</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Geography Tab - always visible */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>BTC Geographic Overview</CardTitle>
            <CardDescription>
              {selectedConstituency && selectedConstituency !== 'all'
                ? `Location of ${selectedConstituency} constituency within ${selectedDistrict} district`
                : `Overview of ${selectedDistrict} district within BTC`
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BTCDistrictsMap 
              selectedDistrict={selectedDistrict} 
              selectedConstituency={selectedConstituency}
              districtData={currentData} 
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;