"use client";
import {WeatherApiResponse} from "@/types";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faWind} from "@fortawesome/free-solid-svg-icons";
import styles from "../Weather.module.css";
import {motion} from "framer-motion";
import {FavoriteButton} from "@/app/components/Buttons/FavoriteButton/FavoriteButton";

export const DetailedWeatherBox = (props: { data: WeatherApiResponse }) => {
    return (
        <div className="container mt-4">
            <motion.div
                initial={{y: +200, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{ease: "easeIn", duration: 0.5}}
                className="card shadow rounded bg-blurred bg-opacity-70-white">
                <div className="card-header bg-primary text-white">
                    <h3>
                        <span className="me-2">Weather in {props.data.location.name}, {props.data.location.country}</span>
                        <FavoriteButton color="white"/>
                    </h3>
                    <small>{props.data.location.region}</small>
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
                                src={props.data.current.condition.icon}
                                alt={props.data.current.condition.text}/>
                            <h2 className="mt-2">{props.data.current.condition.text}</h2>
                            <p>
                                <strong>Temperature:</strong> {props.data.current.temp_c}°C
                                / {props.data.current.temp_f}°F<br/>
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
                        <div className="col-md-4 d-flex justify-content-end flex-column">
                            <h4>
                                <FontAwesomeIcon icon={faWind}></FontAwesomeIcon>
                                &nbsp;Wind & Pressure
                            </h4>
                            <p>
                                <strong>Wind:</strong> {props.data.current.wind_mph} mph
                                ({props.data.current.wind_kph} kph)
                                from {props.data.current.wind_dir} ({props.data.current.wind_degree}°)<br/>
                                <strong>Gusts:</strong> {props.data.current.gust_mph} mph
                                ({props.data.current.gust_kph} kph)<br/>
                                <strong>Pressure:</strong> {props.data.current.pressure_mb} mb
                                ({props.data.current.pressure_in} in)<br/>
                                <strong>Cloud Cover:</strong> {props.data.current.cloud}%<br/>
                                <br/>
                            </p>
                        </div>
                        <div className="col-md-4 d-flex justify-content-end flex-column">
                            <h4>
                                <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                                &nbsp;Precipitation & Visibility
                            </h4>
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
            </motion.div>
        </div>
    );
}
