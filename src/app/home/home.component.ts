import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MemoryServiceService } from '../service/memory-service.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  router = inject(Router)
  memoryService = inject(MemoryServiceService)
  logout() {
    this.memoryService.clearCredentail();
    this.router.navigate([''])
  }
}
