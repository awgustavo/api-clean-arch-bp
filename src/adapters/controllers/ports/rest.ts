export interface RestResponse {
    statusCode: number
    body?: any
    error?: string
  }
  
  export interface RestRequest {
    body?: any
    query?: any
    params?: any
  }
  