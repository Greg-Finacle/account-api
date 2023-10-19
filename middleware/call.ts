import axios from 'axios'
import xmlParser from "../middleware/parser";

class FinacleCall {
  
  async serverCall (payload: string) {
    const url = process.env.FI_URL
    const headers = {
      'Content-Type': 'application/soap+xml',
      'charset': 'utf-8',
      'SOAPAction': ''
    }
    if (!url) return new Error('Finacle URL is undefined')
    const controller = new AbortController()
    try {
      
      const response = await axios.post(
        url,
        payload,
        { headers }
      )

      if (response.status === 200){
        console.log("===== Finacle call was successful. Trying to parse XML response fields...")
        try {
          const result: any = await xmlParser(response.data)
          console.log(result)
          const responseXML = 
              result['soap:Envelope']['soap:Body']
                    [0]['ns2:executeServiceResponse']
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