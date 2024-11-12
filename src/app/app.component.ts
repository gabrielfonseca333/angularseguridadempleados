import { Component, OnInit } from '@angular/core';
import { ServiceAuth } from './services/service.auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  constructor(private _serviceAuth: ServiceAuth){}

  public mostrarMenuLogin! : boolean

  ngOnInit(): void {

    this.mostrarMenuLogin=true
    
    if(this._serviceAuth.getToken()==null){
      this.mostrarMenuLogin=true
      console.log(this._serviceAuth.getToken())
    }else{
      this.mostrarMenuLogin=false
    }
  }


}
