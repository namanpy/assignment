// This is our root router
import { Router } from "express";

import UserRouter from "@routers/user.router";
import ProductRouter from "@routers/product.router";

const router = Router();

router.use("/user", UserRouter);
router.use("/product", ProductRouter);

export default router;
