const express = require('express');
const { addOrderItems, getMyOrders, getOrderById, getOrders, updateOrderToDelivered } = require('../controllers/orderController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.use(protect);

router.route('/')
  .post(addOrderItems)
  .get(authorize('admin'), getOrders);

router.route('/myorders').get(getMyOrders);
router.route('/:id').get(getOrderById);
router.route('/:id/deliver').put(authorize('admin'), updateOrderToDelivered);

module.exports = router;
