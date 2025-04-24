export class User {
     constructor(
          public id?: number,
          public username?: string,
          public password?: string,
          public name?: string,
          public dob?: Date,
          public gender?: string,
          public address?: string,
          public profileImage?: string,
          public contactNumber?: string,
          public pinCode?: string,
          public accessRole?: string
     ) { }
}
