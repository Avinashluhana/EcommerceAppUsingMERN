const express = require("express");
const {
  deleteOrder,
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  UpdateOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizedRole } = require("../middleware/auth");

const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenticatedUser, authorizedRole("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticatedUser, authorizedRole("admin"), UpdateOrder)
  .delete(isAuthenticatedUser, authorizedRole("admin"), deleteOrder);

module.exports = router;
