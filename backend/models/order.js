const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model
        required: true,
    },
    products: [
        {
            productType: {
                type: String,
                enum: ['Clothes', 'Art'], // You specify the type of product
                required: true,
            },
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                refPath: 'products.productType', // Dynamically reference either 'Clothes' or 'Art'
            },
            quantity: {
                type: Number,
                default: 1,
                min: 1, // Make sure a minimum of 1 item is ordered
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    paymentId: {
        type: String,
        required: true, // Store the payment transaction ID
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        enum: ['pending', 'received', 'accepted', 'on its way', 'delivered', 'cancelled'],
        default: 'pending',
    },
    shippingInfo: {
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        postalCode: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: String,
            required: true,
        }
    }
}, {
    timestamps: true  // Adds createdAt and updatedAt fields automatically
});

// Add an index for better query performance
OrderSchema.index({ userId: 1, date: -1 });

module.exports = mongoose.model('Order', OrderSchema);
