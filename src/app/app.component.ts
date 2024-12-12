import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  rows: number[][] = [];
  maxSeatsPerRow: number = 7;
  totalSeats: number = 80;
  bookedSeats: Set<number> = new Set([1, 2, 10, 11]); // Example: some pre-booked seats

  constructor() {
    this.initializeSeats();
  }

  initializeSeats() {
    // Create 11 rows: 10 with 7 seats and 1 with 3 seats
    for (let i = 0; i < 10; i++) {
      this.rows.push(Array.from({ length: this.maxSeatsPerRow }, (_, j) => i * 7 + j + 1));
    }
    this.rows.push(Array.from({ length: 3 }, (_, j) => 71 + j));
  }

  isSeatBooked(seat: number): boolean {
    return this.bookedSeats.has(seat);
  }

  bookSeats(requiredSeats: number) {
    if (requiredSeats > this.maxSeatsPerRow) {
      alert('You can book a maximum of 7 seats at a time.');
      return;
    }

    let bookedSeats: number[] = [];

    // Try to find a single row with enough contiguous seats
    for (let row of this.rows) {
      let contiguousSeats = [];
      for (let seat of row) {
        if (!this.isSeatBooked(seat)) {
          contiguousSeats.push(seat);
        } else {
          contiguousSeats = [];
        }

        if (contiguousSeats.length === requiredSeats) {
          bookedSeats = contiguousSeats;
          break;
        }
      }
      if (bookedSeats.length) break;
    }

    // If no single row has enough seats, find nearby seats
    if (!bookedSeats.length) {
      for (let row of this.rows) {
        for (let seat of row) {
          if (!this.isSeatBooked(seat) && bookedSeats.length < requiredSeats) {
            bookedSeats.push(seat);
          }
        }
        if (bookedSeats.length === requiredSeats) break;
      }
    }

    if (bookedSeats.length < requiredSeats) {
      alert('Not enough seats available to book.');
      return;
    }

    // Confirm booking and update bookedSeats set
    bookedSeats.forEach(seat => this.bookedSeats.add(seat));
    alert(`Seats booked successfully: ${bookedSeats.join(', ')}`);
  }
}