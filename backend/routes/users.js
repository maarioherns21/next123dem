import express from "express"
import { index, login, profile, register, upload } from "../controllers/users.js"
const router = express.Router()


router.get("/", index )

router.post("/login", login)

router.post("/register", upload.single("image") , register)

router.get('/:id', profile);

export default router