'use client';

import { Card, Row, Col, Statistic, Spin, Empty } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { fetchDashboardStats } from '../../services/projectService';
import { ProjectOutlined, TeamOutlined, CalendarOutlined, TrophyOutlined } from '@ant-design/icons';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <div className="text-center">
              <Spin size="large" />
              <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-96">
            <Empty description="Error loading dashboard data" />
          </div>
        </div>
      </div>
    );
  }

  const monthlyData = stats?.monthly || [];
  const pieData = monthlyData.slice(0, 5).map((item, index) => ({
    name: item.month,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Dashboard</h1>
          <p className="text-gray-600 text-lg">Welcome to your project overview</p>
        </div>

        {/* Stats Cards */}
        <Row gutter={[24, 24]} className="mb-8">
          <Col xs={24} sm={12} lg={6}>
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Statistic
                title={
                  <div className="flex items-center space-x-2">
                    <ProjectOutlined className="text-blue-500 text-xl" />
                    <span className="text-gray-600">Total Projects</span>
                  </div>
                }
                value={stats?.total || 0}
                valueStyle={{ 
                  color: '#1890ff',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                suffix={
                  <span className="text-sm text-gray-500 ml-2">
                    {stats?.total === 1 ? 'project' : 'projects'}
                  </span>
                }
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Statistic
                title={
                  <div className="flex items-center space-x-2">
                    <TeamOutlined className="text-green-500 text-xl" />
                    <span className="text-gray-600">Active Teams</span>
                  </div>
                }
                value={Math.floor((stats?.total || 0) / 3) + 1}
                valueStyle={{ 
                  color: '#52c41a',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                suffix="teams"
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Statistic
                title={
                  <div className="flex items-center space-x-2">
                    <CalendarOutlined className="text-orange-500 text-xl" />
                    <span className="text-gray-600">This Month</span>
                  </div>
                }
                value={monthlyData[monthlyData.length - 1]?.count || 0}
                valueStyle={{ 
                  color: '#fa8c16',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                suffix="new"
              />
            </Card>
          </Col>
          
          <Col xs={24} sm={12} lg={6}>
            <Card className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <Statistic
                title={
                  <div className="flex items-center space-x-2">
                    <TrophyOutlined className="text-purple-500 text-xl" />
                    <span className="text-gray-600">Success Rate</span>
                  </div>
                }
                value={95.8}
                valueStyle={{ 
                  color: '#722ed1',
                  fontSize: '2rem',
                  fontWeight: 'bold'
                }}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        {/* Charts */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-lg font-semibold">Projects Created per Month</span>
                </div>
              }
              className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ddd' }}
                  />
                  <YAxis 
                    tick={{ fill: '#666' }}
                    axisLine={{ stroke: '#ddd' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="url(#colorGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#667eea" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#764ba2" stopOpacity={0.8}/>
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Col>
          
          <Col xs={24} lg={8}>
            <Card 
              title={
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-lg font-semibold">Top Months</span>
                </div>
              }
              className="card-hover border-0 shadow-lg bg-white/80 backdrop-blur-sm"
            >
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent ? (percent * 100).toFixed(0) : 0}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
} 