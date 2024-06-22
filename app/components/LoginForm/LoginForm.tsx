"use client";
import {FormEvent, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";

export default function LoginForm() {
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
        <form class="form-signin form-horizontal"
              method="post"
              role="form"
              data-toggle="validator">
            <input type="hidden"
                   id="referringUrl"
                   name="referringUrl"
                   value="{{referringUrl}}"/>
            <fieldset class="form-group floating-label-form-group">
                <label for="user-name">Username</label>
                <input
                    type="text"
                    id="userName"
                    name="userName"
                    class="form-control valueChecker"
                    placeholder="Enter Username"
                    required
                    autofocus/>
            </fieldset>
            <fieldset class="form-group floating-label-form-group mb-1">
                <label for="password">Password</label>
                <div class="input-group">
                    <input type="password"
                           id="password"
                           name="password"
                           placeholder="Enter Password"
                           class="form-control valueChecker rounded-right"
                           required/>
                    <button id="toggle-password"
                            className="border-0"
                            type="button"
                            aria-label="Show password as plain text. Warning: this will display your password on the screen.">
                    </button>
                </div>
            </fieldset>
            <input type="hidden"
                   id="recaptcha-response"
                   name="recaptcha-response"/>
            <div id="login-error"
                 class="hidden alert alert-danger mb-2"
                 role="alert">
                <strong>Error logging in</strong>
            </div>
            <button id="loginForm"
                    type="submit"
                    class="btn btn-outline-primary btn-block">
                <fontAwesomeIcon icon={faLock}></fontAwesomeIcon>
                Login
            </button>
        </form>
    );
}
