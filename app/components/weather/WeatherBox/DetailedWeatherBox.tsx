"use client";
import {LocationData, WeatherApiResponse, WeatherData} from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faWind} from "@fortawesome/free-solid-svg-icons";
import styles from "../Weather.module.css";
import {motion} from "framer-motion";
import {FavoriteButton} from "@/app/components/Buttons/FavoriteButton/FavoriteButton";

export const DetailedWeatherBox = (props: { weatherData: WeatherData, locationData: LocationData }) => {
    return (
        <div className="container mt-4">
            <motion.div
                initial={{y: +200, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{ease: "easeIn", duration: 0.5}}
                className="card shadow rounded bg-blurred bg-opacity-70-white">
                <div className={`card-header text-white ${styles.bgPrimaryBlurred}`}>
                    <h3>
                        <span className="me-2">Weather in {props.locationData.name}, {props.locationData.country}</span>
                        <FavoriteButton color="white"/>
                    </h3>
                    <small>{props.locationData.region}</small>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4 d-flex justify-content-end flex-column">
                            <motion.img
                                animate={{
                                    scale: [1, 1.5, 1],
                                    rotateY: [0, 180, 0],
                                    delay: 0.5,
                                }}
                                width={100}
                                src={props.weatherData.condition.icon}
                                alt={props.weatherData.condition.text}/>
                            <h2 className="mt-2">{props.weatherData.condition.text}</h2>
                            <p>
                                <strong>Temperature:</strong> {props.weatherData.temp_c}°C
                                / {props.weatherData.temp_f}°F<br/>
                                <strong>Feels Like:</strong> {props.weatherData.feelslike_c}°C
                                / {props.weatherData.feelslike_f}°F<br/>
                                <strong>Wind Chill:</strong> {props.weatherData.windchill_c}°C
                                / {props.weatherData.windchill_f}°F<br/>
                                <strong>Heat Index:</strong> {props.weatherData.heatindex_c}°C
                                / {props.weatherData.heatindex_f}°F<br/>
                                <strong>Dew Point:</strong> {props.weatherData.dewpoint_c}°C
                                / {props.weatherData.dewpoint_f}°F<br/>
                                <strong>Humidity:</strong> {props.weatherData.humidity}%<br/>
                            </p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end flex-column">
                            <h4>
                                <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
                                &nbsp;Wind & Pressure
                            </h4>
                            <p>
                                <strong>Wind:</strong> {props.weatherData.wind_mph} mph
                                ({props.weatherData.wind_kph} kph)
                                from {props.weatherData.wind_dir} ({props.weatherData.wind_degree}°)<br/>
                                <strong>Gusts:</strong> {props.weatherData.gust_mph} mph
                                ({props.weatherData.gust_kph} kph)<br/>
                                <strong>Pressure:</strong> {props.weatherData.pressure_mb} mb
                                ({props.weatherData.pressure_in} in)<br/>
                                <strong>Cloud Cover:</strong> {props.weatherData.cloud}%<br/>
                                <br/>
                            </p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end flex-column">
                            <h4>
                                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                &nbsp;Precipitation & Visibility
                            </h4>
                            <p>
                                <strong>Precipitation:</strong> {props.weatherData.precip_mm} mm
                                ({props.weatherData.precip_in} in)<br/>
                                <strong>Visibility:</strong> {props.weatherData.vis_km} km
                                ({props.weatherData.vis_miles} miles)<br/>
                                <strong>UV Index:</strong> {props.weatherData.uv}<br/>
                                <strong>Local Time:</strong> {props.locationData.localtime}<br/>
                                <strong>Last Updated:</strong> {props.weatherData.last_updated}<br/>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="card-footer text-muted">
                    Coordinates: {props.locationData.lat}, {props.locationData.lon} (Timezone: {props.locationData.tz_id})
                </div>
            </motion.div>
        </div>
    );
}
