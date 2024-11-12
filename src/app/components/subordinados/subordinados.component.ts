import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from '../../services/service.auth';
import { Empleado } from '../../models/empleado';

@Component({
  selector: 'app-subordinados',
  templateUrl: './subordinados.component.html',
  styleUrl: './subordinados.component.css'
})
export class SubordinadosComponent implements OnInit{

  ngOnInit(): void {
      this.getSubordinados()
  }

  public subordinados!: Array<Empleado>

  constructor(private _service: ServiceAuth) { }

  getSubordinados():void{
    this._service.getSubordinados().subscribe(res=>{
      this.subordinados = res;
    })
  }
}
