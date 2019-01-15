import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private keyword;
  @Output() emitKeyword = new EventEmitter();
  private searchTerm: FormControl = new FormControl();
  constructor() { }

  ngOnInit() {
    this.emitKeyword.emit(this.searchTerm.valueChanges);
  }

}
