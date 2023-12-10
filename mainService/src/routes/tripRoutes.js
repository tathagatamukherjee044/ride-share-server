import express from 'express';
import * as tripController from "../controllers/tripController.js"
import { checkSession } from '../middlewares/checkSession.js';
import { errorHandler } from '../middlewares/errorHandler.js';

const tripRouter = express.Router();

//create a new trip
tripRouter.post("/trip/put", checkSession, tripController.putTrip);
//get a particular trip from db
tripRouter.post("/trip/get",  tripController.getTrip);
// search trips with criteria
tripRouter.post("/trip/search",  tripController.searchTrip,)
// request to put dropper/consumer in trip
tripRouter.post('/trip/request', checkSession, tripController.requestTrip)
// approve one request from all trip requests
tripRouter.post('/trip/approve', checkSession, tripController.approveRequest)
// get all creator trips for a user
tripRouter.post('/trip/getCreator', checkSession, tripController.getCreatorTrips)
// get all consumer trips for a user
tripRouter.post('/trip/getConsumer', checkSession, tripController.getConsumerTrips)

export default tripRouter