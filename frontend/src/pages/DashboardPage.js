import React, { useState, useEffect } from 'react';
import { binsAPI, collectionsAPI } from '../services/api';
import './DashboardPage.css';

function DashboardPage({ user }) {
  const [stats, setStats] = useState({
    totalBins: 0,
    fullBins: 0,
    emptyBins: 0,
    totalCollections: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const binsResponse = await binsAPI.getAll();
      const collectionsResponse = await collectionsAPI.getAll();

      const bins = binsResponse.data;
      const fullBins = bins.filter(b => b.status === 'full').length;
      const emptyBins = bins.filter(b => b.status === 'empty').length;

      setStats({
        totalBins: bins.length,
        fullBins,
        emptyBins,
        totalCollections: collectionsResponse.data.length
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading dashboard...</div>;

  return (
    <div className="dashboard-page">
      <div className="container">
        <h1>Dashboard</h1>
        <p className="welcome">Welcome back, {user?.username}! 👋</p>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">🗑️</div>
            <div className="stat-content">
              <h3>Total Bins</h3>
              <p className="stat-value">{stats.totalBins}</p>
            </div>
          </div>

          <div className="stat-card full">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Full Bins</h3>
              <p className="stat-value">{stats.fullBins}</p>
            </div>
          </div>

          <div className="stat-card empty">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Empty Bins</h3>
              <p className="stat-value">{stats.emptyBins}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Collections</h3>
              <p className="stat-value">{stats.totalCollections}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;