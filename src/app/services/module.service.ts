import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContentType } from '../interfaces/content-type.interface';
import { ReportType } from '../interfaces/report-type.interface';
import { Folder } from '../interfaces/folder.interface';
import { Directorio } from '../interfaces/directorio.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private http = inject(HttpClient);
  contentType = signal<ContentType[]>([]);
  reportTypes = signal<ReportType[]>([]);
  carpetas = signal<Folder[]>([]);
  directorio = signal<Directorio[]>([]);

  constructor() {
    this.getCarpetas();
    this.getReportTypes();
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

  //Funcion para obtener todas las carpetas que hay en el sistema
  getCarpetas() {
    this.http.get<Folder[]>(`${environment.folderUrls}`).subscribe((resp) => {
      this.carpetas.set(resp);
      console.log(resp);
    })
  }

  //Funcion para obtener el directorio
  getDirectorio(id: number) {

    const headers = new HttpHeaders({
      'id-tipo-reporte': id
    })

    return this.http.get<Directorio[]>(`${environment.directorioUrls}`, { headers });
  }
}
