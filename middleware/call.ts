import axios from 'axios'
import https from 'https'
import xmlParser from "../middleware/parser";

class FinacleCall {
  
  async serverCall (payload: string) {
    const url = process.env.FI_URL
    
    const agent = new https.Agent({
      rejectUnauthorized: false
    })
    const config = {
      headers: {
        'Content-Type': 'text/xml',
        'Content-Length': Buffer.byteLength(payload),
        'SOAPAction': ''
    },
      httpsAgent: agent
    }

    if (!url) return new Error('Finacle URL is undefined')
    const controller = new AbortController()
    try {
      
      const response = await axios.post(
        url,
        payload,
        config
      )

      if (response.status === 200){
        console.log("===== Finacle call was successful. Trying to parse XML response fields...")
        try {
          const result: any = await xmlParser(response.data)
          console.log(result['soapenv:Envelope']['soapenv:Body'][0]['dlwmin:executeServiceResponse'][0]['executeServiceReturn'])
          const responseXML = 
              result['soapenv:Envelope']['soapenv:Body']
                    [0]['dlwmin:executeServiceResponse']
                    [0]['executeServiceReturn']
                    [0]['_']
          
          return responseXML
        } catch (error: any) {
          console.error('Error parsing XML:', error);
          throw new Error(error)
        }
      }
    } catch (error: any) {
      console.error(error)
      throw new Error(error)
    } finally {
      // cancel the request
      controller.abort()
    }
  }
}

export default new FinacleCall().serverCall