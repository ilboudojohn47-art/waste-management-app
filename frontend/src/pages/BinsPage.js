import React, { useState, useEffect } from 'react';
import { binsAPI } from '../services/api';
import './BinsPage.css';

function BinsPage() {
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    fetchBins();
  }, []);

  const fetchBins = async () => {
    try {
      const response = await binsAPI.getAll();
      setBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBins = filterType === 'all'
    ? bins
    : bins.filter(bin => bin.waste_type === filterType);

  const getStatusColor = (status) => {
    const colors = {
      empty: '#10b981',
      half_full: '#f59e0b',
      full: '#ef4444',
      defect: '#6b7280'
    };
    return colors[status] || '#9ca3af';
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="bins-page">
      <div className="container">
        <h1>🗑️ Waste Bins Management</h1>

        <div className="filter-section">
          <label>Filter by Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="organic">Organic</option>
            <option value="plastic">Plastic</option>
            <option value="glass">Glass</option>
            <option value="paper">Paper</option>
            <option value="general">General</option>
          </select>
        </div>

        <div className="bins-grid">
          {filteredBins.map(bin => (
            <div key={bin.id} className="bin-card">
              <div className="bin-header">
                <h3>Bin #{bin.id}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(bin.status) }}
                >
                  {bin.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="bin-details">
                <p><strong>Type:</strong> {bin.waste_type}</p>
                <p><strong>Location:</strong> {bin.latitude.toFixed(4)}, {bin.longitude.toFixed(4)}</p>
                <div className="bin-capacity">
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(bin.current_load / bin.capacity) * 100}%` }}
                    ></div>
                  </div>
                  <p>{bin.current_load}/{bin.capacity}kg</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BinsPage;