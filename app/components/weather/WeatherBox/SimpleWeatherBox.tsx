"use client";
import {LocationData, WeatherData} from "@/types";
import {motion} from "framer-motion"
import styles from "../Weather.module.css";
import {FavoriteButton} from "@/app/components/Buttons/FavoriteButton/FavoriteButton";
import {ProgressBar} from "@/app/components/Progress/ProgressBar";

export const SimpleWeatherBox = (props: { weatherData: WeatherData, locationData: LocationData, day: string }) => {

    /**
     * @param value {number} value out of a 100 that will be used to calculate color to signify extreme conditions
     */
    const colorDeterminator = (value) => {
        let redValue;
        let greenValue;
        let blueValue;
        // Normalization on 255, linear interpolation on red and blue, keep green steady
        redValue = Math.round((value / 100) * 255);
        // (For temperatures) If a temp is below zero, do not use green
        if (value >= 0) {
            greenValue = 100;
        } else {
            greenValue = 0;
        }
        blueValue = Math.round((1 - value / 100) * 255);

        return `rgba(${redValue}, ${greenValue}, ${blueValue})`;
    };

    return (
        <motion.div
            initial={{y: +200, opacity: 0}}
            animate={{y: 0, opacity: 1}}
            transition={{ease: "easeIn", duration: 0.5}}
            className="card shadow rounded">
            <div className={`card-header text-white ${styles.bgPrimaryBlurred}`}>
                <h3><span className="me-3">
                        Weather in {props.locationData.name}
                    </span>
                    <FavoriteButton color="white"/>
                </h3>
                <h4>{props.day}</h4>
                <h5>{props.locationData.country}</h5>
                <small>{props.locationData.region}</small>
            </div>
            <div className="card-body bg-blurred bg-opacity-70-white">
                <h5 className="card-title">{props.weatherData.condition.text}</h5>
                <motion.img
                    animate={{
                        scale: [1, 1.5, 1],
                        rotateY: [0, 180, 0],
                        delay: 0.5,
                    }}
                    src={props.weatherData.condition.icon}
                    alt={props.weatherData.condition.text}/>
                <div className="card-text">
                    <div>
                        {/*A temp that would be 100% is here 50C (or -50)*/}
                        <strong>Temperature:</strong> {props.weatherData.temp_c}°C / {props.weatherData.temp_f}°F
                        <ProgressBar bgColor={colorDeterminator(2 * props.weatherData.temp_c)}
                                     width={2 * props.weatherData.temp_c}
                                     displayText={`${props.weatherData.temp_c}°C`}/>
                    </div>
                    <div>
                        <strong>Feels Like:</strong> {props.weatherData.feelslike_c}°C
                        / {props.weatherData.feelslike_f}°F
                        <ProgressBar bgColor={colorDeterminator(2 * props.weatherData.feelslike_c)}
                                     width={2 * props.weatherData.feelslike_c}
                                     displayText={`${props.weatherData.feelslike_c}°C`}/>
                    </div>
                    <div>
                        <strong>Wind:</strong> {props.weatherData.wind_mph} mph ({props.weatherData.wind_kph} kph)
                        from {props.weatherData.wind_dir}
                        {/*According to the Beaufort Scale, 73 mph wind is a hurricane, so we treat it ass 100 so width is multiplied by 1,39 (100/73)*/}
                        <ProgressBar bgColor={colorDeterminator(1.39 * props.weatherData.wind_mph)}
                                     width={1.39 * props.weatherData.wind_mph}
                                     displayText={`${props.weatherData.wind_mph}mph`}/>
                    </div>
                    <div>
                        <strong>Pressure:</strong> {props.weatherData.pressure_mb} mb
                        ({props.weatherData.pressure_in} in)
                        {/*Atmospheric pressure is roughly /20 because lowest eye-of-the-tornado pressure is 870 and highest mountain-peak pressure is 1080 (ever recorded)*/}
                        <ProgressBar bgColor={colorDeterminator(props.weatherData.pressure_mb / 20)}
                                     width={props.weatherData.pressure_mb / 20}
                                     displayText={`${props.weatherData.pressure_mb}mb`}/>
                    </div>
                    <div>
                        <strong>Humidity:</strong> {props.weatherData.humidity}%
                        <ProgressBar bgColor={colorDeterminator(props.weatherData.humidity)}
                                     width={props.weatherData.humidity}
                                     displayText={`${props.weatherData.humidity}%`}/>
                    </div>
                    <div>
                        <strong>Cloud Cover:</strong> {props.weatherData.cloud}%
                        <ProgressBar bgColor={colorDeterminator(props.weatherData.cloud)}
                                     width={props.weatherData.cloud}
                                     displayText={`${props.weatherData.cloud}%`}/>
                    </div>
                    <div>
                        <strong>UV Index:</strong> {props.weatherData.uv}
                        {/*UV of 10 is extreme*/}
                        <ProgressBar bgColor={colorDeterminator(10 * props.weatherData.uv)}
                                     width={10 * props.weatherData.uv}
                                     displayText={`${props.weatherData.uv}`}/>
                    </div>
                    {props.weatherData.last_updated ?
                        <div>
                            <strong>Last Updated:</strong> {props.weatherData.last_updated}
                        </div>
                        : null}
                </div>
            </div>
        </motion.div>
    );
}
