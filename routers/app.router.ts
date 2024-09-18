// This is our root router
import { Router } from "express";

const router =  Router();

router.use("/user")
router.use("/quotation")

export const AppRouter = router;

