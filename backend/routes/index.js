const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLogin");
const productModel = require("../models/product.models");
const userModel = require("../models/user.models");

router.get("/", function(req,res){
    let error = req.flash("error");
    let success = req.flash("success");
    res.render("index", { error, success, loggedin: false });
})

router.get("/shop", isloggedin, async function(req,res){
    try {
        let products = await productModel.find();
        let success = req.flash("success");
        let error = req.flash("error");
        res.render("shop", { products, success, error });
    } catch (error) {
        console.error("Shop error:", error);
        req.flash("error", "Error loading products");
        res.redirect("/");
    }
})

router.get("/cart", isloggedin, async function(req,res){
    try {
        let user = await userModel
            .findOne({email: req.user.email})
            .populate("cart");

        if(!user) {
            req.flash("error", "User not found. Please login again.");
            return res.redirect("/");
        }
        
        let bill = 0;
        let cartItems = [];
        
        if(user.cart && Array.isArray(user.cart) && user.cart.length > 0) {
            cartItems = user.cart;
            
            const firstItem = user.cart[0];
            if(firstItem && firstItem.price !== undefined) {
                const price = Number(firstItem.price) || 0;
                const discount = Number(firstItem.discount) || 0;
                bill = (price + 20) - discount;
            }
        }
        
        res.render("cart", { user, bill, cartItems });
        
    } catch (error) {
        console.error("Cart error:", error);
        req.flash("error", "Error loading your cart");
        res.redirect("/shop");
    }
})

router.get("/addtocart/:id", isloggedin, async function(req,res){
    try {
        let user = await userModel.findOne({email: req.user.email});
        
        const product = await productModel.findById(req.params.id);
        if(!product) {
            req.flash("error", "Product not found");
            return res.redirect("/shop");
        }
        
        // Check if item is already in cart to avoid duplicates
        if(!user.cart.includes(req.params.id)) {
            user.cart.push(req.params.id);
            await user.save();
            req.flash("success", "Added to cart successfully");
        } else {
            req.flash("info", "Item already in cart");
        }
        
        res.redirect("/shop");
    } catch (error) {
        console.error("Add to cart error:", error);
        req.flash("error", "Error adding item to cart");
        res.redirect("/shop");
    }
})

// BUY NOW ROUTE
router.get("/buynow/:id", isloggedin, async function (req, res) {
    try {
        const product = await productModel.findById(req.params.id);

        if (!product) {
            req.flash("error", "Product not found");
            return res.redirect("/shop");
        }

        res.render("BuyNow", { product });
    } catch (error) {
        console.error("BuyNow error:", error);
        req.flash("error", "Error loading product");
        res.redirect("/shop");
    }
});


router.get("/logout", isloggedin, function(req,res){
    req.logout(function(err) {
        if (err) {
            console.error("Logout error:", err);
            return res.redirect("/shop");
        }
        req.flash("success", "Logged out successfully");
        res.redirect("/");
    });
})

module.exports = router;