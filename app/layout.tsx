"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import {useEffect} from "react";
import { StoreProvider } from "./StoreProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { Nav } from "./components/Nav";
import 'bootstrap/dist/css/bootstrap.css';
import "./styles/globals.css";
import styles from "./styles/layout.module.css";
import 'animate.css';


interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {

  // Always import bootstrap js
  useEffect(()=>{
    import("bootstrap/dist/js/bootstrap");
  },[])

  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <section className={styles.container}>
            <Nav />
            <main className={styles.main}>{children}</main>

            <footer className={styles.footer}>
              <a
                className="h5"
                href="https://linkedin.com/in/nionios"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                &nbsp;nionios
              </a>
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
