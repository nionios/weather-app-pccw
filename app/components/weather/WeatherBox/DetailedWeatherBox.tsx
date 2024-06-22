"use client";
import {WeatherApiResponse} from "@/types";

export const DetailedWeatherBox = (props: {data: WeatherApiResponse }) => {
    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h3>Weather in {props.data.location.name}, {props.data.location.country}</h3>
                    <small>{props.data.location.region}</small>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={props.data.current.condition.icon}
                                 alt={props.data.current.condition.text}
                                 className="img-fluid"/>
                            <h5 className="mt-2">{props.data.current.condition.text}</h5>
                            <p>
                                <strong>Temperature:</strong> {props.data.current.temp_c}°C / {props.data.current.temp_f}°F<br/>
                                <strong>Feels Like:</strong> {props.data.current.feelslike_c}°C
                                / {props.data.current.feelslike_f}°F<br/>
                                <strong>Wind Chill:</strong> {props.data.current.windchill_c}°C
                                / {props.data.current.windchill_f}°F<br/>
                                <strong>Heat Index:</strong> {props.data.current.heatindex_c}°C
                                / {props.data.current.heatindex_f}°F<br/>
                                <strong>Dew Point:</strong> {props.data.current.dewpoint_c}°C
                                / {props.data.current.dewpoint_f}°F<br/>
                                <strong>Humidity:</strong> {props.data.current.humidity}%<br/>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h6>Wind & Pressure</h6>
                            <p>
                                <strong>Wind:</strong> {props.data.current.wind_mph} mph ({props.data.current.wind_kph} kph)
                                from {props.data.current.wind_dir} ({props.data.current.wind_degree}°)<br/>
                                <strong>Gusts:</strong> {props.data.current.gust_mph} mph
                                ({props.data.current.gust_kph} kph)<br/>
                                <strong>Pressure:</strong> {props.data.current.pressure_mb} mb
                                ({props.data.current.pressure_in} in)<br/>
                                <strong>Cloud Cover:</strong> {props.data.current.cloud}%<br/>
                            </p>
                        </div>
                        <div className="col-md-4">
                            <h6>Precipitation & Visibility</h6>
                            <p>
                                <strong>Precipitation:</strong> {props.data.current.precip_mm} mm
                                ({props.data.current.precip_in} in)<br/>
                                <strong>Visibility:</strong> {props.data.current.vis_km} km
                                ({props.data.current.vis_miles} miles)<br/>
                                <strong>UV Index:</strong> {props.data.current.uv}<br/>
                                <strong>Local Time:</strong> {props.data.location.localtime}<br/>
                                <strong>Last Updated:</strong> {props.data.current.last_updated}<br/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    Coordinates: {props.data.location.lat}, {props.data.location.lon} (Timezone: {props.data.location.tz_id})
                </div>
            </div>
        </div>
    );
}
