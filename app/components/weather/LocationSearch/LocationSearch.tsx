import styles from "@/app/components/weather/Weather.module.css";
import {useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {setLocationName} from "@/lib/features/location/locationSlice";

const cities = ["Athens", "Lisbon", "London", "Tokyo", "Kyoto"];

export const LocationSearch = () => {
    // Using a query hook automatically fetches data and returns query values
    const [location, setLocation] = useState("Athens");
    // Dispatch the location name and coordinates to global state.
    const dispatch = useAppDispatch();

    const locationChange = (inputLocation) => {
        setLocation(inputLocation);
        dispatch(setLocationName(inputLocation));
    }

    return (
        <>
            <h3>Select your location:</h3>
            <select
                className={styles.select}
                value={location}
                onChange={(e) => locationChange(e.target.value)}>
                {cities.map((option) => (
                    <option key={option}
                            value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </>
    );
}
