"use client";
import {useState} from "react";
import styles from "./Weather.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useGetWeatherInfoQuery} from "@/lib/features/weather/weatherApiSlice";
import {SimpleWeatherBox} from "@/app/components/weather/WeatherBox/SimpleWeatherBox";
import {DetailedWeatherBox} from "@/app/components/weather/WeatherBox/DetailedWeatherBox";
const options = [5, 10, 20, 30];

export const Weather = () => {
    const [numberOfQuotes, setNumberOfQuotes] = useState(10);
    // Using a query hook automatically fetches data and returns query values
    const {data, isError, isLoading, isSuccess} =
        useGetWeatherInfoQuery("Athens");

    // By default, diplay simple weather information.
    const [inDetail, setInDetail] = useState(false);

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
        return (
            <div className={styles.container}>
                <h3>Select the Quantity of Quotes to Fetch:</h3>
                <select
                    className={styles.select}
                    value={numberOfQuotes}
                    onChange={(e) => {
                        setNumberOfQuotes(Number(e.target.value));
                    }}>
                    {options.map((option) => (
                        <option key={option}
                                value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <SimpleWeatherBox data={data}></SimpleWeatherBox>
            </div>
        );
    } else if (isSuccess) {
        return (
            <DetailedWeatherBox data={data}></DetailedWeatherBox>
        )
    }

    return null;
};
