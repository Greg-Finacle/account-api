import { NextFunction, Request, Response } from "express";
import { SBAccount } from "../interface/sbacc.interface";

class SBAccountValidator {

  sbAccountValidator(req: Request, res: Response, next: NextFunction) {
      console.log('Inside SBAccount Validator')

      const request : SBAccount = req.body
      //
      if (!(request.cifId && /^[\w]+$/g.test(request.cifId)))
          return res.status(500).send({"message": "Enter valid cifId"})
      
      if (!(request.schmCode && /^[\w]+$/g.test(request.schmCode)))
          return res.status(500).send({"message": "Enter valid schmCode"})

      if (!(request.schmType && /^[\w]+$/g.test(request.schmType)))
          return res.status(500).send({"message": "Enter valid schmType"})

      if (!(request.acctCrncy && /^[\w]+$/g.test(request.acctCrncy)))
          return res.status(500).send({"message": "Enter valid acctCrncy"})

      if (!(request.acctName && /^[\w\-.\s]+$/g.test(request.acctName)))
          return res.status(500).send({"message": "Enter valid acctName"})

      if (!(request.branchId && /^[\d]+$/g.test(request.branchId)))
          return res.status(500).send({"message": "Enter valid branchId"})

      if (!(request.acctShortName && /^[\w]+$/g.test(request.acctShortName)))
        return res.status(500).send({"message": "Enter valid acctShortName"})

      if (!(request.glSubHeadCode && /^[\w]+$/g.test(request.glSubHeadCode)))
        return res.status(500).send({"message": "Enter valid glSubHeadCode"})

      next()
  }
}

export default new SBAccountValidator().sbAccountValidator