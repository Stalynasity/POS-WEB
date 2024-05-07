import { Category } from './../../../responses/category/category.response';
import { name } from '@azure/msal-angular/packageMetadata';

import { Component, OnInit } from '@angular/core';
import { CustomTitleService } from '@shared/services/custom-title.service';
import { fadeInRight400ms } from 'src/@vex/animations/fade-in-right.animation';
import { scaleIn400ms } from 'src/@vex/animations/scale-in.animation';
import { stagger40ms } from 'src/@vex/animations/stagger.animation';
import { CategoryService } from 'src/app/service/category.service';
import { componentSettings } from './category-list-config';
import { CategoryApi } from 'src/app/responses/category/category.response';
import { DatesFilter } from '@shared/functions/actions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CategoryManageComponent } from '../category-manage/category-manage.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'vex-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  animations: [
    stagger40ms,
    scaleIn400ms,
    fadeInRight400ms
  ]
})
export class CategoryListComponent implements OnInit {

  component

  constructor(
    customTitle: CustomTitleService,
    public _categoryServices: CategoryService,
    public _dialog: MatDialog
  ) {
    customTitle.set('Categorias')
  }

  ngOnInit(): void {
    this.component = componentSettings
  }



  setData(data: any = null) {
    this.component.filters.stateFilter = data.value
    this.component.menuOpen = false
    this.formatGetInputs()
  }

  search(data: any) {
    this.component.filters.numFilter = data.searchValue;
    this.component.filters.textFilter = data.searchString;
    this.formatGetInputs()
  }

  dateFilterOpen() {
    DatesFilter(this)
  }

  openDialogRegister() {
    this._dialog.open(CategoryManageComponent, {
      // disavleClose no permite salirse del dialog(cuadro flotante) si esta activado
      disableClose: true,
      width: '400px'

      //con lo siguiente refrescas la tabla list
    }).afterClosed().subscribe((resp) => {
      if (resp) {
        this.formatGetInputs()
      }
    })
  }


  formatGetInputs() {
    let inputs = {
      numFilter: 0,
      textFilter: "",
      stateFilter: null,
      startDate: null,
      endDate: null
    }
    if (this.component.filters.numFilter != "") {
      inputs.numFilter = this.component.filters.numFilter
      inputs.textFilter = this.component.filters.textFilter
    }

    if (this.component.filters.stateFilter != null) {
      inputs.stateFilter = this.component.filters.stateFilter
    }

    if (this.component.filters.startDate != "" && this.component.filters.endDate != "") {
      inputs.startDate = this.component.filters.startDate
      inputs.endDate = this.component.filters.endDate
    }
    this.component.getInputs = inputs
  }

  rowClick(e: any) {
    let action = e.action
    let category = e.row

    switch (action) {
      case "edit":
        this.CategoryEdit(category)
        break;
      case "remove":
        this.CategoryRemove(category)
        break;
    }
    return false;
  }


  CategoryEdit(row: CategoryApi) {
    const dialogConfig = new MatDialogConfig()
    //va a pasar todos los datos de mi category gracias al matDialogConfig
    dialogConfig.data = row

    let dialogRef = this._dialog.open(CategoryManageComponent, {
      data: dialogConfig,
      disableClose: true,
      width: '400px'
    })

    dialogRef.afterClosed().subscribe(
      (resp) => {
        if (resp) {
          this.formatGetInputs()
        }
      }
    )
  }

  CategoryRemove(category: any) {
    console.log('Category ID to remove:', category.categoryId);
    Swal.fire({
      title: `¿Realmente deseas eliminar ${category.name}?${category.categoryId}?`,
      text: "Se borrara de forma permanente",
      icon: "warning",
      showCancelButton: true,
      // focusCancel: true,
      confirmButtonColor: 'rgb(210, 155, 253)',
      confirmButtonText: 'Si, eliminar',
      cancelButtonColor: 'rgb(79, 109, 253)',
      cancelButtonText: 'Cancelar',
      width: 430
    }).then((result) => {
      if (result.isConfirmed) {
        this._categoryServices.CategoryRemove(category.categoryId).subscribe(() => this.formatGetInputs()), (error) => {
          console.error('Error al eliminar la categoría:', error);
          // Agrega aquí la lógica para manejar el error, como mostrar un mensaje de error al usuario.
        };
        console.log(category.categoryId)
      }
    })
  }
}
