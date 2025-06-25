import React, { useState, useEffect } from 'react';
import { Calculator, Download, Share2, TrendingUp, PieChart, DollarSign, Info } from 'lucide-react';

const EMICalculator = () => {
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10.5);
  const [tenure, setTenure] = useState(24);
  const [emiResult, setEmiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const calculateEMI = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/emi`, {
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

  const generateAmortizationSchedule = () => {
    if (!emiResult) return [];
    
    const schedule = [];
    let remainingPrincipal = principal;
    const monthlyRate = rate / 100 / 12;
    
    for (let month = 1; month <= tenure; month++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = emiResult.emi - interestPayment;
      remainingPrincipal -= principalPayment;
      
      schedule.push({
        month,
        emi: emiResult.emi,
        principalPayment,
        interestPayment,
        remainingPrincipal: Math.max(0, remainingPrincipal)
      });
    }
    
    return schedule;
  };

  const amortizationSchedule = generateAmortizationSchedule();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            EMI Calculator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Calculate your Equated Monthly Installment (EMI) for loans and plan your finances better
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Input */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="flex items-center space-x-2 mb-6">
                <Calculator className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-bold text-gray-900">Loan Details</h2>
              </div>

              <div className="space-y-6">
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
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(parseInt(e.target.value) || 0)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
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
                  <input
                    type="number"
                    step="0.1"
                    value={rate}
                    onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
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
                  <input
                    type="number"
                    value={tenure}
                    onChange={(e) => setTenure(parseInt(e.target.value) || 0)}
                    className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 space-y-2">
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Download Report</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors">
                  <Share2 className="w-4 h-4" />
                  <span>Share Results</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 space-y-8">
            {/* EMI Results */}
            {emiResult && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">EMI Calculation Results</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-600 mb-1">
                      {formatAmount(emiResult.emi)}
                    </div>
                    <div className="text-sm text-gray-600">Monthly EMI</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-600 mb-1">
                      {formatAmount(emiResult.totalAmount)}
                    </div>
                    <div className="text-sm text-gray-600">Total Amount</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <PieChart className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-600 mb-1">
                      {formatAmount(emiResult.totalInterest)}
                    </div>
                    <div className="text-sm text-gray-600">Total Interest</div>
                  </div>
                </div>

                {/* Breakdown */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-3">Loan Breakdown</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Principal Amount:</span>
                      <span className="font-medium">{formatAmount(principal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Interest:</span>
                      <span className="font-medium text-orange-600">{formatAmount(emiResult.totalInterest)}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-semibold">Total Payable:</span>
                      <span className="font-bold text-lg">{formatAmount(emiResult.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* EMI Formula */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Info className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">EMI Formula</h3>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-lg font-mono font-semibold text-blue-900 mb-2">
                    EMI = [P × R × (1+R)^N] / [(1+R)^N-1]
                  </div>
                  <div className="text-sm text-blue-700 space-y-1">
                    <div>P = Principal Loan Amount</div>
                    <div>R = Monthly Interest Rate (Annual Rate / 12 / 100)</div>
                    <div>N = Number of Monthly Installments</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Schedule Preview */}
            {amortizationSchedule.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Schedule (First 12 Months)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-3 font-medium text-gray-900">Month</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-900">EMI</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-900">Principal</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-900">Interest</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-900">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.slice(0, 12).map((payment) => (
                        <tr key={payment.month} className="border-b border-gray-100">
                          <td className="py-2 px-3">{payment.month}</td>
                          <td className="text-right py-2 px-3">{formatAmount(payment.emi)}</td>
                          <td className="text-right py-2 px-3 text-green-600">{formatAmount(payment.principalPayment)}</td>
                          <td className="text-right py-2 px-3 text-orange-600">{formatAmount(payment.interestPayment)}</td>
                          <td className="text-right py-2 px-3">{formatAmount(payment.remainingPrincipal)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {amortizationSchedule.length > 12 && (
                  <div className="text-center mt-4">
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                      View Full Schedule ({amortizationSchedule.length} months)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;