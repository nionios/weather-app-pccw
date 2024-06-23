"use client";
import {useState} from "react";
import styles from "./Weather.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useGetWeatherInfoQuery} from "@/lib/features/weather/weatherApiSlice";
import {SimpleWeatherBox} from "@/app/components/weather/WeatherBox/SimpleWeatherBox";
import {DetailedWeatherBox} from "@/app/components/weather/WeatherBox/DetailedWeatherBox";
import {useAppDispatch} from "@/lib/hooks";
import {setCoords} from "@/lib/features/location/locationSlice";

const locations = ["Athens", "Lisbon", "Kyoto"];

export const Weather = () => {
    const [location, setLocation] = useState("Athens");
    // Using a query hook automatically fetches data and returns query values
    const {data, isError, isLoading, isSuccess} =
        useGetWeatherInfoQuery(location);

    const dispatch = useAppDispatch();

    // By default, diplay simple weather information.
    const [inDetail, setInDetail] = useState(false);
    // Set the functions for the hide/show details buttons
    const showDetails = () => setInDetail(true);
    const hideDetails = () => setInDetail(false);

    if (isError) {
        return (
            <div className="alert alert-danger h5 animate__animated animate__jackInTheBox">
                There was an error with your query
            </div>
        );
    }

    if (isLoading) {
        return (
            <>
                <div className="h5 animate__animated animate__infinite animate__pulse">
                    Loading
                </div>
                <FontAwesomeIcon className={"fa-spin h4"}
                                 icon={faSpinner}></FontAwesomeIcon>
            </>
        );
    }

    if (isSuccess && !inDetail) {
        // Set program global state
        dispatch(setCoords([data.location.lat, data.location.lon]));

        return (
            <>
                <div className={styles.container}>
                    <h3>Select your location:</h3>
                    <button className="rounded btn-3d bg-info white my-2 shadow"
                            onClick={showDetails}>
                        See Details
                    </button>
                    <select
                        className={styles.select}
                        value={location}
                        onChange={(e) => {
                            setLocation(e.target.value);
                        }}>
                        {locations.map((option) => (
                            <option key={option}
                                    value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                    <SimpleWeatherBox data={data}></SimpleWeatherBox>
                </div>
            </>
        );
    } else if (isSuccess) {
        // Set program global state
        dispatch(setCoords([data.location.lat, data.location.lon]));

        return (
            <div className="container">
                <button className="rounded btn-3d bg-info white my-2 shadow"
                        onClick={hideDetails}>
                    Hide Details
                </button>
                <DetailedWeatherBox data={data}></DetailedWeatherBox>
            </div>
        )
    }

    return null;
};
