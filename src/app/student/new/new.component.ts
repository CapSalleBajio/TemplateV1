import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements
  OnInit,
  OnChanges,
  AfterViewInit,
  AfterContentInit,
  AfterContentChecked,
  OnDestroy,
  AfterViewChecked {
  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit: ');
  }

  ngOnChanges() {
    console.log('ngOnChanges: ');
  }

  /* ngDoCheck() {
    console.log('ngDoCheck: ');
  } */

  ngAfterViewInit() {
    console.log('ngAfterViewInit: ');
  }

  ngAfterViewChecked() {
    console.log('ngAfterViewChecked: ');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit: ');
  }

  ngAfterContentChecked() {
    console.log('ngAfterContentChecked: ');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy: ');
  }


}
