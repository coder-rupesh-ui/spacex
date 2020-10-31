import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    private rootUrl = 'https://api.spaceXdata.com/v3/launches?limit=100';
    constructor(private http: HttpClient){}

    getData(param) {
        return this.http.get(this.rootUrl, {
            params: param
        });
    }
}
