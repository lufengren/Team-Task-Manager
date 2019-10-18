import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProjectService } from '../../service/project.service';
import { Subject, Observable } from 'rxjs';
import { IProject } from '../../domain';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private searchTerms = new Subject<string>();
  results$: Observable<IProject[]>;
  constructor(private projectService: ProjectService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit() {
    this.results$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.projectService.search(term)));
  }

}
