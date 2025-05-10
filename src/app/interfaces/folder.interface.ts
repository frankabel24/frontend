export interface Folder {
  id: number;
  activo: boolean;
  fecha_registro: Date;
  propietario: string;
  nombre_carpeta: string;
  id_tipo_contenido: 1;
  id_padre: number | null;
}

