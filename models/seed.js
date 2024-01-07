const mongoose = require('mongoose');

const SeedSchema = new mongoose.Schema({
    Seed_RepDate: Number,
    Seed_Year: Number,
    Seeds_YearWeek: Number,
    Seed_Varity: String, 
    Seed_RDCSD: String,
    Seed_Stock2Sale: Number,
    Seed_Season: Number,
    Seed_Crop_Year: String,
})

module.exports = mongoose.model('Seed', SeedSchema)