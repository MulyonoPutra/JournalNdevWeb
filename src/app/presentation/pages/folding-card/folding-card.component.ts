import { Component, Input, OnInit } from '@angular/core';
import { CARDS } from 'src/app/core/domain/static/folding-card';

@Component({
  selector: 'app-folding-card',
  templateUrl: './folding-card.component.html',
  styleUrls: ['./folding-card.component.scss'],
})
export class FoldingCardComponent implements OnInit {
  @Input() content: any;
  @Input() isReadMore: boolean = false;
  public isCollapsed: boolean = true;

  post = CARDS;

  constructor() {}

  ngOnInit(): void {}
}
