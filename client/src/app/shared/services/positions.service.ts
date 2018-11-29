import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Position} from "../interfaces";

@Injectable({
  providedIn: 'root'
})

export class PositionsService {

  constructor(private http: HttpClient) {
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/${categoryId}`)
  }

}
