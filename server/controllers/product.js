import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProduct = async (req, res) => {
  const { productName, description, price } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        product_name: productName,
        product_description: description,
        price: parseFloat(price)
      }
    })
    res.json(product);
  } catch (err) {
    res.status(400).json("Error creating product: " + err);
  }
}

export const getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (err) {
    res.status(400).json("Error fetching products: " + err);
  }  
}

export const updateProduct = async (req, res) => {
  const { productId, productName, description, price } = req.body;
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        product_id: Number(productId)
      },
      data: {
        product_name: productName,
        product_description: description,
        price: parseFloat(price)
      }
    }) 
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json("Error updating product: " + err);
  }
}

export const deleteProduct = async (req, res) => {
  const productId = req.params.productId;
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        product_id: Number(productId)
      }
    })
    res.json(deletedProduct);
  } catch (err) {
    res.status(400).json("Error deleting product: " + err);
  }
}