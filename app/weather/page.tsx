'use client';

import {Weather} from "../components/weather/Weather";
import {useAppSelector} from "@/lib/hooks";
import {selectCoords} from "@/lib/features/location/locationSlice";
import {useEffect, useState} from "react";

export default function WeatherPage() {

    let lonAndLat = useAppSelector(selectCoords);

    const googleMapsAPIKey = "AIzaSyDkXsE1zfNo5PTeapsdHBCfpVyNVCn8cjU";
    const googleMapsURL = `https://maps.googleapis.com/maps/api/staticmap?key=${googleMapsAPIKey}&zoom=5&size=1000x1000&center=${lonAndLat[0]},${lonAndLat[1]}&maptype=satellite`;

    return (
        <div style={{
            width: "100vw",
            height: "100vh",
            backgroundSize: "cover",
            backgroundImage: `url(${googleMapsURL})`
        }}>
            <h1>Weather page</h1>
            <p>This page is intended to showcase the weather API.</p>
            <Weather/>
        </div>
    );
}
