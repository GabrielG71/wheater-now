export interface LocationData {
  city: string;
  country: string;
}

export interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

export interface LocationState {
  data: LocationData | null;
  loading: boolean;
  error: string | null;
}
