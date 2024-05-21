import { Component, OnInit} from '@angular/core';
import { ShService} from "../services/SH-service/sh.service";
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import {Observable} from "rxjs";
import { map } from 'rxjs/operators'; // Import the map operator
import { Router } from '@angular/router';

@Component({
  selector: 'app-servicehandler',
  templateUrl: './servicehandler.component.html',
  styleUrls: ['./servicehandler.component.css']
})
export class ServicehandlerComponent implements OnInit {
  displayData: any;
  showForm: boolean = false;
  selectedTicket: any;
  loading: boolean = false;

  constructor(private shService: ShService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.getDisplayData().subscribe(data => {
      this.displayData = data;
      console.log(this.displayData);
      this.fetchDisplayData();
    });
  }

  getDisplayData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/displaydata').pipe(
      map((data: any[]) => {
        data.sort((a, b) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime());
        return data.map((item, index) => ({
          ...item,
          requestId: index + 1,
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

  fetchDisplayData(): void {
    this.loading = true; // Set loading flag to true
    this.shService.getDisplayData().subscribe(
      data => {
        this.displayData = data;
        this.loading = false; // Set loading flag to false when data is loaded
      },
      error => {
        console.error('Error fetching display data:', error);
        this.loading = false; // Set loading flag to false in case of error
      }
    );
  }

  openTicketDetails(ticket: any): void {
    this.selectedTicket = ticket;
    this.router.navigate(['/ticket-details', ticket.requestId]);
  }

  closeForm(): void {
    this.showForm = false;
  }

  addticketdetails(formData: any): void {
    this.shService.addticketdetails(formData.ticketId, formData.formData).subscribe(() => {
      this.fetchDisplayData();
      this.closeForm();
    });
  }

  toggleDropdown() {
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
      dropdownMenu.classList.toggle("show");
    }
  }
}
