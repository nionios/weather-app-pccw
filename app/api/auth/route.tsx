import {NextRequest, NextResponse} from "next/server";
import axios from "axios";

/**
 * API to call endpoint to login uses and get JWT token, which is then stored in cookies with response.
 * @param request {NextRequest}
 * @constructor
 * @returns apiResponse {NextResponse}
 */
export async function POST(request : NextRequest) {
    const body = await request.json();
    const config = {
        url: `${process.env.endpointURL}/api/login`,
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            email: body.email,
            password: body.password,
        },
    }

    let endpointResponse;
    try {
        endpointResponse = await axios(config);
    } catch (error) {
        console.error(error);
        return NextResponse.json({authFail: true});
    }

    // Make apiResponse to pass to front-end
    const apiResponse = NextResponse.json(
        {},
        {status: 200}
    );
    // Get relevant info from endpoint response (token string and expiration date)
    const token = endpointResponse.data.token.accessToken;
    const userEmail = endpointResponse.data.user.email;
    // FIXME: Endpoint returns "fistname" instead of "firstName"
    const userFirstName = endpointResponse.data.user.fistName;
    const userLastName = endpointResponse.data.user.lastName;
    const expirationDate = new Date(endpointResponse.data.token.expiresIn);

    // Set all cookies with user info.
    apiResponse.cookies.set({
        name: "token",
        value: token,
        expires: expirationDate,
        path: "/",
    });
    apiResponse.cookies.set({
        name: "userEmail",
        value: userEmail,
        expires: expirationDate,
        path: "/",
    });
    apiResponse.cookies.set({
        name: "userFirstName",
        value: userFirstName,
        expires: expirationDate,
        path: "/",
    });
    apiResponse.cookies.set({
        name: "userLastName",
        value: userLastName,
        expires: expirationDate,
        path: "/",
    });

    return apiResponse;
}
