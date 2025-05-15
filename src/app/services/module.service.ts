import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ContentType } from '../interfaces/content-type.interface';
import { ReportType } from '../interfaces/report-type.interface';
import { Folder } from '../interfaces/folder.interface';
import { Directorio } from '../interfaces/directorio.interface';
import { BehaviorSubject } from 'rxjs';
import { Reporte } from '../interfaces/reporte.interface';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private http = inject(HttpClient);
  contentType = signal<ContentType[]>([]);
  reportTypes = signal<ReportType[]>([]);
  carpetas = signal<Folder[]>([]);
  elemento = signal<{ id: number, tipo: 'carpeta' | 'reporte' }>({ id: 0, tipo: 'carpeta' });
  reporte = signal<Reporte>({} as Reporte);
  private currentType: 'listado' | 'cuantitativo' | 'cruzado' = 'listado';

  constructor() {
    this.getCarpetas();
    this.getReportTypes();
  }


  getContentTypes() {
    this.http.get<ContentType[]>(`${environment.contentTypeUrls}`).subscribe((resp) => {
      this.contentType.set(resp);
    })
  }

  getReportTypes() {
    this.http.get<ReportType[]>(`${environment.reportTypeUrls}`).subscribe((resp) => {
      this.reportTypes.set(resp);
    })
  }

  //Funcion para obtener todas las carpetas que hay en el sistema
  getCarpetas() {
    this.http.get<Folder[]>(`${environment.folderUrls}`).subscribe((resp) => {
      this.carpetas.set(resp);
    })
  }

  //Funcion para obtener el directorio
  getDirectorio(id: number) {

    const headers = new HttpHeaders({
      'id-tipo-reporte': id
    })

    return this.http.get<Directorio[]>(`${environment.directorioUrls}`, { headers });
  }


  obtenerCarpetaById(id: number) {
    return this.http.get<Folder>(`${environment.folderUrls}${id}/`)
  }

  obtenerReporteById(id: number) {
    return this.http.get<Reporte>(`${environment.reportUrls}${id}/`)
  }

  obtenerElemento(elemento: { id: number, tipo: 'carpeta' | 'reporte' }): void {

    if (elemento.tipo === 'reporte') {
      this.obtenerReporteById(elemento.id).subscribe((resp) => {
        this.reporte.set(resp);
      });
      this.elemento.set({ id: this.reporte().id_padre, tipo: 'reporte' });
    }
    this.elemento.set(elemento);
  }


  //Funcion que ayuda con las rutas dinamicas
  setType(type: 'listado' | 'cuantitativo' | 'cruzado') {
    this.currentType = type;
  }

  getType() {
    return this.currentType;
  }

  getReportePath() {
    const paths = {
      listado: 'nuevo-reporte-listado',
      cuantitativo: 'nuevo-reporte-cuantitativo',
      cruzado: 'nuevo-reporte-cruzado'
    };
    return paths[this.currentType];
  }

  agregarReporte(reporte: any) {
    this.http.post(`${environment.reportUrls}`, reporte);
  }
}
