import {AfterViewInit, Component} from '@angular/core';

@Component({
  selector: 'app-custom-countdown',
  standalone: true,
  imports: [],
  templateUrl: './custom-countdown.component.html',
  styleUrl: './custom-countdown.component.css'
})
export class CustomCountdownComponent implements AfterViewInit {

  now: any = new Date().getTime();
  targetTime: any = new Date(2024, 5, 1).getTime();
  difference: number = this.targetTime - this.now;

  days!: string;
  hours!: string;
  minutes!: string;
  seconds!: string;

  ngAfterViewInit() {
    setInterval(() => {

      let theDays = Math.floor(this.difference / (1000 * 60 * 60 * 24)).toString();
      let theHours = Math.floor((this.difference / (1000 * 60 * 60)) % 24).toString();
      let theMinutes = Math.floor((this.difference / 1000 / 60) % 60).toString();
      let theSeconds = Math.floor((this.difference / 1000) % 60).toString();

      this.days = theDays.length < 2 ? "0" + theDays : theDays;
      this.hours = theHours.length < 2 ? "0" + theHours : theHours;
      this.minutes = theMinutes.length < 2 ? "0" + theMinutes : theMinutes;
      this.seconds = theSeconds.length < 2 ? "0" + theSeconds : theSeconds;

      this.difference -= 1000;

    }, 1000);
  }

}
