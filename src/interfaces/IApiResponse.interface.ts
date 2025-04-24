import { HttpError } from "../enums/HttpError.enum";

export interface IApiResponse<T = any>{
    message : string,
    error : boolean,
    data ?: T,
    httpError ?: HttpError
}
