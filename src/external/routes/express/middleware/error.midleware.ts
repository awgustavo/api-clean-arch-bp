import { NextFunction, Response } from "express";
import { RequestAuth } from "..";

export function authenticate(request: RequestAuth, response: Response, next: NextFunction) {
  const [,token] = request.headers["authorization"]?.split(" ") || [];
  if (!token) return response.status(401).send("Token not provided");
  //decode jwt: jwt.verify(token, 'shhhhh');
  //set user properties
  next();
}
