import { Component, OnInit } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';

export interface Hourly {
  cloudcover: number[];
  precipitation_probability: Array<number>;
  relativehumidity_2m: number[];
  temperature_2m: number[];
  time: string[];
  winddirection_10m: number[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  cloudcover: number[] = [];
  precipitation_probability: number[] = [];
  relativehumidity_2m: number[] = [];
  temperature_2m: number[] = [];
  time: string[] = [];
  winddirection_10m: number[] = [];
  snowProbability: string[] = [];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.weatherService.getWeather().subscribe((datos) => {
      console.log(datos);
      this.cloudcover = datos.hourly.cloudcover;
      this.precipitation_probability = datos.hourly.precipitation_probability;
      this.relativehumidity_2m = datos.hourly.relativehumidity_2m;
      this.temperature_2m = datos.hourly.temperature_2m;
      this.winddirection_10m = datos.hourly.winddirection_10m;
      this.time = datos.hourly.time;

      this.setProbabilityArray();
    });
  }

  setProbabilityArray() {
    const size = this.cloudcover.length;
    let percentage = 0;

    for (let i = 0; i < size; i++) {
      percentage = 0;

      //NUBOSIDAD
      if (this.cloudcover[i] > 40) {
        percentage += 20;
      }

      //LLUVIA
      if (this.precipitation_probability[i] > 0) {
        percentage += 20;
      }

      //HUMEDAD
      if (this.relativehumidity_2m[i] > 65) {
        const hum = this.relativehumidity_2m[i];

        const rango = 100 - 65; // Rango total entre 65 y 100
        const valorPorcentaje = (hum - 65) / rango; // Porcentaje relativo al rango
        const valorFinal = Math.ceil(valorPorcentaje * 19) + 1; // Escalar al rango 1-20

        percentage += valorFinal;
      }

      //VIENTO SUR
      if (
        this.winddirection_10m[i] >= 135 &&
        this.winddirection_10m[i] <= 225
      ) {
        percentage += 20;
      }

      //TEMPERATURA
      if (this.temperature_2m[i] < 4) {
        const temp = this.temperature_2m[i];

        if (temp < -1) {
          percentage += 20;
        } else {
          const rango = 4 - -1;
          const valorPorcentaje = (temp - -1) / rango;
          const valorFinal = (1 - valorPorcentaje) * 19 + 1;
          percentage += valorFinal;
        }
      }

      percentage = percentage == 0 ? 1 : percentage;

      this.snowProbability.push(percentage.toFixed(0) + '%');
    }
  }

  getMoment(i: number): string {
    const hour = new Date(this.time[i]);
    const hourPrev = new Date(this.time[i - 1]);
    let label = '';

    const year = hour.getFullYear();
    const month = hour.getMonth();
    const day = hour.getDate();

    const yearPrev = hourPrev.getFullYear();
    const monthPrev = hourPrev.getMonth();
    const dayPrev = hourPrev.getDate();

    if (year == yearPrev && month == monthPrev && day == dayPrev) {
      label = hour.getHours() + ' hs';
    } else {
      label = day + ' del ' + (month+1) + ' de ' + year + '. ' + hour.getHours() + ' hs';
    }

    return label;
  }
}
