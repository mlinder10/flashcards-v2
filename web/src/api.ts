import axios from "axios";
import { GenerateResponse, Product, User } from "./types";

const BASE_URL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:3000";

const server = axios.create({
  baseURL: BASE_URL,
});

export const TOKEN_KEY = "flashcards-token";

server.interceptors.request.use((req) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

type GenerateFlashcardsArgs = {
  type: "notes" | "syllabus" | "courseInfo";
  notes?: string;
  syllabus?: string;
  courseInfo?: {
    university: string;
    department: string;
    courseNumber: string;
    courseName: string;
  };
};

export const api = {
  // User

  login: async (email: string, password: string) => {
    return server.post<User>("/auth/login", { email, password });
  },

  register: async (name: string, email: string, password: string) => {
    return server.post<User>("/auth/register", { name, email, password });
  },

  quietLogin: async () => {
    return server.get<User>("/auth/login");
  },

  requestResetPassword: async (email: string) => {
    return server.post<string>("/auth/request-reset-password", { email });
  },

  resetPassword: async (userId: string, password: string) => {
    return server.post<string>("/auth/reset-password", { userId, password });
  },

  logout: async () => {
    return server.post<string>("/auth/logout");
  },

  // Generate

  generateFlashcards: async ({
    type,
    notes,
    syllabus,
    courseInfo,
  }: GenerateFlashcardsArgs) => {
    return server.post<GenerateResponse>("/protected/generate", {
      type,
      notes,
      syllabus,
      courseInfo,
    });
  },

  // Products

  fetchProducts: async () => {
    return server.get<Product[]>("/protected/product");
  },
};
