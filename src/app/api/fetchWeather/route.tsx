import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
) {
    console.log(req)
    const { searchParams } = new URL(req.url);
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    try {
        const url = `${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        console.log(data);
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });      
    }
}