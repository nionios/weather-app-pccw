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
import {Swiper, SwiperSlide} from 'swiper/react';
import {EffectCards} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/effect-cards';


export const Weather = () => {
    // By default, diplay simple weather information.
    const [inDetail, setInDetail] = useState(false);
    // Set the functions for the hide/show details buttons
    const showDetails = () => setInDetail(true);
    const hideDetails = () => setInDetail(false);

    // By default, diplay simple weather information ON CARDS (opposite of spread out mode).
    const [spreadOutMode, setSpreadOutMode] = useState(false);
    // Set the functions for the hide/show details buttons
    const spreadOutCards = () => setSpreadOutMode(true);
    const showCards = () => setSpreadOutMode(false);

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
                <div className="alert alert-danger h5 animate__animated animate__jackInTheBox">
                    There was an error with your query!
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
            <div className="container-fluid d-flex justify-items-center align-items-center flex-column">
                <LocationSearch/>
                <button className="rounded btn-3d bg-info white my-2 shadow"
                        onClick={showDetails}>
                    See Details
                </button>
                {spreadOutMode ?
                    <>
                        <button className="rounded btn-3d bg-info white my-2 shadow"
                                onClick={showCards}>
                            See cards
                        </button>
                        <Swiper
                            slidesPerView={'auto'}
                            spaceBetween={30}
                            grabCursor={true}
                            style={{
                                left: 0,
                                width: '97vw',
                                maxHeight: '700px'
                            }}
                            key={1}>
                            <SwiperSlide style={{
                                maxWidth: '400px',
                                maxHeight: '700px'
                            }}>
                                <SimpleWeatherBox weatherData={data.current}
                                                  locationData={data.location}
                                                  day={"Today"}/>
                            </SwiperSlide>
                            {data['forecast']['forecastday'].map((day) => (
                                <SwiperSlide style={{
                                    maxWidth: '400px',
                                    maxHeight: '700px'
                                }}>
                                    <SimpleWeatherBox weatherData={day['hour'][0]}
                                                      locationData={data.location}
                                                      day={day['date']}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                    :
                    <>
                        <button className="rounded btn-3d bg-info white my-2 shadow"
                                onClick={spreadOutCards}>
                            Spread Out Cards
                        </button>
                        <Swiper
                            effect={'cards'}
                            grabCursor={true}
                            key={2}
                            modules={[EffectCards]}
                            style={{
                                maxWidth: '400px',
                                maxHeight: '700px'
                            }}>
                            <SwiperSlide>
                                <SimpleWeatherBox weatherData={data.current}
                                                  locationData={data.location}
                                                  day={"Today"}/>
                            </SwiperSlide>
                            {data['forecast']['forecastday'].map((day) => (
                                <SwiperSlide>
                                    <SimpleWeatherBox weatherData={day['hour'][0]}
                                                      locationData={data.location}
                                                      day={day['date']}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                }
            </div>
        )
            ;
    } else if (isSuccess) {
        dispatch(setSuccess(true))
        dispatch(setWeatherData(data))
        dispatch(setCoords([data.location.lat, data.location.lon]));
        return (
            <div className="container d-flex justify-items-center align-items-center flex-column">
                <LocationSearch/>
                <button className="rounded btn-3d bg-info white my-2 shadow"
                        onClick={hideDetails}>
                    Hide Details
                </button>
                <DetailedWeatherBox weatherData={data.current}
                                    locationData={data.location}/>
            </div>
        )
    } else {
        return (
            <div className="container d-flex justify-items-center align-items-center flex-column">
                <LocationSearch/>
            </div>
        )
    }

    return null;
};
