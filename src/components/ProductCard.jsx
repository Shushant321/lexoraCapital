import React from 'react';
import { Star, ArrowRight, Building2, Percent, Banknote, Clock } from 'lucide-react';

const ProductCard = ({ product, onApply }) => {
  const formatAmount = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const getProductTypeLabel = (type) => {
    const typeLabels = {
      'personal-loan': 'Personal Loan',
      'home-loan': 'Home Loan',
      'car-loan': 'Car Loan',
      'business-loan': 'Business Loan',
      'credit-card': 'Balance Transfer',
      'gold-loan': 'Loan Against Property'
    };
    return typeLabels[type] || type;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">{product.company}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-gray-700">{product.rating}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
          {getProductTypeLabel(product.type)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <Percent className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-orange-600">{product.interestRate}%</div>
            <div className="text-xs text-gray-600">Interest Rate</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <Banknote className="w-5 h-5 text-green-600 mx-auto mb-1" />
            <div className="text-lg font-bold text-green-600">{formatAmount(product.maxAmount)}</div>
            <div className="text-xs text-gray-600">Max Amount</div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Min Amount:</span>
            <span className="font-medium">{formatAmount(product.minAmount)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Processing Fee:</span>
            <span className="font-medium">{product.processingFee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Tenure:</span>
            <span className="font-medium flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              {product.tenure.min}-{product.tenure.max} months
            </span>
          </div>
        </div>

        {/* Features */}
        {product.features && product.features.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-gray-900">Key Features:</h4>
            <ul className="space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-center">
                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={() => onApply(product._id)}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-200 flex items-center justify-center space-x-2 group-hover:scale-105"
        >
          <span>Apply Now</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;