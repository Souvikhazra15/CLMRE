import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ScatterChart,
  Scatter
} from 'recharts';
import { TrendingUp, BarChart3, Search } from 'lucide-react';

const temperatureSpeciesData = [
  { month: 'Jan', temperature: 26.5, sardines: 1200, mackerel: 890 },
  { month: 'Feb', temperature: 27.2, sardines: 1150, mackerel: 920 },
  { month: 'Mar', temperature: 28.1, sardines: 1080, mackerel: 850 },
  { month: 'Apr', temperature: 28.8, sardines: 980, mackerel: 790 },
  { month: 'May', temperature: 29.5, sardines: 920, mackerel: 820 },
  { month: 'Jun', temperature: 30.2, sardines: 850, mackerel: 780 },
];

const correlationData = [
  { temperature: 26.5, species_count: 1200, species: 'Sardines' },
  { temperature: 27.2, species_count: 1150, species: 'Sardines' },
  { temperature: 28.1, species_count: 1080, species: 'Sardines' },
  { temperature: 28.8, species_count: 980, species: 'Sardines' },
  { temperature: 29.5, species_count: 920, species: 'Sardines' },
  { temperature: 30.2, species_count: 850, species: 'Sardines' },
];

const correlationResults = [
  {
    variables: 'Sea Temperature vs Sardine Population',
    correlation: -0.92,
    significance: 'High',
    description: 'Strong negative correlation: As temperature rises, sardine population decreases'
  },
  {
    variables: 'Plankton Density vs Fish Diversity',
    correlation: 0.78,
    significance: 'Medium',
    description: 'Positive correlation: Higher plankton density supports greater fish diversity'
  },
  {
    variables: 'Ocean pH vs Coral Coverage',
    correlation: 0.65,
    significance: 'Medium',
    description: 'Moderate positive correlation between ocean pH and coral health'
  }
];

export function CorrelationEngine() {
  const [selectedVar1, setSelectedVar1] = useState('temperature');
  const [selectedVar2, setSelectedVar2] = useState('species_population');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runCorrelation = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  const getCorrelationColor = (correlation: number) => {
    const abs = Math.abs(correlation);
    if (abs >= 0.8) return 'text-red-400';
    if (abs >= 0.5) return 'text-yellow-400';
    return 'text-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Correlation Analysis</h3>
            <p className="text-slate-400">Select variables to analyze relationships</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Variable 1
                </label>
                <select
                  value={selectedVar1}
                  onChange={(e) => setSelectedVar1(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="temperature">Sea Temperature</option>
                  <option value="salinity">Salinity</option>
                  <option value="ph">Ocean pH</option>
                  <option value="depth">Water Depth</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Variable 2
                </label>
                <select
                  value={selectedVar2}
                  onChange={(e) => setSelectedVar2(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="species_population">Species Population</option>
                  <option value="fish_diversity">Fish Diversity</option>
                  <option value="plankton_density">Plankton Density</option>
                  <option value="coral_coverage">Coral Coverage</option>
                </select>
              </div>

              <Input label="Location Filter" placeholder="e.g., Arabian Sea" />
              <Input label="Date Range" placeholder="e.g., 2023-2024" />

              <Button 
                variant="primary" 
                className="w-full"
                onClick={runCorrelation}
                disabled={isAnalyzing}
              >
                <Search className="h-4 w-4 mr-2" />
                {isAnalyzing ? 'Analyzing...' : 'Run Analysis'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Temperature vs Species Population</h3>
            <p className="text-slate-400">Showing correlation between sea temperature and sardine population</p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <ScatterChart data={correlationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis 
                  dataKey="temperature" 
                  stroke="#94A3B8"
                  name="Temperature (°C)"
                />
                <YAxis 
                  dataKey="species_count" 
                  stroke="#94A3B8"
                  name="Population"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1E293B',
                    border: '1px solid #334155',
                    borderRadius: '8px'
                  }}
                  formatter={(value, name) => [
                    name === 'species_count' ? `${value} individuals` : `${value}°C`,
                    name === 'species_count' ? 'Population' : 'Temperature'
                  ]}
                />
                <Scatter dataKey="species_count" fill="#EF4444" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Time Series Analysis</h3>
          <p className="text-slate-400">Temperature and species population trends over time</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={temperatureSpeciesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis yAxisId="temp" orientation="left" stroke="#F59E0B" />
              <YAxis yAxisId="population" orientation="right" stroke="#EF4444" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  border: '1px solid #334155',
                  borderRadius: '8px'
                }}
              />
              <Line
                yAxisId="temp"
                type="monotone"
                dataKey="temperature"
                stroke="#F59E0B"
                strokeWidth={3}
                name="Temperature (°C)"
              />
              <Line
                yAxisId="population"
                type="monotone"
                dataKey="sardines"
                stroke="#EF4444"
                strokeWidth={3}
                name="Sardine Population"
              />
              <Line
                yAxisId="population"
                type="monotone"
                dataKey="mackerel"
                stroke="#10B981"
                strokeWidth={3}
                name="Mackerel Population"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Correlation Results</h3>
          <p className="text-slate-400">Statistical analysis of marine variable relationships</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correlationResults.map((result, index) => (
              <div
                key={index}
                className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white">{result.variables}</h4>
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-4 w-4 text-slate-400" />
                    <span className={`font-bold ${getCorrelationColor(result.correlation)}`}>
                      r = {result.correlation}
                    </span>
                    <span className="text-xs px-2 py-1 bg-blue-600/20 text-blue-300 rounded-full">
                      {result.significance}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-slate-400">{result.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}