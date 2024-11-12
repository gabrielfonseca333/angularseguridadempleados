import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServiceAuth } from '../../services/service.auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public token: string | null = null;

  @ViewChild('cajausuario') cajausuario!: ElementRef;
  @ViewChild('cajapassword') cajapassword!: ElementRef;

  constructor(private _authservice: ServiceAuth,
              private _router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {

    let usuario = this.cajausuario.nativeElement.value;
    let password = this.cajapassword.nativeElement.value;


    this._authservice.login(usuario, password).subscribe({
      next: () => {
        this.token = this._authservice.getToken(); // Obtén el token de localStorage y almacénalo en la variable `token`
        console.log('⭐Token:', this.token);
        this._router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('❌Error de autenticación', error);
      }
    });
  }

}
