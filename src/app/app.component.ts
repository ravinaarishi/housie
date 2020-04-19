import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HOUSIE_TEXT } from './housie-text';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  housieText = HOUSIE_TEXT;
  ticketInput;
  generatedTickets;
  generatedNumbers;
  showTickets = false;
  showHousieBoard = false;
  showGameOver = false;
  currentNumber;
  currentText;
  calledNumbers = [];
  ticketCalledNumbers = [];
  tambola;
  oneToEight = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  oneToNine = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  snackBarRef;
  @ViewChild('ticketsDiv') ticketDivElement: ElementRef;
  @ViewChild('housieBoardOuterDiv') housieBoardDivElement: ElementRef;
  @ViewChild('housieBoard') housieBoardElement: ElementRef;

    constructor(private snackBar: MatSnackBar) {
      this.tambola = require('tambola-generator');
      this.ticketInput = new FormControl('');
    }

    public ngOnInit(): void {
    }

    public genrateTickets() {
      this.showHousieBoard = false;
      this.ticketCalledNumbers = [];
      const num = +this.ticketInput.value;
      this.generatedTickets = this.tambola.getTickets(num);
      this.showTickets = true;
      setTimeout(() => this.ticketDivElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }

    public openHousieBoard() {
      this.reset();
      this.generatedNumbers = this.tambola.getDrawSequence();
      this.showHousieBoard = true;
      setTimeout(() => this.housieBoardDivElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
    }

    public callNumber() {
      if (this.calledNumbers.length < this.generatedNumbers.length) {
        this.currentNumber = this.generatedNumbers[this.calledNumbers.length];
        this.currentText = this.housieText[this.currentNumber - 1];
        this.calledNumbers.push(this.currentNumber);
        setTimeout(() => this.housieBoardElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' }));
      } else {
        this.snackBarRef = this.snackBar.open('Game Over..!!', 'RESET');
        this.snackBarRef.onAction().subscribe(() => {
          this.reset();
        });
        this.showGameOver = true;
      }
    }

    public stubNumber(num) {
      if (num !== 0) {
        const index = this.ticketCalledNumbers.indexOf(num, 0);
        if (index < 0) {
          this.ticketCalledNumbers.push(num);
        } else {
          this.ticketCalledNumbers.splice(index, 1);
        }
      }
    }

    public reset() {
      this.currentNumber = null;
      this.currentText = null;
      this.showTickets = false;
      this.showHousieBoard = false;
      this.showGameOver = false;
      this.calledNumbers = [];
      this.ticketCalledNumbers = [];
      this.generatedNumbers = null;
      this.ticketInput = new FormControl('');
    }
}
