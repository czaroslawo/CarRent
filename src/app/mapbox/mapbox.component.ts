import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {environment} from '../../environment/environment';



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
export class MapboxComponent implements OnInit, AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef<HTMLDivElement>;
  map!: mapboxgl.Map;

  marker: mapboxgl.Marker | null = null;

  @Output() addressSelected = new EventEmitter<string>();
  @Output() citySelected = new EventEmitter<string>();

  @Input() address!: string;

  ngAfterViewInit(): void {
    this.map = new mapboxgl.Map({
      container: this.mapContainer.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      accessToken: environment.mapboxToken,
      center: [17.03088, 51.11039],
      zoom: 7,
      attributionControl: false,

    })

    this.map.on('load', () => {
      this.map.resize();
    });

    this.map.on('click', (e) => {
      this.mapClickFn(e.lngLat)
    })
  }

  ngOnInit(): void {
    let lng;
    let lat;
    // if(this.address != ''){
    //   console.log(this.address);
    //   const encodedAddress = encodeURIComponent(this.address);
    //   console.log("encodedAddress:", encodedAddress);
    //   console.log(encodedAddress);
    //   const url = `https://api.mapbox.com/search/geocode/v6/forward?place=${encodedAddress}&access_token=${environment.mapboxToken}&language=pl`;
    //   fetch(url)
    //   .then(res => res.json())
    //     .then(data => {
    //       console.log('data:', data)
    //       lng = data.features[0].geometry.coordinates[0];
    //       lat = data.features[0].geometry.coordinates[1];
    //       console.log(lng, lat)
    //       this.map = new mapboxgl.Map({
    //         container: this.mapContainer.nativeElement,,
    //         style: 'mapbox://styles/mapbox/streets-v11',
    //         accessToken: environment.mapboxToken,
    //         center: [lng!, lat!],
    //         zoom: 7,
    //         attributionControl: false,
    //         interactive: false,
    //
    //       })
    //     })
    // }else{
    //   this.map = new mapboxgl.Map({
    //     container: this.mapContainer.nativeElement,,
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     accessToken: environment.mapboxToken,
    //     center: [17.03088, 51.11039],
    //     zoom: 7,
    //     attributionControl: false,
    //
    //   })
    // }
  // to wyzej działa ale komentuje żeby mi nie pobierało hajsu przy testowaniu strony XD


    // this.map = new mapboxgl.Map({
    //   container: 'map',
    //   style: 'mapbox://styles/mapbox/streets-v11',
    //   accessToken: environment.mapboxToken,
    //   center: [17.03088, 51.11039],
    //   zoom: 7,
    //   attributionControl: false,
    //
    // })
    //
    //
    //
    // this.map.on('click', (e) => {
    //   this.mapClickFn(e.lngLat)
    // })
  }

  mapClickFn(coordinates: mapboxgl.LngLat) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${coordinates.lng},${coordinates.lat}.json?access_token=${environment.mapboxToken}&language=pl&types=place,region,poi,address`;


    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        const bestMatch =
          data.features.find((f: MapboxFeature) => f.place_type.includes('address')) ||
          data.features.find((f: MapboxFeature) => f.place_type.includes('place')) ||
          data.features[0];

        if (bestMatch) {
          const address = bestMatch.place_name;
          const city = this.extractCityFromFeature(bestMatch);
          this.citySelected.emit(city);
          this.addressSelected.emit(address);
          if (this.marker) {
            this.marker.setLngLat([coordinates.lng, coordinates.lat]);
          } else {
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

  extractCityFromFeature(feature: any): string {
    if (!feature) return "Nieznana lokalizacja";
    const cityContext = feature.context?.find((c: any) =>
      c.id.startsWith("place.")
    );

    const cityFromSelf =
      feature.place_type?.includes("place") ? feature.text : null;

    const city = cityContext?.text || cityFromSelf;

    return city || "Nieznane miasto";
  }


}
