export type AlertsData = {
  city: string;
  timezone: string;
  timestamp: number;
  
  frost: {
    temp: number;
    time: string;
    isFrost: boolean;
    description: string;
    humidity: number;
  };

  heat: {
    isHeat: boolean;
    isExtreme: boolean;
    maxTemp: number;
    humidity: number;
    description: string;
  };

  rain: {
    isRain: boolean;
    totalRain: number;
    rainHours: number;
    willRainAll: boolean;
  };

  watering: {
    recommendation: string | null;
    shouldWater: boolean;
    emoji: string | null;
  };

  fromCache?: boolean;
};

export type WeatherData = {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  city: string;
  fromCache?: boolean;
};