import { NextRequest, NextResponse } from 'next/server';

export async function GET(
    req: NextRequest,
) {
    const searchParams = req.nextUrl.searchParams
    const city = searchParams.get('city');

    if (!city) {
        return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    try {
        const url = `${process.env.WEATHER_API_URL}?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            return NextResponse.json(
                { error: `Weather data fetch failed for city: ${city}` },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 500 });      
    }
}