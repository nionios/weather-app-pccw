import {useState} from "react";
import {useAppDispatch} from "@/lib/hooks";
import {useDebounce} from "use-debounce";
import {setLocationName} from "@/lib/features/location/locationSlice";
import {Variants} from "framer-motion";


const cities = ["Athens", "Lisbon", "London", "Tokyo", "Kyoto"];


const itemVariants: Variants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {type: "spring", stiffness: 300, damping: 24}
    },
    closed: {opacity: 0, y: 20, transition: {duration: 0.2}}
};

export const LocationSearch = () => {
    // Using a query hook automatically fetches data and returns query values
    const [location, setLocation] = useState("Athens");
    // Dispatch the location name and coordinates to global state.
    const dispatch = useAppDispatch();

    const locationChange = (inputLocation) => {
        setLocation(inputLocation);
        dispatch(setLocationName(inputLocation));
    }

    const [query, setQuery] = useState("");
    // Debounce value before inputting
    const [debouncedQuery] = useDebounce(query, 500);

    const [isOpen, setIsOpen] = useState(false);


    return (
        <div className="input-group w-50 w-md-100 mb-3 mt-5">
            <input
                type="text"
                className="form-control bg-blurred m-2 rounded"
                placeholder="Type your location here..."
                aria-label="Location Query"
                aria-describedby="button-addon2"
                value={query}
                onChange={event => setQuery(event.target.value)}
            />
            <button className="btn btn-3d btn-outline-secondary bg-info rounded m-2 bg-blurred"
                    onClick={() => {
                        locationChange(debouncedQuery)
                    }}>
                Search
            </button>
        </div>
    );
}
