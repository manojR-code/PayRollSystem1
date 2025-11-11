import React from 'react';
import '../Style/Home.css';
import BarChart from '../Charts/Bar';
import BasicPie from '../Charts/PieChart';
import BasicGauges from '../Charts/Lines';
import StackedAreaChart from '../Charts/BudgetChart';
function Dashboard() {
  const [date, setDate] = React.useState();
  React.useEffect(() => {
    const dates = new Date();
    setDate(dates.getDate() + "/" + dates.getMonth() + "/" + dates.getFullYear());
  }, []);
  return (
    <div className="dashboard-container" style={{ marginTop: '40px' }}>
      <header className="dashboard-header">
        <h2>{ localStorage.getItem("Name")}</h2>
        <p>All systems are running smoothly! You have <a href="#">3 unread alerts!</a></p>
        <div className="date-selector">
          <button><p>{date}</p></button>
        </div>
      </header>

      {/* Top cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Today's Bookings</h3>
          <p className="stat-value">4006</p>
          <span>10.00% (30 days)</span>
        </div>
        <div className="stat-card purple">
          <h3>Total Bookings</h3>
          <p className="stat-value">61344</p>
          <span>22.00% (30 days)</span>
        </div>
        <div className="stat-card light-purple">
          <h3>Number of Meetings</h3>
          <p className="stat-value">34040</p>
          <span>2.00% (30 days)</span>
        </div>
        <div className="stat-card red">
          <h3>Number of Clients</h3>
          <p className="stat-value">47033</p>
          <span>0.22% (30 days)</span>
        </div>
      </div>

      {/* Lower grid for details + chart */}
      <div className="details-grid">
        <div className="details-card">
          <h3>Order Details</h3>
          <div className="order-info">
            <div>
              <p>Order Value</p>
              <h4>12.3k</h4>
            </div>
            <div>
              <p>Orders</p>
              <h4>14k</h4>
            </div>
            <div>
              <p>Users</p>
              <h4>71.56%</h4>
            </div>
          </div>
          <div className="downloads">
            <p>Downloads</p>
            <h4>34040</h4>
          </div>
          <BasicGauges />
        </div>

        <div className="details-card">
          <div className="card-header">
            <h3>Sales Report</h3>
            <a href="#">View all</a>
          </div>
          <p>The total number of sessions within the date range.</p>
          <BarChart />
        </div>
        <div className="details-card">
          <div className="card-header">
            <h3>Tax Rate On LPA</h3>
            <a href="#">View all</a>
          </div>
          <p>Tax Rates</p>
          <BasicPie />
        </div>
      </div>
      <div className="BudgetAllocatio" style={{marginTop:'20px'}}>
        <div className="details-card">
          <div className="card-header">
            <h3>Budget Allocated Yearly Wise</h3>
            <a href="#">View all</a>
          </div>
          <p>Budget</p>
          <StackedAreaChart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
