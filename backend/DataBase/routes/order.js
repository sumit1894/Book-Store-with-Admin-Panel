import { Router } from "express";
const router = Router();
import { authenticateToken } from "./userAuth.js";
import User from "../model/userSchema.js";
import Order from "../model/orderSchema.js"

//todo place order
// routes/order.js

router.post("/place-order", authenticateToken, async (req, res) => {
  try {
    const userId = req.headers.id;
    const { order } = req.body; // array of book IDs

    if (!userId) {
      return res.status(400).json({ message: "User ID missing" });
    }

    if (!order || order.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    for (const bookId of order) {
      const newOrder = new Order({
        user: userId,
        book: bookId,
      });

      const savedOrder = await newOrder.save();

      await User.findByIdAndUpdate(userId, {
        $push: { orders: savedOrder._id },
      });

      await User.findByIdAndUpdate(userId, {
        $pull: { cart: bookId },
      });
    }

    return res.json({
      status: "success",
      message: "Order Placed Successfully",
    });

  } catch (error) {
    console.log("PLACE ORDER ERROR:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
});

//todo order history of perticular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "orders",
      populate: { path: "book" },
    });
    const ordersData = userData.orders.reverse();
    return res.json({
      status: "Success",
      data: ordersData,
    })
  } catch (error) {
    res.status(500).json({ messages: "Internal server error" })
  }
})

//todo get all orders---admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
  try {
    const userData = await Order.find()
      .populate({
        path: "book",
        select: "title author price desc"
      })
      .populate({
        path: "user",
        select: "username email address"
      })
      .sort({ createdAt: -1 });

    return res.json({
      status: "Success",
      data: userData,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
}
);

//todo update order-admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status })
    return res.json({
      status: "Success",
      messages: "Status Updated Successfully",
    });
  } catch (error) {
    res.status(500).json({ messages: "Internal server error" })
  }
})

export default router;