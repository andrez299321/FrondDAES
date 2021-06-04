
export class Client {
  constructor(
    public id: number,
    public name: string,
    public lastName: string,
    public identification: number,
    public celphone: string,
    public password: string,
    public email: string 
  ) 
  {}
}

export class ResponseClient {
  constructor(
    public status: number,
    public message: string,
    public data: Client[]
  ) {}
}


export class LoginRequest {
  constructor(
    public user: string,
    public password: string
  ) {}
}