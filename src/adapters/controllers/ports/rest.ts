export interface RestResponse {
  statusCode: number
  body?
  error?
}

export interface RestRequest {
  body?
  query?
  params?
}
