import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, PieChart, DollarSign } from 'lucide-react';

const EMICalculatorWidget = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);
  const [emiResult, setEmiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateEMI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/emi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ principal, rate, tenure }),
      });

      if (response.ok) {
        const result = await response.json();
        setEmiResult(result);
      }
    } catch (error) {
      console.error('Error calculating EMI:', error);
      // Fallback calculation
      const P = principal;
      const R = rate / 100 / 12;
      const N = tenure;
      const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const totalAmount = emi * N;
      const totalInterest = totalAmount - P;

      setEmiResult({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal: P,
        rate,
        tenure: N
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Calculator className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-900">EMI Calculator</h3>
      </div>

      <div className="space-y-6">
        {/* Input Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Amount: {formatAmount(principal)}
            </label>
            <input
              type="range"
              min="10000"
              max="10000000"
              step="10000"
              value={principal}
              onChange={(e) => setPrincipal(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>₹10K</span>
              <span>₹1Cr</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Interest Rate: {rate}% per annum
            </label>
            <input
              type="range"
              min="1"
              max="30"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Loan Tenure: {tenure} months ({Math.round(tenure / 12)} years)
            </label>
            <input
              type="range"
              min="6"
              max="360"
              step="6"
              value={tenure}
              onChange={(e) => setTenure(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-orange"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>6 months</span>
              <span>30 years</span>
            </div>
          </div>
        </div>

        {/* Results */}
        {emiResult && (
          <div className="bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <DollarSign className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  {formatAmount(emiResult.emi)}
                </div>
                <div className="text-sm text-gray-600">Monthly EMI</div>
              </div>
              <div className="text-center">
                <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  {formatAmount(emiResult.totalAmount)}
                </div>
                <div className="text-sm text-gray-600">Total Amount</div>
              </div>
              <div className="text-center">
                <PieChart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  {formatAmount(emiResult.totalInterest)}
                </div>
                <div className="text-sm text-gray-600">Total Interest</div>
              </div>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EMICalculatorWidget;