export class UserDto {

  constructor(
    public id: string,
    public username: string,
    public email: string,
    public firstName: string | null, // Can be null
    public lastName: string | null, // Can be null
    public phoneNumber: string | null, // Can be null
    public subscribed: boolean, // Default to false
    public verified: boolean, // Default to false
    public role: string,
  ) {
  }

}
