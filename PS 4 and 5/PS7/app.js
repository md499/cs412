// app.component.ts
import { Component } from '@angular/core';
import { ApiService } from './api.service';


@Component({
    selector: 'app-root',
    template: `
        <div>
            <app-search-form (search)="search($event)"></app-search-form>
            <app-search-result [results]="searchResults"></app-search-result>
        </div>
    `,
})
export class AppComponent {
    searchResults: any[];

    constructor(private apiService: ApiService) {}

    search(searchTerm: string) {
        if (searchTerm.length > 1) {
            this.apiService.searchData(searchTerm).subscribe((results) => {
                this.searchResults = results;
            });
        }
    }
}

// search-form.component.ts
import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-search-form',
    template: `
        <form (submit)="submitForm()">
            <input type="text" [formControl]="searchTermControl" placeholder="Enter search term" />
            <button type="submit" [disabled]="searchTermControl.invalid">Search</button>
        </form>
    `,
})
export class SearchFormComponent {
    @Output() search = new EventEmitter<string>();
    searchTermControl = new FormControl('', [Validators.required, Validators.minLength(2)]);

    submitForm() {
        if (this.searchTermControl.valid) {
            this.search.emit(this.searchTermControl.value);
        }
    }
}

// search-result.component.ts
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-search-result',
    template: `
        <div *ngIf="results && results.length > 0">
            <h2>Search Results:</h2>
            <ul>
                <li *ngFor="let result of results">{{ result }}</li>
            </ul>
        </div>
        <div *ngIf="!results || results.length === 0">
            No results found.
        </div>
    `,
})
export class SearchResultComponent {
    @Input() results: any[];
}

// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    constructor(private http: HttpClient) {}

    searchData(searchTerm: string): Observable<any[]> {
        return this.http.get<any[]>(`/api/search?term=${searchTerm}`);
    }
}
