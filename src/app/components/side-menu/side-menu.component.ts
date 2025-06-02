// import { Component, inject, OnInit } from '@angular/core';
// import { ModuleService } from '../../services/module.service';
// import { SideMenuContentComponent } from "./side-menu-content/side-menu-content.component";
// import { SideMenuItemComponent } from './side-menu-reports/side-menu-item.component';

// @Component({
//   selector: 'app-side-menu',
//   templateUrl: 'side-menu.component.html',
//   imports: [SideMenuContentComponent, SideMenuItemComponent]
// })

// export class SideMenuComponent {
//   moduloService = inject(ModuleService)

import { Component, inject, OnInit, signal } from '@angular/core';
import { ModuleService } from '../../services/module.service';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
// Asume que tienes una interfaz para tus elementos de menú, similar a la de Next.js
interface MenuItem {
  id: string;
  label: string;
  href?: string;
  children?: MenuItem[];
}

@Component({
  selector: 'app-side-menu',
  templateUrl: 'side-menu.component.html',
  imports: [RouterLink, RouterLinkActive, CommonModule]
})
export class SideMenuComponent implements OnInit {
  moduloService = inject(ModuleService);
  router = inject(Router);

  // Estado para controlar si el sidebar está abierto (para la versión móvil)
  open = signal(false);

  // Estado para el elemento de menú activo
  activeItem = signal<string>('');

  // Estado para los elementos de menú expandidos
  expandedItems = signal<string[]>([]);


  menuItems: MenuItem[] = [
    { id: 'dashboard', label: 'Inicio', href: '/dashboard-cuantitativo' },
    {
      id: 'reportes-nominales',
      label: 'Reportes Nominales',
      children: [
        { id: 'reporte-cuantitativo', label: 'Cuantitativo', href: '/dashboard-cuantitativo/Cuantitativo' },
        { id: 'reporte-listado', label: 'Listado', href: '/dashboard-listado/Listado' },
        { id: 'reporte-cruzado', label: 'Cruzado', href: '/dashboard-cruzado/Cruzado' }
      ],
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      children: [
        { id: 'contenidos', label: 'Tipos de Contenido', href: '/tipos-contenido' },
        { id: 'reportes', label: 'Tipos de Reportes', href: '/tipos-reportes' },
      ],
    },
  ];

  ngOnInit() {
    // Escuchar cambios en la ruta para determinar el elemento activo y expandir padres
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.findActiveItemAndExpandParents(this.router.url);
    });

    // Inicializar el estado activo al cargar el componente
    this.findActiveItemAndExpandParents(this.router.url);
  }

  // Método para alternar la expansión de un elemento de menú
  toggleExpand(itemId: string) {
    this.expandedItems.update(current =>
      current.includes(itemId) ? current.filter(i => i !== itemId) : [...current, itemId]
    );
  }

  // Método para encontrar el elemento activo y expandir sus padres
  private findActiveItemAndExpandParents(currentPath: string) {
    let foundActiveId: string = '';
    let foundParentId: string | undefined;

    const findItem = (items: MenuItem[]): { activeId: string; parentId?: string } => {
      for (const item of items) {
        if (item.href === currentPath) {
          return { activeId: item.id };
        }
        if (item.children) {
          const childMatch = item.children.find(child => child.href === currentPath);
          if (childMatch) {
            return { activeId: childMatch.id, parentId: item.id };
          }
        }
      }
      return { activeId: '' };
    };

    const { activeId, parentId } = findItem(this.menuItems);
    this.activeItem.set(activeId);

    // Expandir automáticamente el menú padre si existe y no está ya expandido
    if (parentId && !this.expandedItems().includes(parentId)) {
      this.expandedItems.update(prev => [...prev, parentId]);
    }
  }

  // Método para alternar la visibilidad del sidebar (útil para móviles)
  toggleSidebar() {
    this.open.update(current => !current);
  }

}
