import React, { useState, useEffect } from 'react';
import { binsAPI } from '../services/api';
import './MapPage.css';

function MapPage() {
  const [bins, setBins] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [nearbyBins, setNearbyBins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          fetchNearbyBins(latitude, longitude);
        },
        () => {
          console.log('Geolocation not available');
          setLoading(false);
        }
      );
    }

    fetchAllBins();
  }, []);

  const fetchAllBins = async () => {
    try {
      const response = await binsAPI.getAll();
      setBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  const fetchNearbyBins = async (latitude, longitude) => {
    try {
      const response = await binsAPI.getNearby(latitude, longitude, 1000);
      setNearbyBins(response.data);
    } catch (error) {
      console.error('Error fetching nearby bins:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBinClick = (bin) => {
    setSelectedBin(bin);
  };

  if (loading) return <div className="loading">Loading map...</div>;

  return (
    <div className="map-page">
      <div className="container">
        <h1>📍 Interactive Map</h1>

        <div className="map-section">
          <p>Map component would load here with Leaflet integration</p>
          <div className="map-placeholder">
            Latitude: {userLocation?.[0].toFixed(4)} | Longitude: {userLocation?.[1].toFixed(4)}
          </div>
        </div>

        <div className="info-section">
          <div className="nearby-section">
            <h2>Nearby Bins</h2>
            <div className="nearby-list">
              {nearbyBins.slice(0, 5).map(bin => (
                <div
                  key={bin.id}
                  className="nearby-item"
                  onClick={() => handleBinClick(bin)}
                >
                  <span className="bin-type">{bin.waste_type}</span>
                  <span className="distance">{bin.distance.toFixed(0)}m</span>
                </div>
              ))}
            </div>
          </div>

          {selectedBin && (
            <div className="selected-bin-info">
              <h2>Selected Bin Details</h2>
              <div className="bin-info">
                <p><strong>ID:</strong> {selectedBin.id}</p>
                <p><strong>Type:</strong> {selectedBin.waste_type}</p>
                <p><strong>Status:</strong> {selectedBin.status}</p>
                <p><strong>Load:</strong> {selectedBin.current_load}/{selectedBin.capacity}kg</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MapPage;