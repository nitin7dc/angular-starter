import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-page',
  templateUrl: 'error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  @Input() message: string;

  constructor() {
    this.message = this.message || 'Please try again.';
  }

  ngOnInit() {
  }
}
