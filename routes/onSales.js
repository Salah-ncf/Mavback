const express = require("express");
const router = express.Router();
const { Product } = require("../models/product"); //

// 📥 Récupérer les produits en promo
router.get("/", async (req, res) => {
  try {
    const products = await Product.find({ isOnSale: true }); 
    console.log("Produits en promo récupérés :", products);
    res.json(products);
  } catch (err) {
    
    res.status(500).json({ message: err.message });
  }
});

// ➕ Ajouter un produit (utile avec Postman ou pour tester)
router.post("/", async (req, res) => {
  const {
    name,
    brand,
    price,
    details,
    category,
    gender,
    available,
    isOnSale,
    amount,
  } = req.body;

  const newProduct = new Product({
    name,
    brand,
    price,
    details,
    category,
    gender,
    available,
    isOnSale,
    amount,
    idMagazine: "test-mag", // facultatif si requis dans ton modèle
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
