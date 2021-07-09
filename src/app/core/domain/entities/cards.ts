export interface Cards {
  id?: number;
  title?: string;
  imagesContentType?: string;
  images?: string;
}

export class ICards implements Cards {
  constructor(
    public id?: number,
    public title?: string,
    public imagesContentType?: string,
    public images?: string
  ) {}
}

export interface CardsEntity {
  id: number;
  title: string;
  imagesContentType?: string;
  images?: string;
}
