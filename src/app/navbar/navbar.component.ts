import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryServiceService } from '../service/memory-service.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  router = inject(Router)
  memoryService = inject(MemoryServiceService)
  logout() {
    this.memoryService.clearCredentail();
    this.router.navigate([''])
  }
}
