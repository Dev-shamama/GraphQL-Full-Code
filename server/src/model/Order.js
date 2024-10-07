import { Schema, model } from "mongoose";

const orderSchema = Schema({
  shippingInfo: {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    address1: {
      type: String,
      required: true,
    },
    address2: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    specialInstruction: {
      type: String,
    },
    paymentType: {
      type: String,
      default: "Cash On Delivery",
    },
  },

  orderItems: [
    {
      productCode: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        default: ""
      },
      orderStatus: {
        type: String,
        default: "PROCESSING",
      },
    },
  ],

  orderId: {
    type: Number,
    required: true,
  },

  deliveryCharges: {
    type: Number,
    default: 150,
  },

  orderStatus: {
    type: String,
    default: "PROCESSING",
  },

  deliveredAt: Date,
  cancelledAt: Date,
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const Order = model("Order", orderSchema);

export default Order;
