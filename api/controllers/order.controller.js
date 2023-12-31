import createError from './../utils/createError.js';
import Order from '../models/order.model.js';
import Gig from '../models/gig.model.js';
import Stripe from 'stripe';

export const intent = async (req, res, next) => {

    const stripe = new Stripe(process.env.STRIPE);

    //const gig = await Gig.findById(req.body.gigId);
    const gig = await Gig.findOne({ _id: req.params.id })
    if (!gig) return res.status(404).send("Gig not found")
    const applicationFee = ((gig.price * 20)/100) * 100
    const payementIntent = await stripe.paymentIntents.create({
        amount: gig.price * 100 + applicationFee,
        currency: 'usd',
        automatic_payment_methods: {
            enabled: true,
        }
    })
    
    const newOrder = new Order({
        gigId: gig._id,
        img: gig.cover,
        title: gig.title,
        buyerId: req.userId,
        sellerId: gig.userId,
        price: gig.price,
        payment_intent: payementIntent.id,
    })

    await newOrder.save();

    res.status(200).send({
        clientSecret: payementIntent.client_secret,
    });
}

export const getOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({
            ...(req.isSeller ? { sellerId: req.userId } : { buyerId: req.userId }),
            isCompleted: true,
        })

        res.status(200).send(orders)
    } catch (err) {
        next (err)
    }
}

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({}).sort({ _id: -1 })

        res.status(200).send(orders)
    } catch (err) {
        next(err)
    }
}

export const confirm = async (req, res, next) => {
    try {
        const orders = await Order.findOneAndUpdate(
            { payment_intent: req.body.payment_intent },
            {
                $set: {
                    isCompleted: true,
                }
            }
        )

        res.status(200).send("Order has been confirmed")
    } catch (err) {
        next (err)
    }
}