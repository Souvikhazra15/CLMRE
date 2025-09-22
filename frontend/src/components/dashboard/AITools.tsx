import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Upload, Search, Image, Dna, Brain } from 'lucide-react';
import { OtolithResult, eDNAMatch } from '../../types';

const mockOtolithResults: OtolithResult[] = [
  {
    id: '1',
    imageUrl: 'https://images.pexels.com/photos/8960462/pexels-photo-8960462.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    species: 'Sardina pilchardus',
    confidence: 0.94,
    age: 3,
    location: 'Arabian Sea'
  },
  {
    id: '2',
    imageUrl: 'https://images.pexels.com/photos/8960462/pexels-photo-8960462.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
    species: 'Rastrelliger kanagurta',
    confidence: 0.87,
    age: 2,
    location: 'Bay of Bengal'
  }
];

const mockeDNAMatches: eDNAMatch[] = [
  {
    id: '1',
    sequence: 'ATCGATCGATCGATCGATCGATCGATCGATCG...',
    species: 'Thunnus albacares',
    confidence: 0.96,
    location: 'Kerala Coast',
    date: '2024-01-15'
  },
  {
    id: '2',
    sequence: 'GCTAGCTAGCTAGCTAGCTAGCTAGCTAGCT...',
    species: 'Katsuwonus pelamis',
    confidence: 0.89,
    location: 'Tamil Nadu Coast',
    date: '2024-01-14'
  }
];

export function AITools() {
  const [activeTab, setActiveTab] = useState('otolith');
  const [otolithResults] = useState<OtolithResult[]>(mockOtolithResults);
  const [eDNAResults] = useState<eDNAMatch[]>(mockeDNAMatches);
  const [dnaSequence, setDnaSequence] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleOtolithUpload = () => {
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 3000);
  };

  const handleDNAAnalysis = () => {
    if (!dnaSequence.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => setIsAnalyzing(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex space-x-4">
        <Button
          variant={activeTab === 'otolith' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('otolith')}
        >
          <Image className="h-4 w-4 mr-2" />
          Otolith Classifier
        </Button>
        <Button
          variant={activeTab === 'edna' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('edna')}
        >
          <Dna className="h-4 w-4 mr-2" />
          eDNA Matcher
        </Button>
        <Button
          variant={activeTab === 'prediction' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('prediction')}
        >
          <Brain className="h-4 w-4 mr-2" />
          Species Predictor
        </Button>
      </div>

      {activeTab === 'otolith' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Upload Otolith Images</h3>
              <p className="text-slate-400">
                Upload otolith images for automatic species identification and age estimation
              </p>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-white mb-2">
                  Drop otolith images here
                </p>
                <p className="text-slate-400 mb-4">
                  Supports JPG, PNG formats
                </p>
                <Button
                  variant="primary"
                  onClick={handleOtolithUpload}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Select Images'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Classification Results</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {otolithResults.map((result) => (
                  <div
                    key={result.id}
                    className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg"
                  >
                    <img
                      src={result.imageUrl}
                      alt="Otolith"
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-white italic">{result.species}</h4>
                      <p className="text-sm text-slate-400">
                        Age: {result.age} years • {result.location}
                      </p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="h-2 w-20 bg-slate-700 rounded-full">
                          <div
                            className="h-2 bg-green-400 rounded-full"
                            style={{ width: `${result.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-green-400">
                          {(result.confidence * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'edna' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">DNA Sequence Analysis</h3>
              <p className="text-slate-400">
                Input FASTA sequences for species identification
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    FASTA Sequence
                  </label>
                  <textarea
                    value={dnaSequence}
                    onChange={(e) => setDnaSequence(e.target.value)}
                    className="w-full h-32 px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                    placeholder="ATCGATCGATCGATCGATCGATCGATCGATCGATCGATCGATCG..."
                  />
                </div>
                <Button
                  variant="primary"
                  onClick={handleDNAAnalysis}
                  disabled={isAnalyzing || !dnaSequence.trim()}
                  className="w-full"
                >
                  <Search className="h-4 w-4 mr-2" />
                  {isAnalyzing ? 'Analyzing Sequence...' : 'Analyze Sequence'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-white">Sequence Matches</h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {eDNAResults.map((match) => (
                  <div
                    key={match.id}
                    className="p-4 bg-slate-800/30 rounded-lg border border-slate-700"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-white italic">{match.species}</h4>
                      <span className="text-sm text-green-400">
                        {(match.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                    <p className="text-sm text-slate-400 font-mono mb-2">
                      {match.sequence}
                    </p>
                    <div className="flex justify-between text-sm text-slate-400">
                      <span>{match.location}</span>
                      <span>{match.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'prediction' && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Species Population Predictor</h3>
            <p className="text-slate-400">
              AI-powered prediction model for species population trends
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Input label="Location" placeholder="e.g., Arabian Sea" />
              <Input label="Time Period" placeholder="e.g., Next 6 months" />
              <Input label="Species" placeholder="e.g., Sardina pilchardus" />
            </div>
            <Button variant="primary" className="w-full md:w-auto">
              Generate Prediction
            </Button>
            
            <div className="mt-6 p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <h4 className="font-medium text-blue-300 mb-2">Sample Prediction Result</h4>
              <p className="text-slate-300">
                Based on current temperature trends and historical data, Sardina pilchardus 
                population in the Arabian Sea is predicted to decline by 15% over the next 6 months.
                Key factors: Rising sea temperatures (+2.3°C), reduced plankton availability.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}