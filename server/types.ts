export type User = {
  id: string;
  name: string;
  email: string;
  token: string;
  createdAt: number;
  updatedAt: number;
  subscriptionStart: number | null;
  subscriptionEnd: number | null;
  paidGenerates: number;
  freeGenerates: number;
};

export type RawFlashcard = {
  front: string;
  back: string;
};

export type CourseInfo = {
  university: string;
  department: string;
  courseNumber: string;
  courseName: string;
};

export type GenerateType = "syllabus" | "notes" | "courseInfo";

export type Product = {
  id: string;
  name: string;
  description: string;
  priceInPennies: number;
  url: string;
};

export const PRODUCTS: Product[] = [
  {
    id: "sadf",
    name: "Single Generate",
    description: "A one-time purchase of a single use of flashcards generator",
    priceInPennies: 99,
    url: "https://buy.stripe.com/test_9AQcOQ8HCb3r4akeUU",
  },
  {
    id: "fds",
    name: "Monthly Subscription",
    description: "Unlimited use of flashcards generator for a one-month period",
    priceInPennies: 999,
    url: "https://buy.stripe.com/test_cN2eWYf604F34ak9AB",
  },
  {
    id: "as",
    name: "Yearly Subscription",
    description: "Unlimited use of flashcards generator for a one-year period",
    priceInPennies: 9999,
    url: "https://buy.stripe.com/test_3cs2ac0b66NbfT2146",
  },
];

declare module "express-serve-static-core" {
  interface Request {
    user: User;
    isSubscribed: boolean;
  }
}
