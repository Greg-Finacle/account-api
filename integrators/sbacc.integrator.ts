import crypto from 'crypto'
import { SBAccount } from '../interface/sbacc.interface'

class SBAccountFI {
  requestBody: SBAccount = {
    cifId: '', schmCode:'',schmType:'',acctCrncy:'',branchId:'',
    glSubHeadCode:'',acctName:'',acctShortName:''

  }
  requestTime = new Date().toISOString()

  constructor(payload: SBAccount){
    this.requestBody.cifId = payload.cifId;
    this.requestBody.schmCode= payload.schmCode;
    this.requestBody.schmType= payload.schmType;
    this.requestBody.acctCrncy= payload.acctCrncy;
    this.requestBody.branchId= payload.branchId;
    this.requestBody.glSubHeadCode= payload.glSubHeadCode;
    this.requestBody.acctName= payload.acctName;
    this.requestBody.acctShortName= payload.acctShortName;
  }

  soapRequest() {
    const xml = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:end="http://endpoint.fip.infosys.com">
      <soapenv:Header/>
      <soapenv:Body>
      <end:executeService>
        <arg_0_0><![CDATA[
            <FIXML xmlns="http://www.finacle.com/fixml" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.finacle.com/fixml SBAcctAdd.xsd">
            <Header>
            <RequestHeader>
            <MessageKey>
            <RequestUUID>${crypto.randomUUID()}</RequestUUID>
            <ServiceRequestId>SBAcctAdd</ServiceRequestId>
            <ServiceRequestVersion>${process.env.FI_VERSION_V10}</ServiceRequestVersion>
            <ChannelId>COR</ChannelId>
            <LanguageId></LanguageId>
            </MessageKey>
            <RequestMessageInfo>
            <BankId></BankId>
            <TimeZone></TimeZone>
            <EntityId></EntityId>
            <EntityType></EntityType>
            <ArmCorrelationId></ArmCorrelationId>
            <MessageDateTime>${this.requestTime}</MessageDateTime>
            </RequestMessageInfo>
            <Security>
            <Token>
            <PasswordToken>
            <UserId></UserId>
            <Password></Password>
            </PasswordToken>
            </Token>
            <FICertToken></FICertToken>
            <RealUserLoginSessionId></RealUserLoginSessionId>
            <RealUser></RealUser>
            <RealUserPwd></RealUserPwd>
            <SSOTransferToken></SSOTransferToken>
            </Security>
            </RequestHeader>
            </Header>
            <Body>
            <SBAcctAddRequest>
            <SBAcctAddRq>
            <CustId>
            <CustId>${this.requestBody.cifId}</CustId>
            </CustId>
            <SBAcctId>
            <AcctType>
            <SchmCode>${this.requestBody.schmCode}</SchmCode>
            <SchmType>${this.requestBody.schmType}</SchmType>
            </AcctType>
            <AcctCurr>${this.requestBody.acctCrncy}</AcctCurr>
            <BankInfo>
            <BranchId>${this.requestBody.branchId}</BranchId>
            </BankInfo>
            </SBAcctId>
            <SBAcctGenInfo>
            <GenLedgerSubHead>
            <GenLedgerSubHeadCode>${this.requestBody.glSubHeadCode}</GenLedgerSubHeadCode>
            </GenLedgerSubHead>
            <AcctName>${this.requestBody.acctName}</AcctName>
            <AcctShortName>${this.requestBody.acctShortName}</AcctShortName>
            <DespatchMode>N</DespatchMode>
            <SBAcctAdd_CustomData>
            <LOCALCALFLG>N</LOCALCALFLG>
            <WTAXBRNBY>A</WTAXBRNBY>
            <WTAXFLG>N</WTAXFLG>
            <WTAXSCOPE>P</WTAXSCOPE>
            <INTCRFLG>S</INTCRFLG>
            </SBAcctAdd_CustomData>
            </SBAcctGenInfo>
            </SBAcctAddRq>
            </SBAcctAddRequest>
            </Body>
            </FIXML>
        ]]></arg_0_0>
          </end:executeService>
      </soapenv:Body>
    </soapenv:Envelope>
    `;

    return xml
  }
}

export default SBAccountFI