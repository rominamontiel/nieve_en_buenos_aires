import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  readonly API_BSAS_14DAYS =
    'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,cloudcover,winddirection_10m&forecast_days=14&timezone=auto';
  readonly API_BSAS_7DAYS =
    'https://api.open-meteo.com/v1/forecast?latitude=-34.61&longitude=-58.38&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,cloudcover,winddirection_10m&timezone=auto';
  readonly API_ECUADOR_14DIAS =
    'https://api.open-meteo.com/v1/forecast?latitude=6.28&longitude=-75.77&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,cloudcover,winddirection_10m&forecast_days=14&timezone=auto';
  readonly API_MADRID_14DIAS =
    'https://api.open-meteo.com/v1/forecast?latitude=40.42&longitude=-3.70&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,cloudcover,winddirection_10m&forecast_days=14&timezone=auto';

  constructor(private http: HttpClient) {}

  public getWeather(): Observable<any> {
    return this.http.get(this.API_BSAS_14DAYS);
  }
}
