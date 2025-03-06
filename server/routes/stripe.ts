import { Router } from "express";
import { errorBoundary } from "../utils/middleware";
import Stripe from "stripe";

const router = Router();

const stripe = new Stripe(process.env.STRIPE_API_KEY ?? "");
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

router.post("/", async (req, res) => {
  errorBoundary(req, res, async (req, res) => {
    const signature = req.headers["stripe-signature"];
    if (!signature) {
      return res.status(400).json({ message: "Missing signature" });
    }
    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      webhookSecret
    );
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object;
        break;
      case "customer.subscription.deleted":
        const subscription = event.data.object;
        break;
    }
  });
});

export default router;
