import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
import 'rxjs/add/observable/throw';

import { City } from '../models/city.model';



@Injectable()
export class CityService {

  private cityJsonUrl = 'app/mock/city.json';

  constructor(private http: Http) {}

  getCitys(): Observable<City[]> {
    return this.http.get(this.cityJsonUrl)
              .map((res)      => { return res.json(); })
              .map((resJson)     => {
                if(!resJson.result.isSucceed)
                  throw new Error('API Error');
                return resJson.result.list;
              })
              .catch((error)  => { return Observable.throw(error.message); });
  }
}
