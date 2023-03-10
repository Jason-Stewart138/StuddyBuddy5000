import { Component } from '@angular/core';
import { userData } from '../interfaces/userData.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUser: userData | null = null;
}
