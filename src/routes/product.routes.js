import { Router } from "express";
import { getProductId, getProducts, deleteProduct, updateProductPopularity, updateProduct } from "../modules/product/product.controller.js";
import { createProduct } from "../modules/product/product.controller.js";
import { createCategory, deleteCategory, getCategory, updateCategory } from "../modules/category/category.controller.js";

export const router = Router();


// router.get("/popular", getPopularProducts);

router.get("/", getProducts);

router.get("/categories", getCategory)

router.post("/categories", createCategory)

// ไม่บังคับ auth
router.post("/", createProduct);
// บังคับ auth:
// router.post("/", auth, createProduct);

router.put("/:id", updateProduct);

router.get("/:id", getProductId);

router.delete("/:id", deleteProduct);

router.put("/:id/popular", updateProductPopularity);

router.put("/categories/:id", updateCategory);

router.delete("/categories/:id", deleteCategory);



