import Gig from '../models/gig.model.js'
import User from "../models/user.model.js"
import createError from '../utils/createError.js'

export const createGig = async (req, res, next) =>
{
    if (!req.isSeller) return next(createError(403, "Only sellers can create a gig!"))

    const newGig = new Gig({
        userId: req.userId,
        ...req.body
    })

    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig)
    } catch (err) {
        next(err)
    }
}

export const deleteGig = async (req, res, next) =>
{
    try {
        const gig = await Gig.findById(req.params.id)

        if (gig.userId !== req.userId) return next(createError(403, "You can delete only your gigs!"))

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been deleted!")
    } catch (err) {
        next(err)
    }
}
export const getGigs = async (req, res, next) =>
{
    // const user = await User.findById("userId");
    // const userCountry = user.country 
    const q = req.query
    const user = await User.findOne({ _id: q.userId});
    const userCountry = user ? user.country : null;
    console.log(q.userId)
    const filters = {
        ...(q.userId && { userId: q.userId }),
        ...(q.cat && { cat: { $regex: q.cat, $options: "i"}  }),
        ...((q.min || q.max) && { price: { ...(q.min && { $gte: q.min }), ...(q.max && { $lte: q.max }) } }),
        ...(q.search && { title: { $regex: q.search, $options: "i" } }),
        ...(userCountry && { country: { $regex: userCountry, $options: "i" } }),
    }
    //...(q.userCountry && { country: { $regex: userCountry, $options: "i"}}),
    try {
        const gigs = await Gig.find(filters).sort({ [q.sort]: -1 })

        res.status(200).send(gigs)
    } catch (err) {
        next(err)
    }
}
export const getGig = async (req, res, next) =>
{
    try {
        const gig = await Gig.findById(req.params.id)
        if (!gig) next(createError(404, "Gig not found!"))

        res.status(200).send(gig)
    } catch (err) {
        next(err)
    }
}