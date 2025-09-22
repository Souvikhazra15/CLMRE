import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Fish, Thermometer, Droplets, Eye } from 'lucide-react';

// Mock data for marine stations and observations
const marineStations = [
  { id: '1', name: 'Kochi Station', lat: 9.9312, lng: 76.2673, type: 'oceanographic', status: 'active' },
  { id: '2', name: 'Mumbai Station', lat: 19.0760, lng: 72.8777, type: 'fisheries', status: 'active' },
  { id: '3', name: 'Chennai Station', lat: 13.0827, lng: 80.2707, type: 'biodiversity', status: 'active' },
  { id: '4', name: 'Visakhapatnam Station', lat: 17.6868, lng: 83.2185, type: 'eDNA', status: 'maintenance' },
];

const speciesObservations = [
  { id: '1', species: 'Sardina pilchardus', count: 1200, lat: 9.9, lng: 76.3, confidence: 0.94 },
  { id: '2', species: 'Rastrelliger kanagurta', count: 850, lat: 19.1, lng: 72.9, confidence: 0.89 },
  { id: '3', species: 'Thunnus albacares', count: 320, lat: 13.1, lng: 80.3, confidence: 0.92 },
];

export function MarineMaps() {
  const [activeLayer, setActiveLayer] = useState<'stations' | 'species' | 'temperature' | 'depth'>('stations');
  const [selectedStation, setSelectedStation] = useState<typeof marineStations[0] | null>(null);

  const layerOptions = [
    { id: 'stations' as const, label: 'Monitoring Stations', icon: MapPin, color: 'text-blue-400' },
    { id: 'species' as const, label: 'Species Distribution', icon: Fish, color: 'text-green-400' },
    { id: 'temperature' as const, label: 'Sea Temperature', icon: Thermometer, color: 'text-red-400' },
    { id: 'depth' as const, label: 'Bathymetry', icon: Droplets, color: 'text-cyan-400' },
  ];

  // Simple map visualization (in a real app, you'd use a proper mapping library like Leaflet)
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">Map Layers</h3>
            <p className="text-slate-400">Select data layer to display</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {layerOptions.map((layer) => {
                const Icon = layer.icon;
                return (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeLayer === layer.id
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Icon className={`h-5 w-5 ${activeLayer === layer.id ? 'text-white' : layer.color}`} />
                    <span>{layer.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Quick Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Active Stations:</span>
                    <span className="text-green-400">
                      {marineStations.filter(s => s.status === 'active').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Species Tracked:</span>
                    <span className="text-blue-400">2,347</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Data Points:</span>
                    <span className="text-yellow-400">1.2M</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-white mb-2">Legend</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <span className="text-slate-300">Active Station</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <span className="text-slate-300">Maintenance</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <span className="text-slate-300">High Biodiversity</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Eye className="h-5 w-5 mr-2" />
              Indian Ocean Marine Data Visualization
            </h3>
            <p className="text-slate-400">
              Interactive map showing {layerOptions.find(l => l.id === activeLayer)?.label}
            </p>
          </CardHeader>
          <CardContent>
            {/* Simplified map representation - in a real app, use Leaflet or similar */}
            <div className="relative h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-lg overflow-hidden">
              {/* Background ocean pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                      <path d="M0 10 Q 10 0, 20 10 T 40 10" stroke="currentColor" fill="none" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#waves)" />
                </svg>
              </div>

              {/* Coastline representation */}
              <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-amber-900/30 to-transparent"></div>
              <div className="absolute right-0 top-1/4 w-32 h-48 bg-gradient-to-l from-amber-900/30 to-transparent rounded-l-full"></div>

              {/* Data points based on active layer */}
              {activeLayer === 'stations' && marineStations.map((station, index) => (
                <div
                  key={station.id}
                  className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all hover:scale-125 ${
                    station.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                  }`}
                  style={{
                    left: `${20 + index * 20}%`,
                    top: `${30 + index * 15}%`,
                  }}
                  onClick={() => setSelectedStation(station)}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                    {station.name}
                  </div>
                </div>
              ))}

              {activeLayer === 'species' && speciesObservations.map((obs, index) => (
                <div
                  key={obs.id}
                  className="absolute cursor-pointer group"
                  style={{
                    left: `${25 + index * 25}%`,
                    top: `${20 + index * 20}%`,
                  }}
                >
                  <div className="w-6 h-6 bg-green-400 rounded-full animate-pulse">
                    <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
                  </div>
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {obs.species}: {obs.count}
                  </div>
                </div>
              ))}

              {activeLayer === 'temperature' && (
                <>
                  {/* Temperature gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-yellow-500/20 to-red-500/20"></div>
                  <div className="absolute top-4 left-4 bg-slate-800/80 p-3 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Temperature (°C)</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-blue-500"></div>
                        <span className="text-white">24-26°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-yellow-500"></div>
                        <span className="text-white">26-28°C</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-red-500"></div>
                        <span className="text-white">28-30°C</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeLayer === 'depth' && (
                <>
                  {/* Bathymetry visualization */}
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-blue-600/20 to-indigo-900/40"></div>
                  <div className="absolute top-4 right-4 bg-slate-800/80 p-3 rounded-lg">
                    <h4 className="text-white font-medium mb-2">Depth (m)</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-cyan-400"></div>
                        <span className="text-white">0-200m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-blue-600"></div>
                        <span className="text-white">200-1000m</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-2 bg-indigo-900"></div>
                        <span className="text-white">{'>'}1000m</span>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Map controls */}
              <div className="absolute bottom-4 right-4 space-y-2">
                <Button variant="secondary" size="sm">Zoom In</Button>
                <Button variant="secondary" size="sm">Zoom Out</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Station details modal-like panel */}
      {selectedStation && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold text-white">{selectedStation.name} Details</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedStation(null)}
              className="absolute top-4 right-4"
            >
              Close
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-white mb-2">Station Info</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-400">Type:</span> <span className="text-white capitalize">{selectedStation.type}</span></div>
                  <div><span className="text-slate-400">Status:</span> <span className="text-green-400 capitalize">{selectedStation.status}</span></div>
                  <div><span className="text-slate-400">Coordinates:</span> <span className="text-white">{selectedStation.lat.toFixed(4)}, {selectedStation.lng.toFixed(4)}</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Recent Data</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-400">Temperature:</span> <span className="text-white">28.5°C</span></div>
                  <div><span className="text-slate-400">Salinity:</span> <span className="text-white">35.2 PSU</span></div>
                  <div><span className="text-slate-400">pH Level:</span> <span className="text-white">8.1</span></div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-white mb-2">Species Count</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-slate-400">Fish:</span> <span className="text-white">1,450</span></div>
                  <div><span className="text-slate-400">Crustaceans:</span> <span className="text-white">320</span></div>
                  <div><span className="text-slate-400">Mollusks:</span> <span className="text-white">180</span></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}