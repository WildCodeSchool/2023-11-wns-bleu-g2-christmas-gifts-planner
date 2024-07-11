import express from "express";
import User from "../entities/User";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}
