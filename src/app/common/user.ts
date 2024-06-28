export class User {

  constructor(
    public id: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public email: string,
    public verified: boolean,
  ) { }
}
