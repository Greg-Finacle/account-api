import { Request, Response } from "express";
import { SBAccount } from "../interface/sbacc.interface";
import SBAccountFI from "../integrators/sbacc.integrator";
import FinacleCall from '../middleware/call'
import xmlParser from '../middleware/parser' 


class SBAccountController {

    async SBAccount (req: Request, res: Response) {
      console.log("Inside Saving account creation API")
      let responseXMLHeader, responseXMLBody : any
      const request : SBAccount = req.body

      try {
          const sbAccountFi = new SBAccountFI(request)
          const payload = sbAccountFi.soapRequest()
          console.log(payload)

          const response = await FinacleCall(payload)
          const responseXML: any = await xmlParser(response)

          if (!responseXML) {
              throw new Error ('invalid XML returned from Finacle') 
          }

          // get response header
          responseXMLHeader = responseXML.FIXML
            .Header[0]
            .ResponseHeader[0]
            .HostTransaction[0]
            .Status[0]
          console.log(responseXMLHeader)

          if (responseXMLHeader.toUpperCase() == 'FAILURE') {
              responseXMLBody = responseXML.FIXML
                .Body[0]
                .Error[0]
                .FIBusinessException[0]
                .ErrorDetail[0].ErrorDesc[0]
              console.log(responseXMLBody)

              res.status(400).send({"status":responseXMLHeader, "message": responseXMLBody})
          }
          else 
          {
              responseXMLBody = responseXML.FIXML
                .Body[0]
                .XferTrnAddResponse[0]
                .XferTrnAddRs[0]
                .TrnIdentifier[0]
              console.log(responseXMLBody)

              res.status(200).send({"status":responseXMLHeader, "message": responseXMLBody})
          }
      } catch (error) {
        console.log(error)
        res.status(500).send({"status":responseXMLHeader, "message": "Internal server error"})
      }
    }
}

export default new SBAccountController().SBAccount