import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private rootUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
    private filter = new BehaviorSubject<any>({});
    public filter$ = this.filter.asObservable();
    constructor(private http: HttpClient){}

    getData(param) {
        return this.http.get(this.rootUrl, {
            params: param
        });
    }

    public setParams(param) {
        this.filter.next(param);
    }
}
