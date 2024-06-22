"use client";
import LoginForm from "@/components/LoginForm/LoginForm";
import {useEffect} from "react";

/**
 * If we are on a different page, render login form onto modal with interception instead of navigating to login.
 * This modal disables scrolling once it's rendered.
 * @constructor
 * @returns A Login modal containing a LoginForm component.
 */
export default function LoginModal() {
    // When this modal is visible, disable scrolling.
    useEffect(() => {
        document.body.style.overflow = "hidden"
    });
    return (
        <div className="relative z-40 duration-1000"
             aria-labelledby="modal-title"
             role="dialog"
             aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 blur-lg transition-opacity"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <LoginForm></LoginForm>
            </div>
        </div>
    );
}
