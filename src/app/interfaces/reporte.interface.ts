export interface Reporte {
  id: number;
  activo: boolean;
  fecha_registro: Date;
  titulo_reporte: string;
  realizado_por: string;
  descripcion: string;
  filtros: string;
  campos_seleccionados: string;
  id_tipo_contenido: 2;
  id_padre: number;
  id_tipo_reporte: number;
}
