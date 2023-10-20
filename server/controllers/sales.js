import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const generateDailyReport = async (req, res) => {
  try {
    const dailySales = await prisma.$queryRaw`
      SELECT SUM(o.quantity * p.price) AS totalSales
      FROM 'Order' o
      JOIN 'Product' p ON o.product_id = p.product_id
      WHERE o.date = current_date
    `;
    
    res.json(dailySales);
  } catch (err) {
    res.status(400).json("Error generating report: " + err);
  }
}

export const generateWeeklyReport = async (req, res) => {
  try {
    const weeklySales = await prisma.$queryRaw`
      SELECT SUM(o.quantity * p.price) AS totalSales
      FROM 'Order' o
      JOIN 'Product' p ON o.product_id = p.product_id
      WHERE o.date BETWEEN (NOW() - INTERVAL 7 DAY) AND NOW()
    `;
    
    res.json(weeklySales);
  } catch (err) {
    res.status(400).json("Error generating report: " + err);
  }
}

export const generateMonthlyReport = async (req, res) => {
  const month = req.query.month;
  const year = req.query.year;

  // Based on the month and year provided as query parameters, we can find the total sales for that particular month
  try {
    const monthlySales = await prisma.$queryRaw`
      SELECT SUM(o.quantity * p.price) AS totalSales
      FROM 'Order' o
      JOIN 'Product' p ON o.product_id = p.product_id
      WHERE 
      MONTH(o.date)=${month} AND YEAR(o.date)=${year}
    `;
    
    res.json(monthlySales);
  } catch (err) {
    res.status(400).json("Error generating report: " + err);
  }
}

export const findTopSellingProducts = async (req, res) => {
  // Raw MySQL query to find top three highest selling products in terms of quantity
  try {
    const topSellingProducts = await prisma.$queryRaw`
      SELECT p.product_id, p.product_name, SUM(o.quantity) AS totalQuantity
      FROM product p
      JOIN order o ON p.product_id = o.product_id
      GROUP BY p.Product_id, p.product_name
      ORDER BY totalQuantity DESC
      LIMIT 3;
    `;
    
    res.json(topSellingProducts);
  } catch (err) {
    res.status(400).json("Error finding products: " + err);
  }
}