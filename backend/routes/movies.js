import express from "express"
import { commentMovie, createMovie, deleteMovie, index, likeMovie, updateMovie, upload } from "../controllers/movies.js"
const router = express.Router()


router.get("/" , index)

router.post("/add", upload.single("image"), createMovie)

router.delete("/:id", deleteMovie)

router.patch("/:id", updateMovie)

router.post("/:id/comments", commentMovie)

router.post("/:id/likes" , likeMovie)


export default router