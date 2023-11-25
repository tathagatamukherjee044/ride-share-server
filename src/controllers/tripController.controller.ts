import * as tripService from "../services/tripServices.service"
import { Request, Response } from "express";
export async function putTrip(req : Request, res : Response){
    tripService.putTrip(req,res);
}
export async function searchTrip(req : Request, res : Response){
    tripService.searchTrip(req,res);
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