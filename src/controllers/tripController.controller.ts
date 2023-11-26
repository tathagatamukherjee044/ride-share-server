import * as tripService from "../services/tripServices.service"
import { NextFunction, Request, Response } from "express";
import * as formatResponse from "../middlewares/formatResponse.middleware"
import { log } from "console";


export async function putTrip(req : Request, res : Response){
    tripService.putTrip(req,res);
}
export async function searchTrip(req : Request, res : Response, next: NextFunction){
    const request = req.body
    
        try {
                const data = await tripService.searchTrip(request);
                formatResponse.sendSuccessResult(res, data, req);
            } catch (error) {
                console.log(next);
                
                next(error)
                
            }
}

export async function getTrip(req : Request, res : Response){
    tripService.getTrip(req,res);
}
export async function requestTrip(req : Request, res : Response){
    tripService.requestTrip(req,res);
}

export async function getConsumerTrips(req : Request, res : Response){
    tripService.getConsumerTrips(req,res);
}

export async function getCreatorTrips(req : Request, res : Response){
    tripService.getCreatorTrips(req,res);
}