import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContentType } from '../interfaces/content-type.interface';
import { ReportType } from '../interfaces/report-type.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private http = inject(HttpClient);
  contentType = signal<ContentType[]>([]);
  reportTypes = signal<ReportType[]>([]);

  constructor() {
    this.getReportTypes();
    this.getContentTypes();
  }


  getContentTypes() {
    this.http.get<ContentType[]>(`${environment.contentTypeUrls}`).subscribe((resp) => {
      this.contentType.set(resp);
      console.log(this.contentType());
    })
  }

  getReportTypes() {
    this.http.get<ReportType[]>(`${environment.reportTypeUrls}`).subscribe((resp) => {
      this.reportTypes.set(resp);
      console.log(this.reportTypes());
    })
  }

}
