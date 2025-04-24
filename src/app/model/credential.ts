export class Credential {
     constructor(
          public username?: string,
          public password?: string
     ) { }
     public setPassword(ps: string) {
          this.password = ps
     }

     public setUsername(un: string) {
          this.username = un
     }
}
