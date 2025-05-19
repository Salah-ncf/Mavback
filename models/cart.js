const mongoose = require('mongoose');


const itemSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    color: { type: String },
    quantity: { type: Number,default:1 },
    path: { type: String, required: true }
});


const cartSchema = new mongoose.Schema({
    
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0.01 },
    details: { type: String, required: true, trim: true },
    category: { type: String, enum: ['Fashion', 'Beauty', 'Fragrances'], required: true, trim: true },
    gender: { type: String, enum: ['men', 'women', 'both'], required: true, trim: true },
    available: { type: [itemSchema], default: [], required: true },
    createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
