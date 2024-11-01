"use client"

import Input from "./components/Input";
import { useState } from "react";
import { WeatherData } from "./types/weather";
import Image from "next/image";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = () => {
    const [city, setCity] = useState<string>('');
    const [data, setData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeather = async (cityName: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(
                `/api/fetchWeather?city=${encodeURI(cityName)}`
            );
            if (!response.ok) throw new Error('City not found');

            const jsonData = await response.json();
            setData(jsonData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData(null);
        if (city) fetchWeather(city);
        setCity('');
    };

    return (
        <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
            <header className="bg-white/25 w-full rounded-lg flex flex-col h-fit" role="banner">
                <div className="flex flex-col md:flex-row justify-between items-center p-12">
                    <Input
                        city={city}
                        onChange={(e) => setCity(e.target.value)}
                        onSubmit={handleSubmit}
                    />
                    <h1 className="text-xl mb-8 md:mb-0 order-1 text-white py-2 px-4 rounded-xl italic font-bold">
                        Just a Weather App.
                    </h1>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center" role="main">
                {loading && (
                    <div role="status" aria-live="polite">
                        <LoadingSpinner />
                        <span className="sr-only">Loading weather data...</span>
                    </div>
                )}
                
                {error && (
                    <div role="alert" aria-live="assertive" className="mt-2 bg-white/25 w-full rounded-lg flex flex-col h-2/4 text-center">
                        <div className="mt-2 text-white">
                            {error}
                        </div>
                    </div>
                )}

                {data && (
                    <section
                        className="mt-2 bg-white/25 w-full rounded-lg flex flex-col h-2/4 items-center"
                        aria-label="Weather Information"
                    >
                        <div className="my-4 text-white">
                            <h2 className="text-3xl" aria-label={`City name: ${data.name}`}>{data.name}</h2>
                            <Image
                                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                                alt={`Weather icon: ${data.weather[0].description}`}
                                width={100}
                                height={100}
                                className="my-2"
                            />
                            <p className="text-base" aria-label="Weather description">{data.weather[0].description}</p>
                            <p className="text-2xl" aria-label="Temperature">
                                {Math.round(data.main.temp)}° C
                            </p>
                            <p aria-label="Temperature range">
                                {Math.round(data.main.temp_max)}° / {Math.round(data.main.temp_min)}° Feels like {Math.round(data.main.feels_like)}°
                            </p>
                            <p aria-label="Humidity">Humidity: {data.main.humidity}%</p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};

export default Home;
