const Cart = require('../models/cart');

exports.postShoppingCart = async (req, res) => {
    try {
        const {  name, brand, price, details, category, gender, available } = req.body;

        // Vérifier que les champs obligatoires sont fournis
        if ( !name || !brand || !price || !details || !category || !gender || !available) {
            return res.status(400).json({ message: "Données manquantes" });
        }

        if (!Array.isArray(available) || available.length === 0) {
            return res.status(400).json({ message: "Aucune variante de produit disponible" });
        }

        // Vérifier si l'article existe déjà dans le panier
        // let cartItem = await Cart.findOne({ _id });
        
        // if (cartItem) {
        //     return res.status(400).json({ message: "Article déjà dans le panier" });
        // }

        // Ajouter un nouvel article au panier
        cartItem = new Cart({  name, brand, price, details, category, gender, available });

        await cartItem.save();

        res.status(201).json({ message: "Article ajouté au panier", cartItem });
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier:", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
};

exports.getShoppingCart=async(req,res)=>{
    try {
        const cartItems= await Cart.find()
        if (!cartItems.length){
            return res.status(404).json({message:'not found'})
        }
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(500).json({message:'server error',error})
    }
}
exports.deleteShoppingCart = async (req, res) => {
    try {
        const { id } = req.params; // Récupérer l'ID depuis l'URL
        const deletedItem = await Cart.findByIdAndDelete(id);

        if (!deletedItem) {
            return res.status(404).json({ message: "Article non trouvé dans le panier." });
        }

        res.status(200).json({ message: "Article supprimé avec succès.", deletedItem });
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur lors de la suppression.", error });
    }
};
