import mongoose from "mongoose";
import Category from "../models/category.js";
import { AppError } from '../utils/AppError.js'
export async function getCategories(req, res, next) {
    try {
        const categories = await Category.find()

        return res.status(200).json(categories)
    } catch (error) {
        return next(new AppError(error.message))
    }
}

export async function createCategory(req, res, next) {
    try {
        const { name, description } = req.body

        const newCategory = await Category.create({
            name,
            description
        })

        return res.status(201).json(newCategory)

    } catch (error) {
        return next(new AppError(error.message))
    }
}

export async function getCategoryById(req, res, next) {
    try {
        const { id } = req.params

        const isValid = mongoose.isValidObjectId(id)

        if (!isValid) {
            return next(new AppError('Invalid category ID', 400))
        }

        const category = await Category.findById(id)

        if (!category) {
            return next(new AppError('Category Not Found', 404))
        }

        return res.status(200).json(category)

    } catch (error) {
        return next(new AppError(error.message))
    }
}

export async function updateCategory(req, res, next) {
    try {
        const { id } = req.params

        const isValid = mongoose.isValidObjectId(id)

        if (!isValid) {
            return next(new AppError('Invalid category ID', 400))
        }

        const category = await Category.findById(id)

        if (!category) {
            return next(new AppError('Category Not Found', 404))
        }

        const updates = req.body

        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            updates,
            {
                new: true,
                runValidators: true
            }
        )

        return res.status(200).json(updatedCategory)

    } catch (error) {
        return next(new AppError(error.message))
    }
}

export async function deleteCategory(req, res, next) {
    try {
        const { id } = req.params

        const isValid = mongoose.isValidObjectId(id)

        if (!isValid) {
            return next(new AppError('Invalid category ID', 400))
        }

        const deletedCategory = await Category.findByIdAndDelete(id)

        if (!deletedCategory) {
            return next(new AppError('Category Not Found', 404))
        }

        return res.status(200).json(deletedCategory)

    } catch (error) {
        return next(new AppError(error.message))
    }
}