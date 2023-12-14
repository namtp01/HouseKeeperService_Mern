import Feature from "../models/feature.model.js"
import createError from "../utils/createError.js"
import { isAdmin } from "../middleware/jwt.js"

export const createFeature = async (req, res, next) =>
{
    const { name } = req.body;

    // Check for missing parameter
    if (!name) {
        return next(createError(400, "Missing required parameter: name"));
    }

    // Check if user is admin
    await isAdmin(req, res, next);

    try {
        // Create a new feature object
        const newFeature = new Feature({ name });

        // Save the new feature to the database
        const savedFeature = await newFeature.save();

        // Send success response
        res.status(201).json(savedFeature);
    } catch (err) {
        next(err);
    }
}

// Get all features
export const getAllFeatures = async (req, res) =>
{
    try {
        // Retrieve all features from the database
        const features = await Feature.find({});

        // Send success response
        res.status(200).json(features);
    } catch (err) {
        next(err);
    }
};

// Get a specific feature by ID
export const getFeatureById = async (req, res) =>
{
    const { featureId } = req.params.id;

    try {
        // Find the feature by ID
        const feature = await Feature.findById(featureId);

        // Check if feature exists
        if (!feature) {
            return next(createError(404, "Feature not found"));
        }

        // Send success response
        res.status(200).json(feature);
    } catch (err) {
        next(err);
    }
};

// Update a feature (admin only)
export const updateFeatureById = async (req, res) =>
{
    const { featureId } = req.params.id;
    const updateData = req.body;

    // Check if user is admin
    await isAdmin(req, res, next);

    try {
        // Find and update the feature by ID
        const updatedFeature = await Feature.findByIdAndUpdate(
            featureId,
            updateData,
            { new: true }
        );

        // Check if feature exists
        if (!updatedFeature) {
            return next(createError(404, "Feature not found"));
        }

        // Send success response
        res.status(200).json(updatedFeature);
    } catch (err) {
        next(err);
    }
};

// Delete a feature (admin only)
export const deleteFeatureById = async (req, res) =>
{
    const { featureId } = req.params;

    // Check if user is admin
    await isAdmin(req, res, next);

    try {
        // Find and delete the feature by ID
        await Feature.findByIdAndDelete(featureId);

        // Send success response
        res.status(200).json({ message: "Feature deleted successfully" });
    } catch (err) {
        next(err);
    }
};