import express, { Router } from 'express'

import sbaccValidator from '../validator/sbacc.validator'
import sbaccController from '../controllers/sbacc.controller'

const auth = require('../middleware/auth')

class HomeRoutes{
  public router: Router = express.Router()
  
  constructor(){
    this.initializeRoutes()
  }

  initializeRoutes(){
    this.router.post('/create/savings', auth, sbaccValidator, sbaccController)
  }
}

export default new HomeRoutes().router