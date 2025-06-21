import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['personal-loan', 'home-loan', 'car-loan', 'business-loan', 'credit-card', 'gold-loan']
  },
  interestRate: {
    type: Number,
    required: true,
    min: 0,
    max: 50
  },
  maxAmount: {
    type: Number,
    required: true,
    min: 0
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    type: String
  }],
  processingFee: {
    type: String,
    default: 'Varies'
  },
  minAmount: {
    type: Number,
    default: 10000
  },
  tenure: {
    min: { type: Number, default: 1 },
    max: { type: Number, default: 60 }
  },
  eligibility: [{
    type: String
  }],
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 4
  }
}, {
  timestamps: true
});

export default mongoose.model('Product', productSchema);