'use client';

import {Weather} from "../components/weather/Weather";

export default function WeatherPage() {
    return (
        <div className="container-fluid vh-100 mt-4">
            <div className="d-flex justify-content-center align-items-center flex-column">
                <div className="p-2 m-1 bg-blurred rounded border border-1 text-center shadow">
                    <h1 style={{
                        backgroundClip: 'text',
                        webkitTextFillColor: "transparent",
                        backgroundImage: "linear-gradient(45deg, red, blue)"}}>
                        Super Weather
                    </h1>
                    See what the weather is like anywhere in the world!
                </div>
                <Weather/>
            </div>
        </div>
    );
}
