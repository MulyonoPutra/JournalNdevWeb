export interface Feedback {
  id?: number;
  username?: string;
  email?: string;
  messages?: string;
}

export class IFeedback implements Feedback {
  constructor(
    public id?: number,
    public username?: string,
    public email?: string,
    public messages?: string
  ) {}
}

