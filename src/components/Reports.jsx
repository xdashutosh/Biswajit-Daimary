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
import * as d3 from 'd3';

// Assam Bubble Map Component
const AssamBubbleMap = () => {
  const svgRef = useRef();
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  // Enhanced district data with more realistic coordinates and user counts
  const districtData = [
    { name: 'Guwahati', users: 1245, lat: 26.1445, lng: 91.7362, x: 420, y: 180 },
    { name: 'Dibrugarh', users: 687, lat: 27.4728, lng: 94.9120, x: 580, y: 120 },
    { name: 'Silchar', users: 534, lat: 24.8333, lng: 92.7789, x: 480, y: 280 },
    { name: 'Jorhat', users: 423, lat: 26.7509, lng: 94.2037, x: 540, y: 150 },
    { name: 'Tezpur', users: 398, lat: 26.6347, lng: 92.8302, x: 460, y: 160 },
    { name: 'Nagaon', users: 356, lat: 26.3467, lng: 92.6814, x: 450, y: 190 },
    { name: 'Bongaigaon', users: 287, lat: 26.4831, lng: 90.5633, x: 320, y: 170 },
    { name: 'Tinsukia', users: 245, lat: 27.4917, lng: 95.3600, x: 600, y: 110 },
    { name: 'Dhubri', users: 198, lat: 26.0167, lng: 89.9833, x: 280, y: 200 },
    { name: 'Karimganj', users: 156, lat: 24.8697, lng: 92.3547, x: 460, y: 290 },
    { name: 'Goalpara', users: 134, lat: 26.1667, lng: 90.6167, x: 340, y: 190 },
    { name: 'Diphu', users: 112, lat: 25.8500, lng: 93.4306, x: 520, y: 240 },
    { name: 'Haflong', users: 89, lat: 25.1667, lng: 93.0167, x: 500, y: 270 },
    { name: 'Mangaldoi', users: 78, lat: 26.4500, lng: 92.0333, x: 400, y: 170 },
    { name: 'North Lakhimpur', users: 67, lat: 27.2333, lng: 94.1000, x: 530, y: 130 }
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // Clear previous render

    const width = 800;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    // Create main group
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create Assam state outline (simplified polygon)
    const stateOutline = [
      [250, 150], [300, 120], [350, 110], [400, 100], [450, 95], [500, 90],
      [550, 95], [600, 100], [650, 110], [680, 130], [700, 150], [710, 170],
      [700, 190], [680, 210], [650, 230], [600, 250], [550, 270], [500, 280],
      [450, 290], [400, 295], [350, 290], [300, 280], [270, 270], [250, 250],
      [240, 220], [245, 190], [250, 150]
    ];

    // Draw state boundary
    g.append("path")
      .datum(stateOutline)
      .attr("d", d3.line())
      .attr("fill", "#e8f5e8")
      .attr("stroke", "#2d5a2d")
      .attr("stroke-width", 2)
      .attr("opacity", 0.7);

    // Create scales for bubble size and color
    const maxUsers = d3.max(districtData, d => d.users);
    const minUsers = d3.min(districtData, d => d.users);
    
    const sizeScale = d3.scaleSqrt()
      .domain([minUsers, maxUsers])
      .range([8, 40]);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
      .domain([minUsers, maxUsers]);

    // Create tooltip div
    const tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("visibility", "hidden")
      .style("background-color", "rgba(0, 0, 0, 0.8)")
      .style("color", "white")
      .style("padding", "10px")
      .style("border-radius", "5px")
      .style("font-size", "12px")
      .style("z-index", "1000");

    // Create bubbles for each district
    const bubbles = g.selectAll(".district-bubble")
      .data(districtData)
      .enter()
      .append("g")
      .attr("class", "district-bubble")
      .attr("transform", d => `translate(${d.x}, ${d.y})`);

    // Add bubble circles
    bubbles.append("circle")
      .attr("r", 0)
      .attr("fill", d => colorScale(d.users))
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .attr("opacity", 0.8)
      .style("cursor", "pointer")
      .on("mouseover", function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 1)
          .attr("stroke-width", 3);
        
        tooltip
          .style("visibility", "visible")
          .html(`
            <strong>${d.name}</strong><br/>
            Users: ${d.users.toLocaleString()}<br/>
            Coordinates: ${d.lat.toFixed(2)}°N, ${d.lng.toFixed(2)}°E
          `);
        
        setSelectedDistrict(d);
      })
      .on("mousemove", function(event) {
        tooltip
          .style("top", (event.pageY - 10) + "px")
          .style("left", (event.pageX + 10) + "px");
      })
      .on("mouseout", function() {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.8)
          .attr("stroke-width", 2);
        
        tooltip.style("visibility", "hidden");
        setSelectedDistrict(null);
      })
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100)
      .attr("r", d => sizeScale(d.users));

    // Add district labels
    bubbles.append("text")
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("font-size", d => sizeScale(d.users) > 20 ? "10px" : "8px")
      .attr("font-weight", "bold")
      .attr("fill", "white")
      .style("pointer-events", "none")
      .text(d => d.users > 200 ? d.name.split(' ')[0] : '')
      .style("opacity", 0)
      .transition()
      .duration(1000)
      .delay((d, i) => i * 100 + 500)
      .style("opacity", 1);

    // Add title
    g.append("text")
      .attr("x", width / 2 - margin.left - margin.right)
      .attr("y", -5)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .attr("font-weight", "bold")
      .attr("fill", "#2d5a2d")
      .text("Assam State - User Distribution");

    // Cleanup tooltip on component unmount
    return () => {
      d3.select("body").selectAll(".tooltip").remove();
    };
  }, []);

  return (
    <div className="w-full">
      <svg
        ref={svgRef}
        width="100%"
        height="400"
        viewBox="0 0 800 400"
        className="border border-gray-200 rounded-lg bg-gradient-to-br from-green-50 to-blue-50"
      />
      
      {/* Legend */}
      <div className="mt-4 flex justify-center">
        <div className="bg-white p-4 rounded-lg shadow-sm border">
          <h4 className="font-semibold mb-2 text-center">User Distribution Legend</h4>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 rounded-full bg-blue-300"></div>
              <span className="text-sm">50-200 users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-500"></div>
              <span className="text-sm">200-500 users</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-700"></div>
              <span className="text-sm">500+ users</span>
            </div>
          </div>
        </div>
      </div>

      {/* District Statistics Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {districtData.slice(0, 6).map((district, index) => (
          <Card key={index} className={selectedDistrict?.name === district.name ? "ring-2 ring-blue-500" : ""}>
            <CardHeader>
              <CardTitle className="text-lg">{district.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{district.users.toLocaleString()}</div>
              <p className="text-gray-600">Active Users</p>
              <div className="mt-2 text-sm text-gray-500">
                Coordinates: {district.lat.toFixed(2)}°N, {district.lng.toFixed(2)}°E
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const Reports = () => {
  // Mock data for citizen demographics
  const citizenData = [
    { name: 'Students', value: 28, color: '#0088FE' },
    { name: 'Government Employees', value: 15, color: '#00C49F' },
    { name: 'Private Employees', value: 22, color: '#FFBB28' },
    { name: 'Farmers', value: 18, color: '#FF8042' },
    { name: 'Business Owners', value: 8, color: '#8884D8' },
    { name: 'Healthcare Workers', value: 5, color: '#82CA9D' },
    { name: 'Others', value: 4, color: '#FFC658' }
  ];

  // Mock data for monthly complaints (July 2024 - July 2025)
  const monthlyComplaints = [
    { month: 'Jul 2024', complaints: 45, resolved: 38, pending: 7 },
    { month: 'Aug 2024', complaints: 52, resolved: 45, pending: 7 },
    { month: 'Sep 2024', complaints: 38, resolved: 35, pending: 3 },
    { month: 'Oct 2024', complaints: 61, resolved: 54, pending: 7 },
    { month: 'Nov 2024', complaints: 43, resolved: 40, pending: 3 },
    { month: 'Dec 2024', complaints: 29, resolved: 28, pending: 1 },
    { month: 'Jan 2025', complaints: 67, resolved: 58, pending: 9 },
    { month: 'Feb 2025', complaints: 54, resolved: 49, pending: 5 },
    { month: 'Mar 2025', complaints: 48, resolved: 44, pending: 4 },
    { month: 'Apr 2025', complaints: 39, resolved: 36, pending: 3 },
    { month: 'May 2025', complaints: 56, resolved: 51, pending: 5 },
    { month: 'Jun 2025', complaints: 42, resolved: 38, pending: 4 },
    { month: 'Jul 2025', complaints: 33, resolved: 30, pending: 3 }
  ];

  // Mock data for complaint categories with priority levels
  const complaintCategories = [
    { category: 'Infrastructure', count: 156, high: 45, medium: 78, low: 33 },
    { category: 'Water Supply', count: 98, high: 32, medium: 41, low: 25 },
    { category: 'Electricity', count: 134, high: 28, medium: 67, low: 39 },
    { category: 'Healthcare', count: 87, high: 23, medium: 38, low: 26 },
    { category: 'Education', count: 76, high: 15, medium: 35, low: 26 },
    { category: 'Transportation', count: 112, high: 38, medium: 52, low: 22 },
    { category: 'Sanitation', count: 91, high: 25, medium: 44, low: 22 }
  ];

  // Mock data for idea categories with implementation status
  const ideaCategories = [
    { category: 'Smart City', total: 45, implemented: 12, inProgress: 18, pending: 15 },
    { category: 'Environment', total: 67, implemented: 23, inProgress: 25, pending: 19 },
    { category: 'Digital Services', total: 34, implemented: 15, inProgress: 12, pending: 7 },
    { category: 'Tourism', total: 28, implemented: 8, inProgress: 11, pending: 9 },
    { category: 'Agriculture', total: 52, implemented: 18, inProgress: 20, pending: 14 },
    { category: 'Education Reform', total: 41, implemented: 14, inProgress: 16, pending: 11 }
  ];

  // Mock data for different project types with detailed breakdown
  const jalProjects = [
    { district: 'Guwahati', ongoing: 8, completed: 12, budget: 45.2 },
    { district: 'Dibrugarh', ongoing: 5, completed: 7, budget: 28.7 },
    { district: 'Silchar', ongoing: 4, completed: 6, budget: 22.1 },
    { district: 'Jorhat', ongoing: 3, completed: 5, budget: 18.3 },
    { district: 'Tezpur', ongoing: 3, completed: 4, budget: 15.9 }
  ];

  const roadProjects = [
    { district: 'Guwahati', ongoing: 6, completed: 15, budget: 67.8 },
    { district: 'Dibrugarh', ongoing: 4, completed: 8, budget: 34.2 },
    { district: 'Silchar', ongoing: 3, completed: 6, budget: 28.5 },
    { district: 'Jorhat', ongoing: 2, completed: 3, budget: 19.7 },
    { district: 'Tezpur', ongoing: 2, completed: 4, budget: 23.1 }
  ];

  // Project timeline data
  const projectTimeline = [
    { month: 'Jul 2024', jalStarted: 3, roadStarted: 2, educationStarted: 1, jalCompleted: 2, roadCompleted: 4, educationCompleted: 1 },
    { month: 'Aug 2024', jalStarted: 2, roadStarted: 1, educationStarted: 2, jalCompleted: 1, roadCompleted: 3, educationCompleted: 0 },
    { month: 'Sep 2024', jalStarted: 4, roadStarted: 3, educationStarted: 1, jalCompleted: 3, roadCompleted: 2, educationCompleted: 2 },
    { month: 'Oct 2024', jalStarted: 1, roadStarted: 2, educationStarted: 0, jalCompleted: 2, roadCompleted: 5, educationCompleted: 1 },
    { month: 'Nov 2024', jalStarted: 3, roadStarted: 1, educationStarted: 2, jalCompleted: 1, roadCompleted: 3, educationCompleted: 1 },
    { month: 'Dec 2024', jalStarted: 2, roadStarted: 2, educationStarted: 1, jalCompleted: 4, roadCompleted: 4, educationCompleted: 2 },
    { month: 'Jan 2025', jalStarted: 5, roadStarted: 3, educationStarted: 3, jalCompleted: 2, roadCompleted: 6, educationCompleted: 1 },
    { month: 'Feb 2025', jalStarted: 2, roadStarted: 1, educationStarted: 1, jalCompleted: 3, roadCompleted: 2, educationCompleted: 0 },
    { month: 'Mar 2025', jalStarted: 3, roadStarted: 2, educationStarted: 2, jalCompleted: 1, roadCompleted: 4, educationCompleted: 2 },
    { month: 'Apr 2025', jalStarted: 1, roadStarted: 1, educationStarted: 1, jalCompleted: 2, roadCompleted: 3, educationCompleted: 1 },
    { month: 'May 2025', jalStarted: 4, roadStarted: 2, educationStarted: 2, jalCompleted: 3, roadCompleted: 1, educationCompleted: 1 },
    { month: 'Jun 2025', jalStarted: 2, roadStarted: 1, educationStarted: 1, jalCompleted: 1, roadCompleted: 2, educationCompleted: 0 },
    { month: 'Jul 2025', jalStarted: 1, roadStarted: 2, educationStarted: 0, jalCompleted: 2, roadCompleted: 1, educationCompleted: 1 }
  ];

  // Budget allocation data
  const budgetData = [
    { category: 'Jal Projects', allocated: 150, spent: 89, remaining: 61 },
    { category: 'Road Projects', allocated: 200, spent: 156, remaining: 44 },
    { category: 'Education', allocated: 120, spent: 78, remaining: 42 },
    { category: 'Healthcare', allocated: 100, spent: 67, remaining: 33 },
    { category: 'Digital Infrastructure', allocated: 80, spent: 45, remaining: 35 }
  ];

  // Citizen satisfaction by service
  const satisfactionData = [
    { service: 'Water Supply', satisfaction: 78, complaints: 12 },
    { service: 'Electricity', satisfaction: 85, complaints: 8 },
    { service: 'Road Quality', satisfaction: 72, complaints: 18 },
    { service: 'Healthcare', satisfaction: 80, complaints: 10 },
    { service: 'Education', satisfaction: 88, complaints: 6 },
    { service: 'Digital Services', satisfaction: 92, complaints: 4 }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Government Reports Dashboard</h1>
          <p className="text-gray-600">Comprehensive analytics from July 2024 - July 2025</p>
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
                  <CardTitle>Citizen Demographics</CardTitle>
                  <CardDescription>Distribution by profession</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={citizenData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {citizenData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {citizenData.map((item, index) => (
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
                <CardTitle>Budget Allocation & Utilization (₹ Crores)</CardTitle>
                <CardDescription>Financial overview across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <ComposedChart data={budgetData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="allocated" fill="#8884d8" name="Allocated" />
                    <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
                    <Line type="monotone" dataKey="remaining" stroke="#ff7300" name="Remaining" />
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
                  <CardTitle>Monthly Complaints & Resolution</CardTitle>
                  <CardDescription>Complaints received and resolved over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyComplaints}>
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
                  <CardTitle>Complaints by Priority Level</CardTitle>
                  <CardDescription>Category-wise priority distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={complaintCategories}>
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
                <CardTitle>Total Complaints by Category</CardTitle>
                <CardDescription>Overall complaint distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={complaintCategories} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="category" 
                      type="category" 
                      width={100}
                      fontSize={12}
                    />
                    <Tooltip />
                    <Bar dataKey="count" fill="#0088FE" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            {/* Project Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline - Started vs Completed</CardTitle>
                <CardDescription>Monthly project initiation and completion trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={projectTimeline}>
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
                    <Line type="monotone" dataKey="jalStarted" stroke="#8884d8" name="Jal Started" />
                    <Line type="monotone" dataKey="jalCompleted" stroke="#82ca9d" name="Jal Completed" />
                    <Line type="monotone" dataKey="roadStarted" stroke="#ff7300" name="Road Started" />
                    <Line type="monotone" dataKey="roadCompleted" stroke="#00C49F" name="Road Completed" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Jal Projects by District */}
              <Card>
                <CardHeader>
                  <CardTitle>Jal Projects by District</CardTitle>
                  <CardDescription>Water supply projects distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={jalProjects}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" fontSize={12} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ongoing" fill="#8884d8" name="Ongoing" />
                      <Bar dataKey="completed" fill="#82ca9d" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Road Projects by District */}
              <Card>
                <CardHeader>
                  <CardTitle>Road Projects by District</CardTitle>
                  <CardDescription>Infrastructure development projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={roadProjects}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" fontSize={12} />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="ongoing" fill="#ff7300" name="Ongoing" />
                      <Bar dataKey="completed" fill="#00C49F" name="Completed" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Project Budget Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Jal Projects Budget (₹ Crores)</CardTitle>
                  <CardDescription>Budget allocation by district</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={jalProjects}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="budget"
                        label={({ name, value }) => `${name}: ₹${value}Cr`}
                      >
                        {jalProjects.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value} Crores`, 'Budget']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Road Projects Budget (₹ Crores)</CardTitle>
                  <CardDescription>Budget allocation by district</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={roadProjects}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#82ca9d"
                        dataKey="budget"
                        label={({ name, value }) => `${name}: ₹${value}Cr`}
                      >
                        {roadProjects.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`₹${value} Crores`, 'Budget']} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfaction" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Citizen Satisfaction by Service</CardTitle>
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
                <CardTitle>Service Satisfaction Levels</CardTitle>
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
                <CardTitle>Assam State - User Distribution Bubble Map</CardTitle>
                <CardDescription>Interactive bubble map showing user density across districts</CardDescription>
              </CardHeader>
              <CardContent>
                <AssamBubbleMap />
              </CardContent>
            </Card>
                
                {/* District Statistics */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Guwahati</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">1,245</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 20 | Complaints: 89
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Dibrugarh</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">687</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 12 | Complaints: 45
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Silchar</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">534</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 10 | Complaints: 34
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Jorhat</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">423</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 8 | Complaints: 28
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Tezpur</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">398</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 7 | Complaints: 22
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Nagaon</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-blue-600">356</div>
                      <p className="text-gray-600">Active Users</p>
                      <div className="mt-2 text-sm text-gray-500">
                        Projects: 6 | Complaints: 19
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <TabsContent/>
           
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Reports;