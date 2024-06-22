"use client";
import SubmitButton from "@/components/Buttons/SubmitButton/SubmitButton";
import KarieraLogo from "@/components/KarieraLogo/KarieraLogo";
import {FormEvent, useState} from "react";
import axios from "axios";
import ErrorAlert from "@/components/ErrorAlert/ErrorAlert";

export default function LoginForm () {
    const [errorText, setError] = useState('');

    const submitFunction = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const config = {
            url: '/api/auth',
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            data: new FormData(event.currentTarget)
        }
        axios(config)
            .then((response) => {
                if (response.data.authFail) {
                    setError("Wrong Password and/or Email.");
                } else if (response.status === 200) {
                    document.location.href = '/home';
                } else {
                    setError("Server Error, please try again later.");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };


    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 z-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome!
                </h2>
                <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account.
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form id="loginForm"
                      onSubmit={submitFunction}
                      className="space-y-6">
                    <div>
                    <label htmlFor="email"
                               className="block text-sm font-medium leading-6 text-gray-900">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input id="email"
                                   name="email"
                                   type="email"
                                   autoComplete="email"
                                   required
                                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password"
                                   className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        </div>
                        <div className="mt-2">
                            <input id="password"
                                   name="password"
                                   type="password"
                                   autoComplete="password"
                                   required
                                   className="block w-full font-mono rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div>
                        {errorText === '' ? null : <ErrorAlert errorText={errorText}/>}
                        <SubmitButton buttonText="Log In"/>
                    </div>
                </form>
            </div>
        </div>
    );
}
