import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './DashBoard.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

const DashBoard = () => {
  // Data for the Bar Chart (Monthly Sales)
  const monthlySalesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Monthly Sales ($)',
        data: [5000, 7000, 6000, 8000, 9000, 12000, 11000, 10000, 9500, 8500, 7000, 13000],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for the Pie Chart (Dish Popularity)
  const dishPopularityData = {
    labels: ['Spicy Pasta', 'Grilled Chicken', 'Veg Pizza', 'Burger', 'Sushi'],
    datasets: [
      {
        label: 'Dish Popularity',
        data: [35, 20, 15, 10, 20],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="restaurant-stats">
      <h1>Restaurant Dashboard</h1>
      <p className="welcome-message">Welcome back to your restaurant dashboard.</p>

      {/* Stats Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <h2>Total Orders</h2>
          <p>1,250</p>
          <span className="stat-change">↑ 12.5% vs last month</span>
        </div>
        <div className="stat-card">
          <h2>Revenue</h2>
          <p>$25,000</p>
          <span className="stat-change">↑ 8.2% vs last month</span>
        </div>
        <div className="stat-card">
          <h2>Active Customers</h2>
          <p>320</p>
          <span className="stat-change">↓ 4.1% vs last month</span>
        </div>
        <div className="stat-card">
          <h2>Popular Dish</h2>
          <p>Spicy Pasta</p>
          <span className="stat-change">↑ 2.3% vs last month</span>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        <div className="chart-card">
          <h2>Monthly Sales</h2>
          <div className="chart-wrapper">
            <Bar
              data={monthlySalesData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="chart-card">
          <h2>Dish Popularity</h2>
          <div className="chart-wrapper">
            <Pie
              data={dishPopularityData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;