import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';

const Map = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Leaflet dynamically
  useEffect(() => {
    const loadLeaflet = async () => {
      // Load Leaflet CSS
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(link);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => {
        setMapLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadLeaflet();
  }, []);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError('');

    try {
      Papa.parse(file, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: false,
        complete: function(results) {
          try {
            const csvData = results.data;
            console.log('CSV Data:', csvData);
            
            if (!csvData || csvData.length === 0) {
              setError('CSV file appears to be empty');
              setLoading(false);
              return;
            }

            // Process the data
            const processedData = [];
            const headers = csvData[0].map(header => header ? header.trim() : '');
            console.log('Headers:', headers);
            
            for (let colIndex = 0; colIndex < headers.length; colIndex++) {
              const partyName = headers[colIndex];
              if (!partyName) continue;
              
              const partyCoordinates = [];
              
              for (let rowIndex = 1; rowIndex < csvData.length; rowIndex++) {
                const cellValue = csvData[rowIndex][colIndex];
                if (cellValue && typeof cellValue === 'string') {
                  const trimmedValue = cellValue.trim();
                  // Parse coordinate pairs like "(lat,long)" or "lat,long"
                  const coordMatch = trimmedValue.match(/\(?(-?\d+\.?\d*),\s*(-?\d+\.?\d*)\)?/);
                  if (coordMatch) {
                    const lat = parseFloat(coordMatch[1]);
                    const lng = parseFloat(coordMatch[2]);
                    if (!isNaN(lat) && !isNaN(lng)) {
                      partyCoordinates.push({ lat, lng, rowIndex });
                    }
                  }
                }
              }
              
              console.log(`${partyName}: ${partyCoordinates.length} coordinates`);
              
              if (partyCoordinates.length > 0) {
                processedData.push({
                  party: partyName,
                  coordinates: partyCoordinates,
                  color: getPartyColor(partyName, colIndex)
                });
              }
            }

            console.log('Processed Data:', processedData);
            setData(processedData);
            
            // Initialize map after data is processed
            setTimeout(() => {
              if (window.L && processedData.length > 0) {
                initializeMap(processedData);
              }
            }, 100);

          } catch (err) {
            console.error('Processing error:', err);
            setError('Error processing CSV data: ' + err.message);
          } finally {
            setLoading(false);
          }
        },
        error: function(error) {
          console.error('Parse error:', error);
          setError('Error parsing CSV file: ' + error.message);
          setLoading(false);
        }
      });

    } catch (err) {
      console.error('File reading error:', err);
      setError('Error reading CSV file: ' + err.message);
      setLoading(false);
    }
  };

  const getPartyColor = (partyName, index) => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
      '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
      '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D5A6BD'
    ];
    
    // Try to assign specific colors for known parties
    const partyColorMap = {
      'BJP': '#FF6B35',
      'INC': '#19398A',
      'Congress': '#19398A',
      'AGP': '#0066CC',
      'AIUDF': '#228B22',
      'BPF': '#800080',
      'AAP': '#0066FF'
    };
    
    return partyColorMap[partyName] || colors[index % colors.length];
  };

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const initializeMap = (mapData) => {
    // Remove existing map if any
    const existingMap = document.getElementById('map');
    if (existingMap._leaflet_id) {
      existingMap._leaflet.remove();
    }

    // Initialize map centered on Assam
    const map = window.L.map('map').setView([26.2006, 92.9376], 8);

    // Add tile layer
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const bounds = [];
    
    // Add individual survey points as colored dots
    mapData.forEach((partyData) => {
      const { party, coordinates, color } = partyData;
      
      coordinates.forEach((coord, index) => {
        bounds.push([coord.lat, coord.lng]);
        
        const marker = window.L.circleMarker([coord.lat, coord.lng], {
          color: '#ffffff',
          fillColor: color,
          fillOpacity: 0.8,
          radius: 6,
          stroke: true,
          weight: 2
        });

        // Create popup with details and Google Maps button
        const popupContent = `
          <div style="min-width: 200px;">
            <div style="margin-bottom: 8px;">
              <strong style="color: ${color}; font-size: 16px;">${party}</strong>
            </div>
            <div style="margin-bottom: 8px; font-size: 14px;">
              <strong>Survey Point #${index + 1}</strong>
            </div>
            <div style="margin-bottom: 8px; font-size: 13px; color: #666;">
              <strong>Coordinates:</strong><br>
              Latitude: ${coord.lat}<br>
              Longitude: ${coord.lng}
            </div>
            <button 
              onclick="window.open('https://www.google.com/maps?q=${coord.lat},${coord.lng}', '_blank')"
              style="
                background-color: #4285f4;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
                width: 100%;
                margin-top: 5px;
              "
              onmouseover="this.style.backgroundColor='#3367d6'"
              onmouseout="this.style.backgroundColor='#4285f4'"
            >
              📍 Open in Google Maps
            </button>
          </div>
        `;

        marker.bindPopup(popupContent, {
          maxWidth: 250,
          className: 'custom-popup'
        });

        // Add hover effect
        marker.on('mouseover', function() {
          this.setStyle({
            radius: 8,
            fillOpacity: 1
          });
        });

        marker.on('mouseout', function() {
          this.setStyle({
            radius: 6,
            fillOpacity: 0.8
          });
        });

        marker.addTo(map);
      });
    });

    // Fit map to show all points
    if (bounds.length > 0) {
      map.fitBounds(bounds, { padding: [20, 20] });
    }

    // Add custom CSS for popups
    const style = document.createElement('style');
    style.textContent = `
      .custom-popup .leaflet-popup-content-wrapper {
        border-radius: 8px;
      }
      .custom-popup .leaflet-popup-content {
        margin: 12px;
      }
    `;
    document.head.appendChild(style);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg">
     
        <div className="p-6">
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload CSV File
            </label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {loading && (
            <div className="text-center py-4">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Processing CSV file...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          {data.length > 0 && (
            <div className="mb-2">
              <h3 className="text-lg font-semibold mb-3">Party Legend</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: item.color }}
                    ></div>
                    <span className="text-sm font-medium">{item.party}</span>
                    <span className="text-xs text-gray-500">({item.coordinates.length})</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                * Click on any dot to see details and get directions
              </p>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <div 
              id="map" 
              className="w-full h-full rounded-lg border-2 border-gray-200"
              style={{ minHeight: '400px' }}
            >
              {!mapLoaded && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Loading map...</p>
                </div>
              )}
              {mapLoaded && data.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-500">Upload a CSV file to see the visualization</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <p><strong>How it works:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Each colored dot represents a survey point for a political party</li>
              <li>Click on any dot to see detailed information</li>
              <li>Use the "Open in Google Maps" button to get directions to that location</li>
              <li>Hover over dots to see them highlighted</li>
            </ul>
            
            <p className="mt-4"><strong>Expected CSV format:</strong></p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>First row: Party names as column headers</li>
              <li>Subsequent rows: Coordinate data in format "(latitude,longitude)" or "latitude,longitude"</li>
              <li>Each column represents survey points for that political party</li>
              <li>Example: "26.1445,91.7362" or "(26.1445,91.7362)"</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;