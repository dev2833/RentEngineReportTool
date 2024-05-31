import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

interface HealthStatus {
  unit_id: string;
  zillow_status: string;
  zumper_status: string;
}

function App() {
  const [healthStatuses, setHealthStatuses] = useState<HealthStatus[]>([]);

  useEffect(() => {
    const fetchHealthStatuses = async () => {
      const response = await axios.get<HealthStatus[]>('http://localhost:5000/api/health_statuses');
      setHealthStatuses(response.data);
    };

    fetchHealthStatuses();
  }, []);

  return (
    <div className="App">
      <h1>RentEngine Health Statuses</h1>
      <table>
        <thead>
          <tr>
            <th>Unit ID</th>
            <th>Zillow Status</th>
            <th>Zumper Status</th>
          </tr>
        </thead>
        <tbody>
          {healthStatuses.map(status => (
            <tr key={status.unit_id}>
              <td>{status.unit_id}</td>
              <td>{status.zillow_status}</td>
              <td>{status.zumper_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
