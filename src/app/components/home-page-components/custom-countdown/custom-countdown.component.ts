import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-countdown',
  standalone: true,
  imports: [],
  templateUrl: './custom-countdown.component.html',
  styleUrl: './custom-countdown.component.css'
})
export class CustomCountdownComponent implements AfterViewInit {

  now: any = new Date().getTime();
  targetTime: any = new Date(2024, 3, 11).getTime();
  difference: number = this.targetTime - this.now;

  @ViewChild('days', { static: true }) days: ElementRef | undefined;
  @ViewChild('hours', { static: true }) hours: ElementRef | undefined;
  @ViewChild('minutes', { static: true }) minutes: ElementRef | undefined;
  @ViewChild('seconds', { static: true }) seconds: ElementRef | undefined;

  ngAfterViewInit() {
    setInterval(() => {

      this.days!.nativeElement.innerText = Math.floor(this.difference / (1000 * 60 * 60 * 24));
      this.hours!.nativeElement.innerText = Math.floor((this.difference / (1000 * 60 * 60)) % 24);
      this.minutes!.nativeElement.innerText = Math.floor((this.difference / 1000 / 60) % 60);
      this.seconds!.nativeElement.innerText = Math.floor((this.difference / 1000) % 60);;

      this.difference -= 1000;
    
    }, 1000);
  }

}
