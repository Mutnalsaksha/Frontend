import { Component, OnInit} from '@angular/core';
import { ShService} from "../services/SH-service/sh.service";
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import {Observable} from "rxjs";
import { map } from 'rxjs/operators'; // Import the map operator

@Component({
  selector: 'app-servicehandler',
  templateUrl: './servicehandler.component.html',
  styleUrls: ['./servicehandler.component.css']
})
export class ServicehandlerComponent implements OnInit {
  displayData: any;


  constructor(private shService: ShService, private http: HttpClient) { }

  ngOnInit(): void {
    this.getDisplayData().subscribe(data => {
      this.displayData = data;
      console.log(this.displayData);
    });
  }

  // getDisplayData(): Observable<any> {
  //   return this.http.get<any>('http://localhost:3000/displaydata').pipe(
  //     map((data:any) => data.map((item:any) => ({
  //       ...item,
  //       requestDate: this.formatDate(item.requestDate),
  //       requestId: item.requestId // Add the requestId field here
  //     })))
  //   );
  // }




  getDisplayData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/displaydata').pipe(
      map((data: any[]) => data.map((item, index) => ({
        ...item,
        requestId: index + 1, // Sequential ID starting from 1
        requestDate: this.formatDate(item.requestDate)
      })))
    );
  }




  fetchData(): void {
    this.shService.getDisplayData().subscribe(data => {
      this.displayData = data.map((item:any) => ({
        ...item,
        requestDate: this.formatDate(item.requestDate),
      }));
    });
  }

  // Helper method to format date
  formatDate(dateString: string): string {
    // Add your custom date formatting logic here
    return new Date(dateString).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  }

  toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }
}
