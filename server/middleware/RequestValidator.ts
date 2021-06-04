import {UserRepository} from "../db/UserRepository";

const jwt = require('jsonwebtoken');

export class RequestValidator {
  constructor() {
  }

  async validateRequest(req, res, next) {
    let token = req.headers["authorization"] || req.cookies.jwt;
    if (!token) {
      res.status(401)
      return;
    }
    const decoded = jwt.verify(token, 'shhhhh');
    if (!decoded || !decoded.uniqueId) {
      res.status(401)
      return;
    }
    let user = await UserRepository.findOne({
      uniqueId: decoded.uniqueId
    }).lean();
    if (!user) {
      res.status(401)
      return;
    }
    req.state = {
      user: user
    }
    return await next();
  }

}
