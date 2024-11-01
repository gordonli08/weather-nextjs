export type WeatherData = {
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        humidity: number;
    };
    weather: {
        description: string;
        icon: string;
    }[];
    name: string;

};