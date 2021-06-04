
export class DetailSalesOrder  {
  constructor(
    public idproduct: number,
    public items: string
  ) 
  {}
}

export class SalesOrder {
  constructor(
    public id: number,
    public name: string,
    public state: boolean,
    public detail: DetailSalesOrder[]
  ) {}
}


export class ResponseSalesOrder {
  constructor(
    public status: number,
    public message: string,
    public data: SalesOrder[]
  ) {}
}