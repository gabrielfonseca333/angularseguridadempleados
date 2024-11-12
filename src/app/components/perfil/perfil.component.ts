import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from '../../services/service.auth';
import { consumerMarkDirty } from '@angular/core/primitives/signals';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {

  constructor(private _authservice: ServiceAuth) { }
  
  public empleado!: Empleado;

  ngOnInit(): void {

    this.loadPerfil()


  }

  loadPerfil(): void {
    this._authservice.getEmpleadoPerfil().subscribe({
      next: (response) => {
        this.empleado = response;
        console.log("💡",this.empleado);
      },
      error: (error) => {
        console.error('❌Error de carga de perfil', error);
      }
    });
  }
}
