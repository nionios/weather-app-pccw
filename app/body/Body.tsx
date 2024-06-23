import styles from "@/app/styles/layout.module.css";
import {Nav} from "@/app/components/Nav";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLinkedin} from "@fortawesome/free-brands-svg-icons";
import {useAppSelector,useProgressiveImage} from "@/lib/hooks";
import {selectCoords} from "@/lib/features/location/locationSlice";
import {motion} from "framer-motion";

export const Body = ({children}: Props) => {
    let lonAndLat = useAppSelector(selectCoords);

    const googleMapsAPIKey = "AIzaSyDkXsE1zfNo5PTeapsdHBCfpVyNVCn8cjU";
    const googleMapsURL = `https://maps.googleapis.com/maps/api/staticmap?key=${googleMapsAPIKey}&zoom=8&size=1000x1000&scale=2&center=${lonAndLat[0]},${lonAndLat[1]}&maptype=satellite`;

    const loadedBackgroundImage = useProgressiveImage(googleMapsURL);

    return (
        <motion.body
            animate={{
                backgroundPosition: [5, -5]
            }}
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(${loadedBackgroundImage})`
            }}>
            <section className={styles.container}>
                <main className={styles.main}>{children}</main>
                <footer className={styles.footer}>
                    <a
                        className="h5"
                        href="https://linkedin.com/in/nionios"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <FontAwesomeIcon icon={faLinkedin}/>
                        &nbsp;nionios
                    </a>
                </footer>
            </section>
        </motion.body>
    );
}
