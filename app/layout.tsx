"use client";

import type {ReactNode} from "react";
import {useEffect} from "react";
import {StoreProvider} from "./StoreProvider";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/globals.css";
import 'animate.css';
import {Body} from "@/app/body/Body";


interface Props {
    readonly children: ReactNode;
}

export default function RootLayout({children}: Props) {

    // Always import bootstrap js
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, [])

    return (
        <StoreProvider>
            <html lang="en">
                <Body children={children} />
            </html>
        </StoreProvider>
    );
}
