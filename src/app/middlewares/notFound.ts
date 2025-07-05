import { NextFunction, Request, RequestHandler, Response } from "express";
import httpStatus from "http-status";

const notFound: RequestHandler = (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Route Not Found",
    error: "",
  });
};
export default notFound;