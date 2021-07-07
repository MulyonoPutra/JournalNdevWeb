import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'],
})
export class CardsComponent implements OnInit {
  @Input() content: any;
  @Input() isReadMore: boolean = false;
  public isCollapsed: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}
