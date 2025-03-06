import { Router } from "express";
import { errorBoundary } from "../utils/middleware";
import { gemini } from "../utils/gemini";
import { isError, turso } from "../database";

const router = Router();

const FREE_GENERATE_LIMIT = 4;

router.post("/", async (req, res) => {
  errorBoundary(req, res, async (req, res) => {
    if (
      !req.isSubscribed &&
      req.user.paidGenerates === 0 &&
      req.user.freeGenerates === 0
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { type, notes, syllabus, courseInfo } = req.body;
    const flashcards = await gemini.generate(type, notes, syllabus, courseInfo);

    // use subscription if exists
    if (req.isSubscribed) {
      return res.status(200).json({ flashcards, type: "subscription" });
    }

    // use free generate
    if (req.user.freeGenerates > 0) {
      const rs = await turso.useFreeGenerate(req.user.id);
      if (isError(rs)) {
        return res.status(rs.code).json({ message: rs.message });
      }
      const limitedFlashcards = flashcards.slice(0, FREE_GENERATE_LIMIT);
      return res
        .status(200)
        .json({ flashcards: limitedFlashcards, type: "free" });
    }

    // use paid generate
    const rs = await turso.usePaidGenerate(req.user.id);
    if (isError(rs)) {
      return res.status(rs.code).json({ message: rs.message });
    }
    return res.status(200).json({ flashcards, type: "single" });
  });
});

export default router;
