import * as tripService from "../services/tripServices.js"
import * as formatResponse from "../middlewares/formatResponse.js"
import { log } from "console";


export async function putTrip(req , res ){
    tripService.putTrip(req,res);
}
export async function searchTrip(req , res , next){
    const request = req.body
    
        try {
                const data = await tripService.searchTrip(request);
                formatResponse.sendSuccessResult(res, data, req);
            } catch (error) {
                console.log(next);
                
                next(error)
                
            }
}

export async function getTrip(req , res ){
    tripService.getTrip(req,res);
}
export async function requestTrip(req , res ){
    tripService.requestTrip(req,res);
}

export async function getConsumerTrips(req , res ){
    tripService.getConsumerTrips(req,res);
}

export async function getCreatorTrips(req , res ){
    tripService.getCreatorTrips(req,res);
}