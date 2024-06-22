/**
 * User information object that contains all the personal info of user returned from endpoint.
 */
export type UserInfo = {
    userLastName: string | undefined,
    userEmail: string | undefined,
    userFirstName: string | undefined,
}

/**
 * The type of the JobBoxes
 */
export type JobBoxType = {
    props: {
        id: number;
        companyName: string;
        address: string;
        createdAt: number;
        validUntil: number;
        title: string;
        description: string;
    }
}


// Setup the type for the API response.
interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Condition {
    text: string;
    icon: string;
    code: number;
}

interface Current {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: Condition;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
}

interface WeatherData<TLocation, TCurrent> {
    location: TLocation;
    current: TCurrent;
}

export type WeatherApiResponse = WeatherData<Location, Current>;
