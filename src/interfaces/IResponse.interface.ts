import { HttpError } from "../enums/HttpError.enum";

export interface IResponse<T = any>{
    message : string,
    error : boolean,
    data ?: T,
    httpError ?: HttpError
}
