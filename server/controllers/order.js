import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createOrder = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const order = await prisma.order.create({
      data: {
        user_id: Number(userId),
        product_id: Number(productId),
        quantity: Number(quantity)
      }
    })
    res.json(order);
  } catch (err) {
    res.status(400).json("Error creating order: " + err);
  }
}

export const getOrders = async (req, res) => {
  try {
    // Raw MySQL query to join order and product tables, and populate necessary data including the total cost
    const orders = await prisma.$queryRaw`
      SELECT o.user_id, p.product_name, p.price, o.quantity, p.price * o.quantity as total_cost
      FROM 
      order o 
      JOIN
      product p ON o.product_id = p.product_id;
    `;
    res.json(orders);
  } catch (err) {
    res.status(400).json("Error fetching orders: " + err);
  }  
}

export const updateOrder = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        AND: [
          { product_id: Number(productId) },
          { user_id: Number(userId) }
        ]
      },
      data: {
        user_id: Number(userId),
        product_id: Number(productId),
        quantity: Number(quantity)
      }
    }) 
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json("Error updating order: " + err);
  }
}

export const deleteOrder = async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  try {
    const deletedOrder = await prisma.order.delete({
      where: {
        AND: [
          { product_id: Number(productId) },
          { user_id: Number(userId) }
        ]
      }
    })
    res.json(deletedOrder);
  } catch (err) {
    res.status(400).json("Error deleting order: " + err);
  }
}