import { Folder } from "./folder.interface";
import { Reporte } from "./reporte.interface";

// export interface Directorio {
//   id_carpeta: number;
//   nombre: string;
//   propietario: string;
//   carpetas_hija: Directorio[];
//   reportes: Reporte[];
// }
export interface Directorio {
  carpeta: Folder;
  carpetas_hija: Directorio[];
  reportes: Reporte[];
}







