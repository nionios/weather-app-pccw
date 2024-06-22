"use client";
import {WeatherApiResponse} from "@/types";

export const SimpleWeatherBox = (props: {data: WeatherApiResponse }) => {
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header">
                    <h3>Weather in {props.data.location.name}, {props.data.location.country}</h3>
                    <small>{props.data.location.region}</small>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{props.data.current.condition.text}</h5>
                    <img src={props.data.current.condition.icon}
                         alt={props.data.current.condition.text}/>
                    <p className="card-text">
                        <strong>Temperature:</strong> {props.data.current.temp_c}°C / {props.data.current.temp_f}°F<br/>
                        <strong>Feels Like:</strong> {props.data.current.feelslike_c}°C
                        / {props.data.current.feelslike_f}°F<br/>
                        <strong>Wind:</strong> {props.data.current.wind_mph} mph ({props.data.current.wind_kph} kph)
                        from {props.data.current.wind_dir}<br/>
                        <strong>Pressure:</strong> {props.data.current.pressure_mb} mb
                        ({props.data.current.pressure_in} in)<br/>
                        <strong>Humidity:</strong> {props.data.current.humidity}%<br/>
                        <strong>Cloud Cover:</strong> {props.data.current.cloud}%<br/>
                        <strong>Visibility:</strong> {props.data.current.vis_km} km
                        ({props.data.current.vis_miles} miles)<br/>
                        <strong>UV Index:</strong> {props.data.current.uv}<br/>
                        <strong>Last Updated:</strong> {props.data.current.last_updated}
                    </p>
                </div>
            </div>
        </div>
    );
}
