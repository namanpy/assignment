import { Router } from "express";
import * as ProductController from "@controllers/product.controller";
import { checkAuth } from "../middlewares/auth.middleware";
const router = Router();

router.post("/add", checkAuth, ProductController.addProducts);
router.get("/quotations", checkAuth, ProductController.getQuotations);
router.get("/invoice", ProductController.getInvoice);

export default router;
