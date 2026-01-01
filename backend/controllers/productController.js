
import mongoose from 'mongoose'
import products from '../models/productModel.js'
import { json } from 'express'
export const getProduct = async (req, res) => {
    try {
        const { category ,_id } = req.query
        let product = await products.find()

        console.log(_id);
        if (_id) {
            const product = await products.findById({_id})
            const relatedProducts = await products.find({
                _id:{$ne: product._id},
                category:product.category
            })
            console.log(relatedProducts);
            
            res.status(200).json({message:"succesfull get call" , selectedProduct:product ,relatedProducts:relatedProducts })
            return
        }
        
        if (category) {
            product = await products.find({ category })
        }

        if (!product) {
            return console.log("no product right now");
        }
        res.status(200).json({ message: "got the product from the backend", product:product , success:true })
    } catch (err) {
        console.log("server Error while getting");
        res.json({ message: "server error while getting products" , success:false})
    }
}

export const postProduct = async (req, res) => {
    try {
        const productImage = req.files.map(m => ({
            filename: m.filename,
            path: m.path
        }))
        const { productName, productDescription, price, category, stock } = req.body
        console.log(req.body);
        if (stock < 1) {
            return res.json({ message: "Stock can't be lower then 1 " })
        }
        const product = new products({ productImage: productImage, productName, productDescription, price, category, stock })
        await product.save()


        res.status(200).json({ message: "product uploaded", product, success: true })

    } catch (err) {
        if (err.name === "ValidationError") {

            const errors = Object.values(err.errors).map(e => e.message);
            return res.status(400).json({ errors, success: false });
        }

        res.status(500).json({ error: "Server error", success: false });
    }
}

export const delProduct = async (req, res) => {
    try {
        const { _id } = req.params

        if (!products.findById({ _id })) {
            console.log("can't find the product");
            res.status(404).json({ message: "can't find the product to delete", success: false })
        }
        await products.findByIdAndDelete({ _id })

        res.status(200).json({ message: "Product deleted successfully", success: true })

    } catch (err) {
        console.log("server error in deleting product", err);
        res.status(500).json({ message: "server error occured", err })

    }
}

export const updateProduct = async (req, res) => {
    try {
        const { _id } = req.params
        const { productName, productDescription, price, category, stock } = req.body
        console.log(req.body);
        


        const product = await products.findById(_id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        

        if (productName) product.productName = productName;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;
        if (productDescription) product.productDescription = productDescription;
 if (req.files && req.files.length > 0) {
            const productImage = req.files.map(m => ({
                filename: m.filename,
                path: m.path
            }))
            product.productImage = productImage;
        }

       

        await product.save();

        res.status(200).json({ message: "updated product successfully", success: true, product: product })

    } catch (err) {

        console.log("server error in updating product", err);
        res.status(500).json({ message: "server error occured", err })
    }
}
