import express from 'express';
import * as tripController from "../controllers/tripController.controller"
import { checkSession } from '../middlewares/checkSession.middleware';
import { errorHandler } from '../middlewares/errorHandler.middleware';

const tripRouter = express.Router();

//create a new trip
tripRouter.post("/trip/put", checkSession, tripController.putTrip);
//get a particular trip from db
tripRouter.post("/trip/get",  tripController.getTrip);
// search trips with criteria
tripRouter.post("/trip/search",  tripController.searchTrip,)
// request to put dropper/consumer in trip
tripRouter.post('/trip/request', checkSession, tripController.requestTrip)
// get all creator trips for a user
tripRouter.post('/trip/getCreator', checkSession, tripController.getCreatorTrips)
// get all consumer trips for a user
tripRouter.post('/trip/getConsumer', checkSession, tripController.getConsumerTrips)

export default tripRouter