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
import { MapPin, Users, FileText, Lightbulb, Building, TrendingUp } from 'lucide-react';
import * as d3 from 'd3';

// BTC Districts Bubble Map Component
const BTCDistrictsMap = ({ selectedDistrict, districtData }) => {
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
    g.append("text")
      .attr("x", (width - margin.left - margin.right) / 2)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#1e40af")
      .text("Bodoland Territorial Council - Districts Overview");

  }, [selectedDistrict, districtData]);

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

  // BTC Districts list
  const btcDistricts = [
    { value: 'Kokrajhar', label: 'Kokrajhar' },
    { value: 'Baksa', label: 'Baksa' },
    { value: 'Udalguri', label: 'Udalguri' },
    { value: 'Chirang', label: 'Chirang' },
    { value: 'Tamulpur', label: 'Tamulpur' }
  ];

  // District-specific data
  const districtSpecificData = {
    Kokrajhar: {
      users: 8.92, // 8.92 lakh users
      constituencies: 12,
      citizenData: [
        { name: 'Students', value: 32, color: '#0088FE' },
        { name: 'Farmers', value: 28, color: '#FF8042' },
        { name: 'Government Employees', value: 15, color: '#00C49F' },
        { name: 'Private Employees', value: 12, color: '#FFBB28' },
        { name: 'Business Owners', value: 8, color: '#8884D8' },
        { name: 'Others', value: 5, color: '#82CA9D' }
      ],
      monthlyComplaints: [
        { month: 'Jul 2024', complaints: 28, resolved: 24, pending: 4 },
        { month: 'Aug 2024', complaints: 35, resolved: 30, pending: 5 },
        { month: 'Sep 2024', complaints: 22, resolved: 20, pending: 2 },
        { month: 'Oct 2024', complaints: 41, resolved: 36, pending: 5 },
        { month: 'Nov 2024', complaints: 26, resolved: 24, pending: 2 },
        { month: 'Dec 2024', complaints: 18, resolved: 17, pending: 1 },
        { month: 'Jan 2025', complaints: 44, resolved: 38, pending: 6 },
        { month: 'Feb 2025', complaints: 33, resolved: 29, pending: 4 },
        { month: 'Mar 2025', complaints: 29, resolved: 26, pending: 3 },
        { month: 'Apr 2025', complaints: 23, resolved: 21, pending: 2 },
        { month: 'May 2025', complaints: 37, resolved: 33, pending: 4 },
        { month: 'Jun 2025', complaints: 25, resolved: 22, pending: 3 },
        { month: 'Jul 2025', complaints: 19, resolved: 17, pending: 2 }
      ],
      complaintCategories: [
        { category: 'Infrastructure', count: 89, high: 25, medium: 42, low: 22 },
        { category: 'Water Supply', count: 67, high: 18, medium: 28, low: 21 },
        { category: 'Electricity', count: 78, high: 15, medium: 38, low: 25 },
        { category: 'Healthcare', count: 45, high: 12, medium: 20, low: 13 },
        { category: 'Education', count: 52, high: 8, medium: 24, low: 20 },
        { category: 'Transportation', count: 72, high: 22, medium: 32, low: 18 }
      ],
      budgetData: [
        { category: 'Water Projects', allocated: 45, spent: 28, remaining: 17 },
        { category: 'Road Projects', allocated: 67, spent: 52, remaining: 15 },
        { category: 'Education', allocated: 38, spent: 24, remaining: 14 },
        { category: 'Healthcare', allocated: 32, spent: 22, remaining: 10 }
      ]
    },
    Baksa: {
      users: 6.34, // 6.34 lakh users
      constituencies: 11,
      citizenData: [
        { name: 'Farmers', value: 35, color: '#FF8042' },
        { name: 'Students', value: 25, color: '#0088FE' },
        { name: 'Government Employees', value: 18, color: '#00C49F' },
        { name: 'Private Employees', value: 10, color: '#FFBB28' },
        { name: 'Business Owners', value: 7, color: '#8884D8' },
        { name: 'Others', value: 5, color: '#82CA9D' }
      ],
      monthlyComplaints: [
        { month: 'Jul 2024', complaints: 22, resolved: 19, pending: 3 },
        { month: 'Aug 2024', complaints: 28, resolved: 24, pending: 4 },
        { month: 'Sep 2024', complaints: 18, resolved: 17, pending: 1 },
        { month: 'Oct 2024', complaints: 32, resolved: 28, pending: 4 },
        { month: 'Nov 2024', complaints: 21, resolved: 19, pending: 2 },
        { month: 'Dec 2024', complaints: 15, resolved: 14, pending: 1 },
        { month: 'Jan 2025', complaints: 36, resolved: 31, pending: 5 },
        { month: 'Feb 2025', complaints: 24, resolved: 21, pending: 3 },
        { month: 'Mar 2025', complaints: 19, resolved: 17, pending: 2 },
        { month: 'Apr 2025', complaints: 16, resolved: 15, pending: 1 },
        { month: 'May 2025', complaints: 29, resolved: 26, pending: 3 },
        { month: 'Jun 2025', complaints: 20, resolved: 18, pending: 2 },
        { month: 'Jul 2025', complaints: 14, resolved: 13, pending: 1 }
      ],
      complaintCategories: [
        { category: 'Agriculture Support', count: 72, high: 20, medium: 35, low: 17 },
        { category: 'Water Supply', count: 58, high: 15, medium: 25, low: 18 },
        { category: 'Road Connectivity', count: 65, high: 18, medium: 28, low: 19 },
        { category: 'Healthcare', count: 34, high: 8, medium: 16, low: 10 },
        { category: 'Education', count: 41, high: 6, medium: 19, low: 16 },
        { category: 'Electricity', count: 49, high: 10, medium: 23, low: 16 }
      ],
      budgetData: [
        { category: 'Agriculture Development', allocated: 52, spent: 34, remaining: 18 },
        { category: 'Rural Roads', allocated: 43, spent: 31, remaining: 12 },
        { category: 'Water Supply', allocated: 28, spent: 18, remaining: 10 },
        { category: 'Healthcare', allocated: 22, spent: 15, remaining: 7 }
      ]
    },
    Udalguri: {
      users: 5.67, // 5.67 lakh users
      constituencies: 10,
      citizenData: [
        { name: 'Farmers', value: 38, color: '#FF8042' },
        { name: 'Students', value: 22, color: '#0088FE' },
        { name: 'Tea Garden Workers', value: 20, color: '#00C49F' },
        { name: 'Government Employees', value: 12, color: '#FFBB28' },
        { name: 'Business Owners', value: 5, color: '#8884D8' },
        { name: 'Others', value: 3, color: '#82CA9D' }
      ],
      monthlyComplaints: [
        { month: 'Jul 2024', complaints: 19, resolved: 16, pending: 3 },
        { month: 'Aug 2024', complaints: 24, resolved: 21, pending: 3 },
        { month: 'Sep 2024', complaints: 15, resolved: 14, pending: 1 },
        { month: 'Oct 2024', complaints: 28, resolved: 24, pending: 4 },
        { month: 'Nov 2024', complaints: 17, resolved: 16, pending: 1 },
        { month: 'Dec 2024', complaints: 12, resolved: 11, pending: 1 },
        { month: 'Jan 2025', complaints: 31, resolved: 27, pending: 4 },
        { month: 'Feb 2025', complaints: 20, resolved: 18, pending: 2 },
        { month: 'Mar 2025', complaints: 16, resolved: 15, pending: 1 },
        { month: 'Apr 2025', complaints: 13, resolved: 12, pending: 1 },
        { month: 'May 2025', complaints: 25, resolved: 22, pending: 3 },
        { month: 'Jun 2025', complaints: 18, resolved: 16, pending: 2 },
        { month: 'Jul 2025', complaints: 11, resolved: 10, pending: 1 }
      ],
      complaintCategories: [
        { category: 'Tea Garden Issues', count: 68, high: 18, medium: 32, low: 18 },
        { category: 'Forest Conservation', count: 45, high: 12, medium: 20, low: 13 },
        { category: 'Road Connectivity', count: 52, high: 14, medium: 24, low: 14 },
        { category: 'Water Supply', count: 38, high: 9, medium: 18, low: 11 },
        { category: 'Healthcare', count: 29, high: 6, medium: 14, low: 9 },
        { category: 'Education', count: 33, high: 5, medium: 16, low: 12 }
      ],
      budgetData: [
        { category: 'Tea Industry Support', allocated: 38, spent: 24, remaining: 14 },
        { category: 'Forest Development', allocated: 29, spent: 19, remaining: 10 },
        { category: 'Rural Infrastructure', allocated: 34, spent: 25, remaining: 9 },
        { category: 'Healthcare', allocated: 18, spent: 12, remaining: 6 }
      ]
    },
    Chirang: {
      users: 4.23, // 4.23 lakh users
      constituencies: 7,
      citizenData: [
        { name: 'Farmers', value: 42, color: '#FF8042' },
        { name: 'Students', value: 24, color: '#0088FE' },
        { name: 'Government Employees', value: 15, color: '#00C49F' },
        { name: 'Private Employees', value: 8, color: '#FFBB28' },
        { name: 'Forest Workers', value: 6, color: '#8884D8' },
        { name: 'Others', value: 5, color: '#82CA9D' }
      ],
      monthlyComplaints: [
        { month: 'Jul 2024', complaints: 15, resolved: 13, pending: 2 },
        { month: 'Aug 2024', complaints: 19, resolved: 16, pending: 3 },
        { month: 'Sep 2024', complaints: 12, resolved: 11, pending: 1 },
        { month: 'Oct 2024', complaints: 22, resolved: 19, pending: 3 },
        { month: 'Nov 2024', complaints: 14, resolved: 13, pending: 1 },
        { month: 'Dec 2024', complaints: 9, resolved: 8, pending: 1 },
        { month: 'Jan 2025', complaints: 25, resolved: 21, pending: 4 },
        { month: 'Feb 2025', complaints: 16, resolved: 14, pending: 2 },
        { month: 'Mar 2025', complaints: 13, resolved: 12, pending: 1 },
        { month: 'Apr 2025', complaints: 10, resolved: 9, pending: 1 },
        { month: 'May 2025', complaints: 20, resolved: 18, pending: 2 },
        { month: 'Jun 2025', complaints: 14, resolved: 12, pending: 2 },
        { month: 'Jul 2025', complaints: 8, resolved: 7, pending: 1 }
      ],
      complaintCategories: [
        { category: 'Forest Rights', count: 48, high: 12, medium: 22, low: 14 },
        { category: 'Agriculture Support', count: 42, high: 10, medium: 20, low: 12 },
        { category: 'Water Supply', count: 35, high: 8, medium: 16, low: 11 },
        { category: 'Road Connectivity', count: 38, high: 9, medium: 18, low: 11 },
        { category: 'Healthcare', count: 24, high: 5, medium: 12, low: 7 },
        { category: 'Education', count: 28, high: 4, medium: 14, low: 10 }
      ],
      budgetData: [
        { category: 'Forest Conservation', allocated: 25, spent: 16, remaining: 9 },
        { category: 'Agriculture Development', allocated: 32, spent: 22, remaining: 10 },
        { category: 'Rural Infrastructure', allocated: 28, spent: 19, remaining: 9 },
        { category: 'Community Development', allocated: 15, spent: 10, remaining: 5 }
      ]
    },
    Tamulpur: {
      users: 2.98, // 2.98 lakh users
      constituencies: 0, // New district
      citizenData: [
        { name: 'Farmers', value: 45, color: '#FF8042' },
        { name: 'Students', value: 20, color: '#0088FE' },
        { name: 'Government Employees', value: 12, color: '#00C49F' },
        { name: 'Private Employees', value: 10, color: '#FFBB28' },
        { name: 'Business Owners', value: 8, color: '#8884D8' },
        { name: 'Others', value: 5, color: '#82CA9D' }
      ],
      monthlyComplaints: [
        { month: 'Jul 2024', complaints: 8, resolved: 7, pending: 1 },
        { month: 'Aug 2024', complaints: 12, resolved: 10, pending: 2 },
        { month: 'Sep 2024', complaints: 6, resolved: 6, pending: 0 },
        { month: 'Oct 2024', complaints: 15, resolved: 13, pending: 2 },
        { month: 'Nov 2024', complaints: 9, resolved: 8, pending: 1 },
        { month: 'Dec 2024', complaints: 5, resolved: 5, pending: 0 },
        { month: 'Jan 2025', complaints: 18, resolved: 15, pending: 3 },
        { month: 'Feb 2025', complaints: 11, resolved: 9, pending: 2 },
        { month: 'Mar 2025', complaints: 8, resolved: 7, pending: 1 },
        { month: 'Apr 2025', complaints: 6, resolved: 6, pending: 0 },
        { month: 'May 2025', complaints: 14, resolved: 12, pending: 2 },
        { month: 'Jun 2025', complaints: 10, resolved: 9, pending: 1 },
        { month: 'Jul 2025', complaints: 4, resolved: 4, pending: 0 }
      ],
      complaintCategories: [
        { category: 'Basic Infrastructure', count: 32, high: 8, medium: 15, low: 9 },
        { category: 'Water Supply', count: 28, high: 6, medium: 13, low: 9 },
        { category: 'Healthcare Access', count: 22, high: 5, medium: 10, low: 7 },
        { category: 'Education Infrastructure', count: 25, high: 4, medium: 12, low: 9 },
        { category: 'Road Connectivity', count: 30, high: 7, medium: 14, low: 9 },
        { category: 'Administrative Services', count: 18, high: 3, medium: 8, low: 7 }
      ],
      budgetData: [
        { category: 'Basic Infrastructure', allocated: 35, spent: 15, remaining: 20 },
        { category: 'Administrative Setup', allocated: 20, spent: 8, remaining: 12 },
        { category: 'Healthcare Development', allocated: 18, spent: 7, remaining: 11 },
        { category: 'Education Infrastructure', allocated: 22, spent: 9, remaining: 13 }
      ]
    }
  };
  // Get current district data
  const currentDistrictData = districtSpecificData[selectedDistrict];

  // Ideas implementation data (generic for now, can be made district-specific)
  const ideaCategories = [
    { category: 'Digital Services', total: 23, implemented: 8, inProgress: 9, pending: 6 },
    { category: 'Agriculture Tech', total: 34, implemented: 12, inProgress: 15, pending: 7 },
    { category: 'Education Reform', total: 18, implemented: 6, inProgress: 7, pending: 5 },
    { category: 'Healthcare Access', total: 25, implemented: 9, inProgress: 10, pending: 6 },
    { category: 'Tourism Development', total: 15, implemented: 4, inProgress: 6, pending: 5 },
    { category: 'Environmental Conservation', total: 28, implemented: 10, inProgress: 12, pending: 6 }
  ];

  // Satisfaction data (district-specific)
  const satisfactionData = [
    { service: 'Water Supply', satisfaction: selectedDistrict === 'Kokrajhar' ? 75 : selectedDistrict === 'Baksa' ? 68 : selectedDistrict === 'Udalguri' ? 72 : selectedDistrict === 'Chirang' ? 70 : 60, complaints: 8 },
    { service: 'Electricity', satisfaction: selectedDistrict === 'Kokrajhar' ? 82 : selectedDistrict === 'Baksa' ? 78 : selectedDistrict === 'Udalguri' ? 80 : selectedDistrict === 'Chirang' ? 76 : 65, complaints: 5 },
    { service: 'Road Quality', satisfaction: selectedDistrict === 'Kokrajhar' ? 70 : selectedDistrict === 'Baksa' ? 65 : selectedDistrict === 'Udalguri' ? 68 : selectedDistrict === 'Chirang' ? 62 : 58, complaints: 12 },
    { service: 'Healthcare', satisfaction: selectedDistrict === 'Kokrajhar' ? 78 : selectedDistrict === 'Baksa' ? 74 : selectedDistrict === 'Udalguri' ? 76 : selectedDistrict === 'Chirang' ? 72 : 68, complaints: 7 },
    { service: 'Education', satisfaction: selectedDistrict === 'Kokrajhar' ? 85 : selectedDistrict === 'Baksa' ? 80 : selectedDistrict === 'Udalguri' ? 82 : selectedDistrict === 'Chirang' ? 78 : 75, complaints: 4 },
    { service: 'Administrative Services', satisfaction: selectedDistrict === 'Kokrajhar' ? 88 : selectedDistrict === 'Baksa' ? 85 : selectedDistrict === 'Udalguri' ? 87 : selectedDistrict === 'Chirang' ? 83 : 70, complaints: 3 }
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
        {/* Header with District Selector */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                BTC Districts Dashboard
              </h1>
              <p className="text-gray-600">
                Comprehensive analytics for {selectedDistrict} District (July 2024 - July 2025)
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                <label className="text-sm font-medium text-gray-700">Select District:</label>
              </div>
              <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Choose a district" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {btcDistricts.map((district) => (
                    <SelectItem key={district.value} value={district.value}>
                      {district.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* District Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">Active Users</p>
                    <p className="text-2xl font-bold">{currentDistrictData.users.toLocaleString()} Lacs</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm">Constituencies</p>
                    <p className="text-2xl font-bold">{currentDistrictData.constituencies}</p>
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
                      {currentDistrictData.monthlyComplaints.reduce((sum, month) => sum + month.complaints, 0)}
                    </p>
                  </div>
                  <FileText className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100 text-sm">Budget Allocated</p>
                    <p className="text-2xl font-bold">
                      ₹{currentDistrictData.budgetData.reduce((sum, item) => sum + item.allocated, 0)}Cr
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            <TabsTrigger value="geography">Geography</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Citizen Demographics */}
              <Card>
                <CardHeader>
                  <CardTitle>Citizen Demographics - {selectedDistrict}</CardTitle>
                  <CardDescription>Distribution by profession</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={currentDistrictData.citizenData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {currentDistrictData.citizenData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {currentDistrictData.citizenData.map((item, index) => (
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
                  <CardDescription>Citizen ideas by implementation stage</CardDescription>
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

            {/* Budget Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation & Utilization - {selectedDistrict} (₹ Crores)</CardTitle>
                <CardDescription>Financial overview across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={currentDistrictData.budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allocated" fill="#8884d8" name="Allocated" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                    <Bar dataKey="remaining" fill="#ff7300" name="Remaining" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Complaints Trend */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Complaints & Resolution - {selectedDistrict}</CardTitle>
                  <CardDescription>Complaints received and resolved over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={currentDistrictData.monthlyComplaints}>
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

              {/* Complaint Priority Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Complaints by Priority Level - {selectedDistrict}</CardTitle>
                  <CardDescription>Category-wise priority distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={currentDistrictData.complaintCategories}>
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
                      <Bar dataKey="high" stackId="a" fill="#FF8042" name="High Priority" />
                      <Bar dataKey="medium" stackId="a" fill="#FFBB28" name="Medium Priority" />
                      <Bar dataKey="low" stackId="a" fill="#00C49F" name="Low Priority" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Total Complaints by Category */}
            <Card>
              <CardHeader>
                <CardTitle>Total Complaints by Category - {selectedDistrict}</CardTitle>
                <CardDescription>Overall complaint distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={currentDistrictData.complaintCategories}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {/* Budget Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Project Budget Breakdown - {selectedDistrict}</CardTitle>
                <CardDescription>Department-wise budget allocation and utilization</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ComposedChart data={currentDistrictData.budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allocated" fill="#8884d8" name="Allocated (₹Cr)" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent (₹Cr)" />
                    <Line type="monotone" dataKey="remaining" stroke="#ff7300" name="Remaining (₹Cr)" />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Budget Utilization Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Utilization - {selectedDistrict}</CardTitle>
                  <CardDescription>Overall spending vs remaining budget</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          { 
                            name: 'Spent', 
                            value: currentDistrictData.budgetData.reduce((sum, item) => sum + item.spent, 0),
                            color: '#82ca9d'
                          },
                          { 
                            name: 'Remaining', 
                            value: currentDistrictData.budgetData.reduce((sum, item) => sum + item.remaining, 0),
                            color: '#ff7300'
                          }
                        ]}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        <Cell fill="#82ca9d" />
                        <Cell fill="#ff7300" />
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value} Crores`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Department-wise Budget Distribution</CardTitle>
                  <CardDescription>Allocation across different sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={currentDistrictData.budgetData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="allocated"
                        label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {currentDistrictData.budgetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value} Crores`, 'Allocated']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Citizen Satisfaction by Service - {selectedDistrict}</CardTitle>
                <CardDescription>Satisfaction ratings vs complaint rates</CardDescription>
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

            {/* Satisfaction Radial Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Service Satisfaction Levels - {selectedDistrict}</CardTitle>
                <CardDescription>Radial view of satisfaction percentages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={satisfactionData}>
                    <RadialBar dataKey="satisfaction" cornerRadius={10} fill="#8884d8" />
                    <Tooltip />
                    <Legend />
                  </RadialBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="geography" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>BTC Districts Overview</CardTitle>
                <CardDescription>Interactive map showing all districts with {selectedDistrict} highlighted</CardDescription>
              </CardHeader>
              <CardContent>
                <BTCDistrictsMap selectedDistrict={selectedDistrict} districtData={currentDistrictData} />
              </CardContent>
            </Card>

            {/* All Districts Summary */}
            <Card>
              <CardHeader>
                <CardTitle>All BTC Districts Summary</CardTitle>
                <CardDescription>Overview of all districts in Bodoland Territorial Council</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {btcDistricts.map((district) => {
                    const districtData = districtSpecificData[district.value];
                    const isSelected = district.value === selectedDistrict;
                    return (
                      <Card 
                        key={district.value} 
                        className={`cursor-pointer transition-all duration-200 ${
                          isSelected 
                            ? "ring-2 ring-blue-500 bg-blue-50 border-blue-200" 
                            : "hover:shadow-lg"
                        }`}
                        onClick={() => setSelectedDistrict(district.value)}
                      >
                        <CardHeader>
                          <CardTitle className={`text-lg ${isSelected ? "text-blue-700" : ""}`}>
                            {district.label}
                            {isSelected && <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Selected</span>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Active Users:</span>
                              <span className="font-semibold">{districtData.users.toLocaleString()} lacs</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Constituencies:</span>
                              <span className="font-semibold">{districtData.constituencies}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Total Budget:</span>
                              <span className="font-semibold">
                                ₹{districtData.budgetData.reduce((sum, item) => sum + item.allocated, 0)}Cr
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-600">Complaints:</span>
                              <span className="font-semibold">
                                {districtData.monthlyComplaints.reduce((sum, month) => sum + month.complaints, 0)}
                              </span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;