import { Component } from '@angular/core';

@Component({
  selector: 'app-servicehandler',
  templateUrl: './servicehandler.component.html',
  styleUrls: ['./servicehandler.component.css']
})
export class ServicehandlerComponent {

  toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }
}
