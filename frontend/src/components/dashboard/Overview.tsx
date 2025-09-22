import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Database, Fish, Waves, TrendingUp } from 'lucide-react';

const datasetStats = [
  { name: 'Oceanographic', value: 1250, color: '#0EA5E9' },
  { name: 'Fisheries', value: 890, color: '#10B981' },
  { name: 'Taxonomy', value: 675, color: '#F59E0B' },
  { name: 'eDNA', value: 445, color: '#EF4444' },
];

const monthlyUploads = [
  { month: 'Jan', uploads: 65 },
  { month: 'Feb', uploads: 78 },
  { month: 'Mar', uploads: 92 },
  { month: 'Apr', uploads: 88 },
  { month: 'May', uploads: 105 },
  { month: 'Jun', uploads: 125 },
];

const speciesTrends = [
  { month: 'Jan', sardines: 1200, mackerel: 890, tuna: 650 },
  { month: 'Feb', sardines: 1150, mackerel: 920, tuna: 680 },
  { month: 'Mar', sardines: 1080, mackerel: 850, tuna: 720 },
  { month: 'Apr', sardines: 980, mackerel: 790, tuna: 750 },
  { month: 'May', sardines: 920, mackerel: 820, tuna: 780 },
  { month: 'Jun', sardines: 850, mackerel: 780, tuna: 820 },
];

export function Overview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Datasets</p>
                <p className="text-2xl font-bold text-white">3,260</p>
                <p className="text-green-400 text-sm">↗ 12% this month</p>
              </div>
              <Database className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Species Identified</p>
                <p className="text-2xl font-bold text-white">1,847</p>
                <p className="text-green-400 text-sm">↗ 8% this month</p>
              </div>
              <Fish className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Ocean Stations</p>
                <p className="text-2xl font-bold text-white">156</p>
                <p className="text-blue-400 text-sm">Active monitoring</p>
              </div>
              <Waves className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">AI Predictions</p>
                <p className="text-2xl font-bold text-white">94.2%</p>
                <p className="text-green-400 text-sm">Accuracy rate</p>
              </div>
              <TrendingUp className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Dataset Distribution</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={datasetStats}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  dataKey="value"
                >
                  {datasetStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {datasetStats.map((item) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Monthly Data Uploads</h3>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyUploads}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94A3B8" />
                <YAxis stroke="#94A3B8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="uploads" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Species Population Trends</h3>
          <p className="text-slate-400">Showing correlation with temperature changes</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={speciesTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Line
                type="monotone"
                dataKey="sardines"
                stroke="#EF4444"
                strokeWidth={3}
                name="Sardines"
              />
              <Line
                type="monotone"
                dataKey="mackerel"
                stroke="#10B981"
                strokeWidth={3}
                name="Mackerel"
              />
              <Line
                type="monotone"
                dataKey="tuna"
                stroke="#F59E0B"
                strokeWidth={3}
                name="Tuna"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}