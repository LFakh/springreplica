import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, Heart, User, CreditCard, MapPin, LogOut, Package, Truck, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const UserDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 text-xl font-bold">{user?.username.charAt(0).toUpperCase()}</span>
          </div>
          <div>
            <p className="font-bold">{user?.username}</p>
            <p className="text-gray-500 text-sm">Customer</p>
          </div>
        </div>
        
        <nav className="space-y-2">
          <a href="#" className="flex items-center space-x-3 bg-blue-50 text-blue-700 p-3 rounded-lg">
            <User className="h-5 w-5" />
            <span>My Account</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
            <ShoppingBag className="h-5 w-5" />
            <span>My Orders</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
            <CreditCard className="h-5 w-5" />
            <span>Payment Methods</span>
          </a>
          <a href="#" className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg">
            <MapPin className="h-5 w-5" />
            <span>Addresses</span>
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 hover:bg-gray-100 p-3 rounded-lg w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold mb-2">Welcome, {user?.username}!</h1>
          <p className="text-gray-600">Track your orders, manage your account, and discover new products.</p>
        </div>
        
        {/* Order Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <Package className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">To be shipped</h3>
                <p className="text-2xl font-bold">2</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Truck className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <h3 className="font-semibold">In transit</h3>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-full">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Delivered</h3>
                <p className="text-2xl font-bold">5</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-800">View all</button>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                id: '#ORD-001', 
                date: '2025-04-01', 
                status: 'Delivered', 
                items: [
                  { name: 'Wireless Headphones', price: '$79.99', image: 'https://source.unsplash.com/random/80x80?headphones' }
                ],
                total: '$79.99'
              },
              { 
                id: '#ORD-002', 
                date: '2025-03-28', 
                status: 'In Transit', 
                items: [
                  { name: 'Smart Watch', price: '$129.99', image: 'https://source.unsplash.com/random/80x80?watch' },
                  { name: 'Phone Case', price: '$19.99', image: 'https://source.unsplash.com/random/80x80?case' }
                ],
                total: '$149.98'
              },
              { 
                id: '#ORD-003', 
                date: '2025-03-25', 
                status: 'Processing', 
                items: [
                  { name: 'Bluetooth Speaker', price: '$59.99', image: 'https://source.unsplash.com/random/80x80?speaker' }
                ],
                total: '$59.99'
              },
            ].map((order, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-500">{order.date}</p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="space-y-3">
                  {order.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center space-x-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                  <p className="text-gray-500">Total:</p>
                  <p className="font-bold">{order.total}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recommended For You</h2>
            <button className="text-blue-600 hover:text-blue-800">View all</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src={`https://source.unsplash.com/random/300x200?electronics=${item}`} 
                  alt="Product" 
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">Recommended Product {item}</h3>
                  <p className="text-gray-500 text-sm mb-2">Based on your purchase history</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">${(49.99 * item).toFixed(2)}</span>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-1 px-3 rounded">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;