import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CreditCard, Home, Car, Briefcase, Coins, Calculator,
  TrendingUp, Shield, Clock, Award, Users, CheckCircle,
  ArrowRight, Star, Building2
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import EMICalculatorWidget from '../components/EMICalculatorWidget';

const Homepage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
      if (response.ok) {
        const products = await response.json();
        setFeaturedProducts(products.slice(0, 6)); // Show top 6 products
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = (productId) => {
    // In a real app, this would redirect to application form
    alert(`Redirecting to application form for product: ${productId}`);
  };

  const loanCategories = [
    {
      name: 'Personal Loan',
      path: '/products/personal-loan',
      icon: CreditCard,
      description: 'Quick approval, no collateral required',
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600'
    },
    {
      name: 'Home Loan',
      path: '/products/home-loan',
      icon: Home,
      description: 'Low interest rates, tax benefits',
      color: 'bg-green-500',
      hoverColor: 'group-hover:bg-green-600'
    },
    {
      name: 'Car Loan',
      path: '/products/car-loan',
      icon: Car,
      description: 'Easy EMI, quick processing',
      color: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-600'
    },
    {
      name: 'Business Loan',
      path: '/products/business-loan',
      icon: Briefcase,
      description: 'Grow your business with us',
      color: 'bg-orange-500',
      hoverColor: 'group-hover:bg-orange-600'
    },
    {
      name: 'Credit Card',
      path: '/products/credit-card',
      icon: CreditCard,
      description: 'Rewards, cashback, offers',
      color: 'bg-pink-500',
      hoverColor: 'group-hover:bg-pink-600'
    },
    {
      name: 'Gold Loan',
      path: '/products/gold-loan',
      icon: Coins,
      description: 'Instant approval against gold',
      color: 'bg-yellow-500',
      hoverColor: 'group-hover:bg-yellow-600'
    }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: 'Secure & Trusted',
      description: 'Bank-grade security with SSL encryption'
    },
    {
      icon: Clock,
      title: 'Quick Processing',
      description: 'Get approved in minutes, not days'
    },
    {
      icon: Award,
      title: 'Best Rates',
      description: 'Compare rates from 50+ lenders'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer support team'
    }
  ];

  return (
    <div className="space-y-8" style={{ background: '#F5F7FA' }}>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0A3D62] via-[#1B1464] to-[#3C40C6] text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Your Financial
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600"> Dreams</span>
                <br />Made Reality
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Compare and apply for loans, credit cards, and financial products from India's top banks and NBFCs. Get the best rates with instant approval.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  to="/products"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/emi-calculator"
                  className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Calculator className="w-5 h-5" />
                  <span>EMI Calculator</span>
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <EMICalculatorWidget />
            </div>
          </div>
        </div>
      </section>

      {/* Loan Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Perfect Loan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From personal loans to home loans, find the right financial solution for your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {loanCategories.map((category) => {
              const Icon = category.icon;
              return (
                <Link
                  key={category.path}
                  to={category.path}
                  className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-gray-100 hover:border-orange-200"
                >
                  <div className={`w-12 h-12 ${category.color} ${category.hoverColor} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-center text-orange-600 font-medium group-hover:text-orange-700">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Handpicked products with the best rates and features
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading featured products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onApply={handleApply}
                />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16" style={{ background: '#F5F7FA' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose LexoraCapital?
            </h2>
            <p className="text-xl text-gray-600">
              Your trusted partner for all financial needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUs.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-[#0A3D62] via-[#1B1464] to-[#3C40C6] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">50+</div>
              <div className="text-blue-200">Partner Banks & NBFCs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">1M+</div>
              <div className="text-blue-200">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">₹1000Cr+</div>
              <div className="text-blue-200">Loans Disbursed</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400 mb-2">4.8★</div>
              <div className="text-blue-200">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;