"use client";
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import {useGetWeatherInfoQuery} from "@/lib/features/weather/weatherApiSlice";
import {SimpleWeatherBox} from "@/app/components/weather/WeatherBox/SimpleWeatherBox";
import {DetailedWeatherBox} from "@/app/components/weather/WeatherBox/DetailedWeatherBox";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {
    selectLocation,
    selectStatus,
    setCoords,
    setErrored,
    setLoading,
    setSuccess,
    setWeatherData
} from "@/lib/features/location/locationSlice";
import {LocationSearch} from "@/app/components/weather/LocationSearch/LocationSearch";

export const Weather = () => {
    // By default, diplay simple weather information.
    const [inDetail, setInDetail] = useState(false);
    // Set the functions for the hide/show details buttons
    const showDetails = () => setInDetail(true);
    const hideDetails = () => setInDetail(false);

    // Get location name from global state
    const location = useAppSelector(selectLocation)
    // Get weather data from global state
    //const weatherData = useAppSelector(selectWeatherData);
    // Get application status from global state
    const applicationStatus = useAppSelector(selectStatus);

    let {data, isError, isLoading, isSuccess} = useGetWeatherInfoQuery(location);
    // Dispatch the location name and coordinates to global state.
    const dispatch = useAppDispatch();

    if (isError) {
        dispatch(setErrored(true))
        return (
            <>
                <LocationSearch/>
                {JSON.stringify(location)}
                <div className="alert alert-danger h5 animate__animated animate__jackInTheBox">
                    There was an error with your query
                </div>
            </>
        );
    }

    if (isLoading) {
        dispatch(setLoading(true))
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
        dispatch(setSuccess(true))
        dispatch(setWeatherData(data))
        dispatch(setCoords([data.location.lat, data.location.lon]));
        return (
            <div className="container">
                <LocationSearch/>
                <button className="rounded btn-3d bg-info white my-2 shadow"
                        onClick={showDetails}>
                    See Details
                </button>
                <SimpleWeatherBox data={data}></SimpleWeatherBox>
            </div>
        );
    } else if (isSuccess) {
        dispatch(setSuccess(true))
        dispatch(setWeatherData(data))
        dispatch(setCoords([data.location.lat, data.location.lon]));
        return (
            <div className="container">
                <LocationSearch/>
                <button className="rounded btn-3d bg-info white my-2 shadow"
                        onClick={hideDetails}>
                    Hide Details
                </button>
                <DetailedWeatherBox data={data}></DetailedWeatherBox>
            </div>
        )
    } else {
        return (
            <div className="container">
                <LocationSearch/>
            </div>
        )
    }

    return null;
};
