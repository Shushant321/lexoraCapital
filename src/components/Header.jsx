import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from '../assests/logooo.jpg'; // Adjust the path as necessary
import {
  Menu,
  X,
  Calculator,
  CreditCard,
  Home,
  Building2,
  Car,
  Coins,
  Briefcase,
  MoreVertical,
  User,
  LogOut
} from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Navigation items without login/register
  const navigationItems = [
    { name: "Home", path: "/", icon: Home },
    { name: "Personal Loan", path: "/products/personal-loan", icon: CreditCard },
    { name: "Home Loan", path: "/products/home-loan", icon: Building2 },
    { name: "Car Loan", path: "/products/car-loan", icon: Car },
    { name: "Business Loan", path: "/products/business-loan", icon: Briefcase },
    { name: "Balance Transfer", path: "/products/credit-card", icon: CreditCard },
    { name: "Loan Against Property", path: "/products/gold-loan", icon: Coins },
    { name: "EMI Calculator", path: "/emi-calculator", icon: Calculator },
  ];

  // Dropdown close on outside click
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest(".user-menu-dropdown")) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex row: logo left, nav center, user/menu right */}
        <div className="flex items-center justify-between h-16 w-full">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src={logo}
              alt="Lexora Logo"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="text-xl font-bold text-[#002147e3] ">
              LexoraCapital
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems.slice(0, 6).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? "bg-orange-50 text-orange-600"
                      : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden lg:flex items-center space-x-4">
            <Link
              to="/emi-calculator"
              className="flex items-center space-x-1 px-4 py-2 text-sm font-medium text-blue-900 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors"
            >
              <Calculator className="w-4 h-4" />
              <span>EMI Calculator</span>
            </Link>
          </div>

          {/* User Menu (Three Dots) */}
          <div className="relative user-menu-dropdown hidden lg:block">
            <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="User menu"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-900" />
                </div>
              ) : (
                <MoreVertical className="w-6 h-6" />
              )}
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                <div className="py-1">
                  {user ? (
                    <>
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        Hi, {user.name}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>Login</span>
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-blue-900 hover:bg-blue-50 hover:text-blue-800"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <span>Register</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile menu button and user icon together, right-aligned */}
          <div className="flex items-center lg:hidden space-x-2">
            {/* User icon for mobile (optional, can remove if not needed) */}
            {/* <button
              onClick={() => setIsUserMenuOpen((prev) => !prev)}
              className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
              aria-label="User menu"
            >
              {user ? (
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-900" />
                </div>
              ) : (
                <MoreVertical className="w-6 h-6" />
              )}
            </button> */}
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200">
            <div className="space-y-2">
              {/* Main navigation items */}
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.path
                        ? "bg-orange-50 text-orange-600"
                        : "text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                    }`}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    <span>{item.name}</span>
                  </Link>
                );
              })}

              {/* Mobile Auth Links - Integrated with other options */}
              {user ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors w-full text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors text-gray-700 hover:text-orange-600 hover:bg-orange-50"
                  >
                    <span>Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
