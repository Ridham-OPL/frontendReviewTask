import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Credential } from '../model/credential';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url: string = "http://localhost:8081/user"

  constructor(private userService: HttpClient) { }

  login(credential: Credential) {
    return this.userService.post(this.url + "/login", credential)
  }

  getUser(username: string) {
    return this.userService.get(this.url + "/" + username)
  }

  pagination(page: Number, size: Number) {
    return this.userService.get<any>(this.url + "/pagination/" + page + '/' + size);
  }

  paginationWithName(page: Number, size: Number, name: string) {
    return this.userService.get<any>(this.url + "/pagination/" + name + "/" + page + '/' + size);
  }

  updateUser(id: string, user: User) {
    return this.userService.put(this.url + "/" + id, user)
  }

  deleteUser(id: string) {
    return this.userService.delete(this.url + "/" + id)
  }

  uploadProfile(id: string, file: FormData) {
    return this.userService.post(this.url + "/" + id, file)
  }
}
