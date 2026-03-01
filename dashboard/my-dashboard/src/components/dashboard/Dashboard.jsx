import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { DollarSign, Package, Clock, TrendingUp } from 'lucide-react';
import TopProducts from '../topProducts/TopProducts';


const AdminDashboard = () => {
  const [stats, setStats] = useState([]);
  
  const [revenueData, setRevenueData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust these URLs to match your actual API routes
        const statsRes = await axios.get('http://localhost:5000/api/admin/stats');
        const revenueRes = await axios.get('http://localhost:5000/api/admin/monthly/stats');

        setStats(statsRes.data);
        setRevenueData(revenueRes.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const pieData = [
    { name: 'Pending', value: stats.pendingOrders },
    { name: 'Delivered', value: stats.totalOrders - stats.pendingOrders },
  ];

  const COLORS = ['#F59E0B', '#10B981']; // Amber for Pending, Emerald for Delivered

  if (loading) return <div className="text-white p-10">Loading Dashboard...</div>;

  return (
    <> 
    <div className="px-22 max-md:px-1 mt-8  min-h-screen ">
      <h2 className="text-3xl font-semibold mb-8">Admin Dashboard</h2>

      {/* --- SECTION 1: STAT CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Total Orders */}
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-blue-500">
          <div>
            <p className="text-gray-400 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
          </div>
          <div className="p-3 bg-blue-500/20 rounded-full text-blue-500">
            <Package size={24} />
          </div>
        </div>

        {/* Pending Orders */}
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-amber-500">
          <div>
            <p className="text-gray-400 text-sm">Pending Orders</p>
            <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
          </div>
          <div className="p-3 bg-amber-500/20 rounded-full text-amber-500">
            <Clock size={24} />
          </div>
        </div>

        {/* Real Revenue */}
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-green-500">
          <div>
            <p className="text-gray-400 text-sm">Real Revenue</p>
            <h3 className="text-2xl font-bold">${stats.realRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3 bg-green-500/20 rounded-full text-green-500">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Potential Revenue */}
        <div className=" p-6 rounded-lg shadow-lg flex items-center justify-between border-l-4 border-purple-500">
          <div>
            <p className="text-gray-400 text-sm">Potential Revenue</p>
            <h3 className="text-2xl font-bold">${stats.potentialRevenue.toLocaleString()}</h3>
          </div>
          <div className="p-3  rounded-full text-purple-500">
            <TrendingUp size={24} />
          </div>
        </div>
      </div>

      {/* --- SECTION 2: CHARTS --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CHART 1: Monthly Revenue (Bar Chart) */}
        <div className=" p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Monthly Revenue</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={revenueData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1F2937', borderColor: '#374151', color: '#fff' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#3B82F6" name="Revenue ($)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Order Status Distribution (Pie Chart) */}
        <div className="p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-6">Order Status Distribution</h3>
          <div className="h-80 w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip className="bg-white"/>
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
       <TopProducts/>
    </div>

    </>
  );
};

export default AdminDashboard;