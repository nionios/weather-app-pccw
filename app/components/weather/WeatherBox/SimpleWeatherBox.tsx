"use client";
import {WeatherApiResponse} from "@/types";
import {motion} from "framer-motion"
import {FavoriteButton} from "@/app/components/Buttons/FavoriteButton/FavoriteButton";

export const SimpleWeatherBox = (props: { data: WeatherApiResponse }) => {
    return (
        <motion.div
            initial={{y: +200, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{ease: "easeIn", duration: 0.5}}
            className="card shadow rounded bg-blurred bg-opacity-70-white">
            <div className="card-header">
                <h3><span className="me-3">
                        Weather in {props.data.location.name}
                    </span>
                    <FavoriteButton color="black"/>
                </h3>
                <h5>{props.data.location.country}</h5>
                <small>{props.data.location.region}</small>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.data.current.condition.text}</h5>
                <motion.img
                    animate={{
                        scale: [1, 1.5, 1],
                        rotateY: [0, 180, 0],
                        delay: 0.5,
                    }}
                    src={props.data.current.condition.icon}
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
        </motion.div>
    );
}
