
import { Component, effect, inject, Injector, input, OnInit, output, runInInjectionContext, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, switchMap, tap } from 'rxjs';
import { FormUtils } from '../../utils/form-utils';

@Component({
  selector: 'app-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
})
export class FilterComponent implements OnInit {

  opcionesCampo = [
    'Facultad',
    'Grupo',
    'Edad',
  ]



  signoOptions = [
    'Mayor',
    'Igual',
    'Menor'
  ]



  Facultad = [
    'FTE',
    'FTL',
    'CITEC',
    'FTI',
  ]

  Grupo = [
    'IDFT101',
    'IDFT102',
    'IDFT103',
    'IDFT104',
    'IDFT201',
    'IDFT202',
    'IDFT203',
    'IDFT204',
    'IDFT301',
    'IDFT302',
    'IDFT303',
    'IDFT304',
    'IDFT401',
    'IDFT402',
    'IDFT403',
    'IDFT404',
  ]


  Edad = [
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
  ]

  filtros = input<string>();
  fb = inject(FormBuilder);
  formUtils = FormUtils;
  campos = signal(this.opcionesCampo);
  valores = signal<string[]>([]);
  filtroString = signal('');
  nuevosFiltros = signal('');
  filtrosSeleccionados = output<string>();
  #injector = inject(Injector);



  myForm: FormGroup = this.fb.group({
    campo: ['', Validators.required],
    signo: ['', Validators.required],
    valor: ['', Validators.required]
  })

  ngOnInit() {
    runInInjectionContext(this.#injector, () => {
      effect(() => {
        const currentValue = this.filtros();
        if (currentValue) {
          this.filtroString.update(prev => currentValue);
          console.log(this.nuevosFiltros())
        }
      });
    });
  }


  getValoresByCampo(campo: string) {
    switch (campo) {
      case 'Facultad':
        return [...this.Facultad]; // Crear una copia del array
      case 'Edad':
        return [...this.Edad];
      default:
        return [...this.Grupo];
    }
  }


  onFormChanged = effect((onCleanUp) => {
    const campoSubscription = this.onCampoChanged();

    onCleanUp(() => {
      campoSubscription.unsubscribe();
    })
  });

  onCampoChanged() {
    return this.myForm.get('campo')!.valueChanges.pipe(
      tap(() => this.myForm.get('valor')!.setValue('')),
      tap(() => this.valores.set([])),
      switchMap(campo => {
        const valores = this.getValoresByCampo(campo);
        return of(valores);
      })
    ).subscribe((valores) => {
      this.valores.set(valores);
      console.log(this.valores());
    });
  };

  borrarFiltro() {
    this.filtroString.set('');
  }

  adicionarAlFiltro(palabra: string) {
    this.filtroString.update(prev => prev ? `${prev} ${palabra}` : '');
  }


  onAdicionar() {
    this.myForm.markAllAsTouched();
    if (this.myForm.valid) {
      const campo = this.myForm.get('campo')!.value;
      const signo = this.myForm.get('signo')!.value;
      const valor = this.myForm.get('valor')!.value;

      const nuevoFiltro = `${campo} ${signo} ${valor}`;
      this.filtroString.update(prev => prev ? `${prev} ${nuevoFiltro}` : nuevoFiltro);

      this.emitirOutput(this.filtroString());
    }
  }

  emitirOutput(filtros: string) {
    this.filtrosSeleccionados.emit(filtros);
  }
}







