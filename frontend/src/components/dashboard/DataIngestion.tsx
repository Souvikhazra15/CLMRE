import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { Upload, File, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Dataset } from '../../types';

const mockDatasets: Dataset[] = [
  {
    id: '1',
    name: 'Arabian_Sea_Temperature_2024.csv',
    type: 'csv',
    size: '2.4 MB',
    uploadDate: '2024-01-15',
    status: 'ready',
    tags: ['temperature', 'oceanographic', 'arabian-sea']
  },
  {
    id: '2',
    name: 'Fish_Species_Kochi.json',
    type: 'json',
    size: '1.8 MB',
    uploadDate: '2024-01-14',
    status: 'processing',
    tags: ['species', 'fisheries', 'kochi']
  },
  {
    id: '3',
    name: 'Otolith_Images_Batch_5.zip',
    type: 'image',
    size: '45.2 MB',
    uploadDate: '2024-01-13',
    status: 'ready',
    tags: ['otolith', 'morphology', 'classification']
  },
  {
    id: '4',
    name: 'eDNA_Sequences_Bay_of_Bengal.fasta',
    type: 'fasta',
    size: '892 KB',
    uploadDate: '2024-01-12',
    status: 'error',
    tags: ['edna', 'molecular', 'bay-of-bengal']
  }
];

export function DataIngestion() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets);
  const [dragOver, setDragOver] = useState(false);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach((file) => {
      const newDataset: Dataset = {
        id: Date.now().toString(),
        name: file.name,
        type: getFileType(file.name),
        size: formatFileSize(file.size),
        uploadDate: new Date().toISOString().split('T')[0],
        status: 'processing',
        tags: generateTags(file.name)
      };

      setDatasets(prev => [newDataset, ...prev]);

      // Simulate processing
      setTimeout(() => {
        setDatasets(prev => 
          prev.map(d => 
            d.id === newDataset.id 
              ? { ...d, status: Math.random() > 0.1 ? 'ready' : 'error' }
              : d
          )
        );
      }, 3000);
    });
  };

  const getFileType = (filename: string): Dataset['type'] => {
    const extension = filename.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'csv': return 'csv';
      case 'json': return 'json';
      case 'fasta': case 'fa': return 'fasta';
      case 'jpg': case 'jpeg': case 'png': case 'zip': return 'image';
      default: return 'csv';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const generateTags = (filename: string): string[] => {
    const tags: string[] = [];
    const name = filename.toLowerCase();
    
    if (name.includes('temperature') || name.includes('temp')) tags.push('temperature');
    if (name.includes('fish') || name.includes('species')) tags.push('species');
    if (name.includes('otolith')) tags.push('otolith');
    if (name.includes('edna') || name.includes('dna')) tags.push('edna');
    if (name.includes('arabian') || name.includes('kochi') || name.includes('bengal')) {
      tags.push('location');
    }
    
    return tags;
  };

  const getStatusIcon = (status: Dataset['status']) => {
    switch (status) {
      case 'ready': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'processing': return <Clock className="h-5 w-5 text-yellow-400" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-400" />;
    }
  };

  const getStatusText = (status: Dataset['status']) => {
    switch (status) {
      case 'ready': return 'Ready';
      case 'processing': return 'Processing';
      case 'error': return 'Error';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Upload New Dataset</h3>
          <p className="text-slate-400">
            Upload CSV, JSON, FASTA files or image archives for AI processing
          </p>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragOver
                ? 'border-blue-400 bg-blue-400/10'
                : 'border-slate-600 hover:border-slate-500'
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              handleFileUpload(e.dataTransfer.files);
            }}
          >
            <Upload className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-white mb-2">
              Drop files here or click to upload
            </p>
            <p className="text-slate-400 mb-4">
              Supports CSV, JSON, FASTA, and image files
            </p>
            <input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={(e) => handleFileUpload(e.target.files)}
              accept=".csv,.json,.fasta,.fa,.jpg,.jpeg,.png,.zip"
            />
            <Button
              variant="primary"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Select Files
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold text-white">Recent Datasets</h3>
          <p className="text-slate-400">
            {datasets.length} datasets • {datasets.filter(d => d.status === 'ready').length} ready
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {datasets.map((dataset) => (
              <div
                key={dataset.id}
                className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg border border-slate-700"
              >
                <div className="flex items-center space-x-4">
                  <File className="h-8 w-8 text-blue-400" />
                  <div>
                    <h4 className="font-medium text-white">{dataset.name}</h4>
                    <p className="text-sm text-slate-400">
                      {dataset.size} • Uploaded {dataset.uploadDate}
                    </p>
                    <div className="flex space-x-1 mt-1">
                      {dataset.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 bg-blue-600/20 text-blue-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(dataset.status)}
                  <span className="text-sm text-slate-300">
                    {getStatusText(dataset.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}