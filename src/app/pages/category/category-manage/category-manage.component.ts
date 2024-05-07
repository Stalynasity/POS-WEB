import { Component, Inject, OnInit } from '@angular/core';
import icClose from '@iconify/icons-ic/twotone-close'
import * as configs from '../../../../static-data/configs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertService } from '@shared/services/alert.service';
import { CategoryService } from 'src/app/service/category.service';
import { name } from '@azure/msal-angular/packageMetadata';
import { state } from '@angular/animations';

@Component({
  selector: 'vex-category-manage',
  templateUrl: './category-manage.component.html',
  styleUrls: ['./category-manage.component.scss']
})
export class CategoryManageComponent implements OnInit {

  icClose = icClose;
  configs = configs

  form: FormGroup

  initForm(): void {
    this.form = this._fb.group({
      categoryId: [0, [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      state: ['', [Validators.required]],
    })
  }
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _categoryService: CategoryService,
    //este sirve para hacer seguimiento a mi cuadro emergente, <> ahi ponemos el form donde estamo haciendo el seguimiento
    public _dialogRef: MatDialogRef<CategoryManageComponent>
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.data != null) {
      this.CategoryById(this.data.data.categoryId)
      console.log(this.data)
    }
  }

  //este metodo es para informarle al usuar lo q hizo mal en el form
  CategorySave(): void {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach((controls) => {
        //con ese metodo podemos marcar el input si esta mal
        controls.markAllAsTouched();
      })
    }
    const categoryId = this.form.get('categoryId').value
    if (categoryId > 0) {
      this.CategoryEdit(categoryId)
    } else {
      this.CategoryRegister()
    }
  }

  CategoryById(categoryId: number): void {
    this._categoryService.CategoryByid(categoryId).subscribe(
      (resp)=> {
        this.form.reset({
          categoryId: resp.categoryId,
          name: resp.name,
          description: resp.description,
          state: resp.state
        })
      }
    )
  }

  CategoryEdit(categoryId: number): void {
    this._categoryService.CategoryEdit(categoryId, this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atencion', resp.message)
      }
    })
  }

  CategoryRegister(): void {
    this._categoryService.CategoryRegister(this.form.value).subscribe((resp) => {
      if (resp.isSuccess) {
        this._alert.success('Excelente', resp.message)
        this._dialogRef.close(true)
      } else {
        this._alert.warn('Atencion', resp.message)
      }
    })
  }

}
