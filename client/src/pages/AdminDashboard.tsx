import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Package, ShoppingBag, DollarSign, BarChart2, Settings, LogOut, Plus
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gray-800 text-white rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-yellow-400 flex items-center justify-center">
            <span className="text-gray-800 text-xl font-bold">{user?.username.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-bold">{user?.username}</p>
            <p className="text-gray-400 text-sm">Administrator</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 bg-gray-700 p-3 rounded-lg">
            <BarChart2 className="h-5 w-5" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <Package className="h-5 w-5" />
            <span>Products</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <ShoppingBag className="h-5 w-5" />
            <span>Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <Users className="h-5 w-5" />
            <span>Customers</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <DollarSign className="h-5 w-5" />
            <span>Sales</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-gray-700 p-3 rounded-lg w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {user?.username}!</h1>
          <p className="text-gray-600">Here's what's happening with your store today.</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Total Sales</p>
                <h3 className="text-2xl font-bold">$24,780</h3>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <p className="text-green-600 text-sm mt-2">↑ 12% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Orders</p>
                <h3 className="text-2xl font-bold">578</h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <p className="text-blue-600 text-sm mt-2">↑ 5% from last month</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Products</p>
                <h3 className="text-2xl font-bold">1,423</h3>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <p className="text-purple-600 text-sm mt-2">↑ 8 new today</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 mb-1">Customers</p>
                <h3 className="text-2xl font-bold">892</h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <p className="text-yellow-600 text-sm mt-2">↑ 3% from last month</p>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-800">View all</button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: '#ORD-001', customer: 'John Doe', date: '2025-04-01', amount: '$120.50', status: 'Delivered' },
                  { id: '#ORD-002', customer: 'Jane Smith', date: '2025-04-01', amount: '$75.20', status: 'Processing' },
                  { id: '#ORD-003', customer: 'Robert Johnson', date: '2025-03-31', amount: '$246.00', status: 'Shipped' },
                  { id: '#ORD-004', customer: 'Emily Davis', date: '2025-03-30', amount: '$89.99', status: 'Delivered' },
                  { id: '#ORD-005', customer: 'Michael Brown', date: '2025-03-30', amount: '$156.75', status: 'Processing' },
                ].map((order, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Add New Product Button */}
        <div className="fixed bottom-8 right-8">
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg flex items-center justify-center">
            <Plus className="h-6 w-6" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;