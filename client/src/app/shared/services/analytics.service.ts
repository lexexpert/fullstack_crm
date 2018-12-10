import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {AnalyticsPage, OverviewPage} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  constructor(private http: HttpClient){}

  getOverview(): Observable<OverviewPage>{
    return this.http.get<OverviewPage>('/api/analytics/overview')
  }

  getAnalytics(): Observable<AnalyticsPage>{
    return this.http.get<AnalyticsPage>('/api/analytics/analytics')
  }
}
