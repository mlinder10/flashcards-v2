import { Router } from "express";
import { isError, turso } from "../database";
import { errorBoundary, getToken } from "../utils/middleware";
// import { sendEmail } from "../utils/email";

const router = Router();

router.post("/login", async (req, res: any) => {
  errorBoundary(req, res, async (req, res) => {
    const { email, password } = req.body;
    const user = await turso.login(email, password);
    if (isError(user)) {
      return res.status(user.code).json({ message: user.message });
    }
    return res.status(200).json(user);
  });
});

router.get("/login", async (req, res) => {
  errorBoundary(req, res, async (req, res) => {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await turso.loginWithToken(token);
    if (isError(user)) {
      return res.status(user.code).json({ message: user.message });
    }
    return res.status(200).json(user);
  });
});

router.post("/register", async (req, res) => {
  errorBoundary(req, res, async (req, res) => {
    const { name, email, password } = req.body;
    const user = await turso.register(name, email, password);
    if (isError(user)) {
      return res.status(user.code).json({ message: user.message });
    }
    return res.status(200).json(user);
  });
});

// router.post("/activate", async (req, res) => {
//   errorBoundary(req, res, async (req, res) => {
//     const { code } = req.body;
//     const user = await turso.activate(code);
//     if (isError(user)) {
//       return res.status(user.code).json({ message: user.message });
//     }
//     return res.status(200).json(user);
//   });
// });

// router.post("/request-reset-password", async (req, res) => {
//   errorBoundary(req, res, async (req, res) => {
//     const { email } = req.body;
//     const id = await turso.getUserIdFromEmail(email);
//     if (isError(id)) {
//       return res.status(id.code).json({ message: id.message });
//     }
//     await sendEmail(
//       email,
//       "Reset your password",
//       `${process.env.CLIENT_URL}/reset-password/${id}`
//     );
//     return res.status(200).json({ message: "Email sent" });
//   });
// });

// router.patch("/reset-password", async (req, res) => {
//   errorBoundary(req, res, async (req, res) => {
//     const { userId, newPassword } = req.body;
//     const rs = await turso.resetPassword(userId, newPassword);
//     if (isError(rs)) {
//       return res.status(rs.code).json({ message: rs.message });
//     }
//     return res.status(200).json(rs);
//   });
// });

router.delete("/logout", async (req, res) => {
  errorBoundary(req, res, async (req, res) => {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await turso.logout(token);
    if (isError(user)) {
      return res.status(user.code).json({ message: user.message });
    }
    return res.status(200).json(user);
  });
});

export default router;
