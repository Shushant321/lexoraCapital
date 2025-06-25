import React from 'react';
import { Link } from 'react-router-dom';
import { CreditCard, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#002147] via-[#002147] to-[#002147] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">LexoraCapital</span>
            </Link>
            <p className="text-blue-200 text-sm leading-relaxed">
              Your trusted partner for all financial needs. Compare and apply for loans, Balance Transfers, and financial products from top banks and NBFCs.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer" />
              <Twitter className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer" />
              <Instagram className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer" />
              <Linkedin className="w-5 h-5 text-blue-200 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Loan Products */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Loan Products</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products/personal-loan" className="text-blue-200 hover:text-white transition-colors">Personal Loan</Link></li>
              <li><Link to="/products/home-loan" className="text-blue-200 hover:text-white transition-colors">Home Loan</Link></li>
              <li><Link to="/products/car-loan" className="text-blue-200 hover:text-white transition-colors">Car Loan</Link></li>
              <li><Link to="/products/business-loan" className="text-blue-200 hover:text-white transition-colors">Business Loan</Link></li>
              <li><Link to="/products/gold-loan" className="text-blue-200 hover:text-white transition-colors">Loan Against Property</Link></li>
              <li><Link to="/products/credit-card" className="text-blue-200 hover:text-white transition-colors">Balance Transfers</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/emi-calculator" className="text-blue-200 hover:text-white transition-colors">EMI Calculator</Link></li>
              <li><Link to="/blog" className="text-blue-200 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/about" className="text-blue-200 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-blue-200 hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link to="/privacy" className="text-blue-200 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-blue-200 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-orange-500" />
                <span className="text-blue-200">+91 9958588988 </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-orange-500" />
                <span className="text-blue-200">info@LexoraCapital.com</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-blue-200">
                  B 60 Sec 57 <br />
                  Noida
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-8 pt-8 text-center">
          <p className="text-blue-200 text-sm">
            © {currentYear} LexoraCapital. All rights reserved. | Designed with care for your financial journey.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;