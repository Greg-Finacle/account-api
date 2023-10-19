import { Request, Response, NextFunction } from 'express'

const auth = async(req: Request, res: Response, next: NextFunction) => {

    const token = extractToken(req)
    const url = process.env.TOKEN_URL!
    const customHeaders = {
      "Content-Type": "application/json",
    }
    const body = {
      "token" : token
    }

    try {
        const response = await fetch(url, {
          method: "POST",
          headers: customHeaders,
          body: JSON.stringify(body)
        })
        if (response.status === 401) {
          return res.status(401).send("Unauthorized access")
        }

        if (response.status === 200) { 
          console.log('User Authenticated')
          next()
        }
    } catch (error) {
        return next(new Error(`error at fetch to ${url}`))
    }
}

const extractToken = (req: any) => {
  if (req.headers.authorization 
    && 
    req.headers.authorization.split(' ')[0] === 'Bearer') {
      return req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
      return req.query.token;
  }
  return null;
}

module.exports = auth