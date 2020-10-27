import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    /* this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Observable:' , params);
    }); */

  }

}
