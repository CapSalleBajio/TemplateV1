import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input() user: {id: number, name: string, email: string, score: number, description: string};
  constructor() { }

  ngOnInit(): void {
  }

}
