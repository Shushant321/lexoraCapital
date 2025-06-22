import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Get all products with optional filtering
router.get('/products', async (req, res) => {
  try {
    const { type, company, minAmount, maxAmount } = req.query;
    let query = {};

    if (type) query.type = type;
    if (company) query.company = new RegExp(company, 'i');
    if (minAmount) query.minAmount = { $gte: parseInt(minAmount) };
    if (maxAmount) query.maxAmount = { $lte: parseInt(maxAmount) };

    const products = await Product.find(query).sort({ rating: -1, interestRate: 1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get product by ID
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Calculate EMI
router.post('/emi', (req, res) => {
  try {
    const { principal, rate, tenure } = req.body;

    if (!principal || !rate || !tenure) {
      return res.status(400).json({ message: 'Principal, rate, and tenure are required' });
    }

    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100 / 12; // Monthly interest rate
    const N = parseFloat(tenure); // Number of months

    if (P <= 0 || R < 0 || N <= 0) {
      return res.status(400).json({ message: 'Invalid input values' });
    }

    // EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
    const emi = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    const totalAmount = emi * N;
    const totalInterest = totalAmount - P;

    res.json({
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: P,
      rate: parseFloat(rate),
      tenure: N
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Seed data endpoint (for development)
router.post('/seed', async (req, res) => {
  try {
    await Product.deleteMany({});
    
    const sampleProducts = [
      {
        name: 'Personal Loan Express',
        type: 'personal-loan',
        interestRate: 10.5,
        maxAmount: 2000000,
        company: 'HDFC Bank',
        features: ['Quick approval', 'No collateral required', 'Flexible tenure'],
        processingFee: '1.5% + GST',
        minAmount: 50000,
        tenure: { min: 12, max: 60 },
        eligibility: ['Salaried individuals', 'Age 21-65 years', 'Min salary ₹25,000'],
        rating: 4.5
      },
      {
        name: 'Home Loan Prime',
        type: 'home-loan',
        interestRate: 8.75,
        maxAmount: 10000000,
        company: 'SBI',
        features: ['Low interest rates', 'Long tenure', 'Tax benefits'],
        processingFee: '0.35% + GST',
        minAmount: 500000,
        tenure: { min: 60, max: 360 },
        eligibility: ['Property purchase/construction', 'Age 18-70 years'],
        rating: 4.8
      },
      {
        name: 'Car Loan Accelerate',
        type: 'car-loan',
        interestRate: 9.25,
        maxAmount: 1500000,
        company: 'ICICI Bank',
        features: ['90% financing', 'Quick processing', 'Flexible EMI'],
        processingFee: '2.5% + GST',
        minAmount: 100000,
        tenure: { min: 12, max: 84 },
        eligibility: ['New/Used car purchase', 'Age 21-65 years'],
        rating: 4.3
      },
      {
        name: 'Business Growth Loan',
        type: 'business-loan',
        interestRate: 12.5,
        maxAmount: 5000000,
        company: 'Axis Bank',
        features: ['Collateral free', 'Quick disbursement', 'Flexible repayment'],
        processingFee: '2% + GST',
        minAmount: 200000,
        tenure: { min: 12, max: 72 },
        eligibility: ['Business vintage 2+ years', 'ITR filing'],
        rating: 4.2
      },
      {
        name: 'Premium Balance Transfer',
        type: 'credit-card',
        interestRate: 3.5,
        maxAmount: 500000,
        company: 'HDFC Bank',
        features: ['Rewards program', 'Airport lounge access', 'Cashback offers'],
        processingFee: '₹1,500 + GST',
        minAmount: 25000,
        tenure: { min: 1, max: 1 },
        eligibility: ['Min income ₹3 lakhs', 'Good credit score'],
        rating: 4.6
      },
      {
        name: 'Loan Against Property Instant',
        type: 'gold-loan',
        interestRate: 11.5,
        maxAmount: 1000000,
        company: 'Manappuram Finance',
        features: ['Instant approval', 'No income proof', 'Competitive rates'],
        processingFee: '1% + GST',
        minAmount: 10000,
        tenure: { min: 3, max: 36 },
        eligibility: ['Gold ornaments as collateral', 'Age 18+ years'],
        rating: 4.4
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: 'Database seeded successfully', count: sampleProducts.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;