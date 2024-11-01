"use client"

import Input from "./components/Input";
import { useState } from "react";
import { WeatherData } from "./types/weather";
import Image from "next/image";
import LoadingSpinner from "./components/LoadingSpinner";

const Home = () => {
    const [city, setCity] = useState('');
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

            const jsonData = await response.json()
            console.log(jsonData);
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
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData(null);
        if (city) fetchWeather(city);
        setCity('');
    };

    return (
        <div className="bg-cover bg-gradient-to-r from-blue-500 to-blue-300 h-screen">
            <div className="bg-white/25 w-full rounded-lg flex flex-col h-fit">
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
            </div>
            {loading && <LoadingSpinner />}
            {error && (
                <div className="mt-2 bg-white/25 w-full rounded-lg flex flex-col h-2/4 text-center">
                    <div className="mt-2 text-white">
                        {error}
                    </div>
                </div>)}
            {data && (
                <div className="mt-2 bg-white/25 w-full rounded-lg flex flex-col h-2/4 items-center">
                    <div className="mt-2 text-white">
                        <div className="text-3xl">{data.name}</div>
                        <Image
                            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt={data.weather[0].description}
                            width={100}
                            height={100}
                        />
                        <div className="text-base">{data.weather[0].description}</div>
                        <div className="text-2xl" >{Math.round(data.main.temp)}° C</div>
                        <div>{Math.round(data.main.temp_max)}° / {Math.round(data.main.temp_min)}° Feels like {Math.round(data.main.feels_like)}°</div>
                        <div>Humidity: {data.main.humidity}%</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;