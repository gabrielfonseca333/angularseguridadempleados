import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable, tap } from "rxjs";

@Injectable()
export class ServiceAuth {


  constructor(private _http: HttpClient) { }

  //metodo para inicar sesion
  login(usuario: string, password: string): Observable<any> {

    let credenciales = {
      "userName": usuario,
      "password": password
    }

    let json = JSON.stringify(credenciales);
    let header = new HttpHeaders();
    header=header.set("Content-Type","application/json");

    let request = "auth/login";
    let url = environment.urlApiEmpleados + request;


    return this._http.post(url ,json, {headers: header} ).pipe(
      tap(response=>{
        
        const token = (response as { response: string }).response;
        console.log("🪅🪅🪅", token)

        if (token) {
          localStorage.setItem("token", token);  // Guarda el token en localStorage
        } else {
          console.warn("No se encontró el token en la respuesta.");
        }
      })
    );
  }

  getEmpleadoPerfil():Observable<any> {
    let header = new HttpHeaders();
    header=header.set("Content-Type","application/json");
    header=header.set("Authorization","Bearer " + this.getToken());
    let request = "api/empleados/perfilempleado";
    let url = environment.urlApiEmpleados + request;

    return this._http.get(url, {headers: header});

  }

  getSubordinados():Observable<any> {
    let header = new HttpHeaders();
    header=header.set("Content-Type","application/json");
    header=header.set("Authorization","Bearer " + this.getToken());
    let request = "api/empleados/subordinados";
    let url = environment.urlApiEmpleados + request;

    return this._http.get(url, {headers: header});
  }


  //metodo para obtener el token de acceso
  getToken():string | null {
    return localStorage.getItem("token");
  }

}