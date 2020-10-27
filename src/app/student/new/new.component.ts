import { OnInit, Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
    console.log('Constrcutor');
  }

  async ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log('Prams:' , params);
    });

    try {
      const params = await this.activatedRoute.params.pipe(take(1)).toPromise();
      console.log('params: ', params);
    } catch (error) {
      console.error(error);
    }
  }
}
