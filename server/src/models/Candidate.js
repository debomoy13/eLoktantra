const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    party: { type: String, required: true },
    constituency: { type: String, required: true },
    electionId: { type: String },
    education: { type: String },
    criminalCases: { type: Number, default: 0 },
    assets: { type: Number, default: 0 },
    liabilities: { type: Number, default: 0 },
    logo: { type: String },
    symbol: { type: String }, // For VVPAT/UI display
    promises: [{
        title: String,
        progress: Number,
        status: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
