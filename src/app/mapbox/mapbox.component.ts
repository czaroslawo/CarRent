import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../enviornments/enviornment';


interface MapboxFeature {
  place_type: string[];
  place_name: string;
}

@Component({
  selector: 'app-mapbox',
  imports: [],
  templateUrl: './mapbox.component.html',
  styleUrl: './mapbox.component.css'
})
export class MapboxComponent implements OnInit {
  map!: mapboxgl.Map;
  marker: mapboxgl.Marker | null = null;

  ngOnInit(): void {
    // (mapboxgl.default as any).accessToken = environment.mapboxToken;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.mapboxToken,
      center: [17.03088, 51.11039],
      zoom: 7,
      attributionControl: false,

    })

    this.map.on('click', (e) =>{
      this.mapClickFn(e.lngLat)
    })
  }

  mapClickFn(coordinates: mapboxgl.LngLat){
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${environment.mapboxToken}&types=place,region,poi,address`;


    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const bestMatch =
          data.features.find((f: MapboxFeature) => f.place_type.includes('address')) ||
          data.features.find((f: MapboxFeature) => f.place_type.includes('place')) ||
          data.features[0]; // fallback na pierwszy dostępny wynik

        if (bestMatch) {
          const address = bestMatch.place_name;
          console.log("Lokalizacja:", address);
          if (this.marker) {
            console.log("przenoszę pinezkę")
            this.marker.setLngLat([coordinates.lng, coordinates.lat]);
          } else {
            console.log("Tworzę nową pinezkę");
            this.marker = new mapboxgl.Marker()
              .setLngLat([coordinates.lng, coordinates.lat])
              .addTo(this.map);
          }
        } else {
          console.log("Nie znaleziono lokalizacji");
        }
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania adresu:", error);
      });

  }
}
