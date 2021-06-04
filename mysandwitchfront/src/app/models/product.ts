export class MenuItem {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public image: MenuItemImage,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public availibilityCount: number,
    public cartCount: number,
    public weight: number,
    public isVegetarian: boolean,
    public categoryId: number
  ) {}
}

export class MenuItem2 {
  constructor(
    public id: number,
    public name: string,
    public description: string,
    public price: number,
    public image: string,
    public state: boolean //public discount: number, //public ratingsCount: number, //public ratingsValue: number, //public availibilityCount: number, //public cartCount: number, //public weight: number,
  ) //public isVegetarian: boolean,
  //public categoryId: number
  {}
}

export class ResponseMenu {
  constructor(
    public status: number,
    public message: string,
    public data: MenuItem2[]
  ) {}
}

export class MenuItemImage {
  constructor(
    public small: string,
    public medium: string,
    public big: string
  ) {}
}
