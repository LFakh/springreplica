import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Package, Truck, CreditCard, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // State to store fetched images
  const [images, setImages] = useState<string[]>([]);

  // Fetch images from Unsplash API
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const accessKey = 'xu3Xmb6N9t-TcB_Bz-Ms8opBygIYW5RQt20Nfj7O1Ws'; // Replace with your Unsplash API key
        const promises = [1, 2, 3, 4].map(async (item) => {
          const response = await fetch(
            `https://api.unsplash.com/photos/random?query=product&client_id=${accessKey}`
          );
          const data = await response.json();
          return data.urls.small; // Use the small-sized image URL
        });

        const fetchedImages = await Promise.all(promises);
        setImages(fetchedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-xl p-10 shadow-lg">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to AmazonReplica</h1>
          <p className="text-xl mb-8">Your one-stop shop for everything you need</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <button 
                onClick={() => navigate(user.role === 'ADMIN' ? '/admin' : '/dashboard')}
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Go to Dashboard
              </button>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Log In
                </button>
                <button 
                  onClick={() => navigate('/signup')}
                  className="bg-white hover:bg-gray-100 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto">
        <div className="flex">
          <input 
            type="text" 
            placeholder="Search for products..." 
            className="flex-grow p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-yellow-400 hover:bg-yellow-500 p-4 rounded-r-lg">
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <Package className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Millions of Products</h3>
          <p className="text-gray-600">Find exactly what you're looking for from our vast selection.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <Truck className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
          <p className="text-gray-600">Get your orders delivered quickly to your doorstep.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <CreditCard className="h-8 w-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Secure Payments</h3>
          <p className="text-gray-600">Shop with confidence with our secure payment options.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="inline-block p-3 bg-red-100 rounded-full mb-4">
            <Users className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
          <p className="text-gray-600">Our customer service team is always here to help you.</p>
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img 
                src={image} 
                alt={`Product ${index + 1}`} 
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">Product {index + 1}</h3>
                <p className="text-gray-600 mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">${(19.99 * (index + 1)).toFixed(2)}</span>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-sm py-1 px-3 rounded">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
