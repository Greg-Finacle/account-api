import express, { Router } from 'express'
import sbaccValidator from '../validator/sbacc.validator'
import sbaccController from '../controllers/sbacc.controller'

class HomeRoutes{
  public router: Router = express.Router()
  
  constructor(){
    this.initializeRoutes()
  }

  initializeRoutes(){
    this.router.post('/create/savings', sbaccValidator, sbaccController)
  }
}

export default new HomeRoutes().router