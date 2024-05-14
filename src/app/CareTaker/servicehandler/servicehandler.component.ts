import { Component, OnInit} from '@angular/core';
import { ShService} from "../services/SH-service/sh.service";
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import {Observable} from "rxjs";
import { map } from 'rxjs/operators'; // Import the map operator

// Define an interface for the ticket object
interface Ticket {
  requestId: string;
  requestDate: string;
  serviceType: string;
  assignedTo: string;
  availedDate: string;
  daysOpen: number;
  expectedTimeToClose: string;
  severity: string;
  status: string;
  viewed: boolean;
}

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
  //     map((data: any[]) => data.map((item, index) => ({
  //       ...item,
  //       requestId: index + 1, // Sequential ID starting from 1
  //       requestDate: this.formatDate(item.requestDate)
  //     })))
  //   );
  // }

  getDisplayData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/displaydata').pipe(
      map((data: any[]) => {
        // Sort the data array by requestDate in descending order
        data.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
        // Map and format the data
        return data.map((item, index) => ({
          ...item,
          requestId: index + 1, // Sequential ID starting from 1
          requestDate: this.formatDate(item.requestDate)
        }));
      })
    );
  }


  // Helper method to format date
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata'
    };
    return new Date(dateString).toLocaleString('en-IN', options);
  }

  toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }

  //Tickets for last 7 days
  filterTicketsForLast7Days() {
    console.log('Filtering tickets for last 7 days');
    const currentDate = new Date();
    // Set time to midnight for both today and seven days ago
    const beginningOfToday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const beginningOfSevenDaysAgo = new Date(currentDate.getTime() - 6 * 24 * 60 * 60 * 1000); // Seven days ago from midnight

    // Filter tickets requested between beginningOfSevenDaysAgo and beginningOfToday
    this.displayData = this.displayData.filter((ticket: Ticket) => {
      const ticketDate = new Date(ticket.requestDate);
      return ticketDate >= beginningOfSevenDaysAgo && ticketDate <= beginningOfToday;
    });
  }

//Tickets New
  filterTicketsNew() {
    console.log('Filtering new tickets');
    // Filter tickets where viewed is false
    this.displayData = this.displayData.filter((ticket: Ticket) => !ticket.viewed);
  }


}
