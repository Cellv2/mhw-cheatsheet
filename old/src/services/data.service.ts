const mhwApiBaseUrl: string = "https://mhw-db.com/";

export interface ApiService {}

export interface MhwDbApiService extends ApiService {
    readonly baseUrl: string;
}
export class MhwDbApiService implements MhwDbApiService {
    readonly baseUrl = mhwApiBaseUrl;
    
}
