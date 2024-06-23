import {motion} from "framer-motion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarFilled} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";
import {useState} from "react";

export const FavoriteButton = (props: { color: string }) => {
    const [currentIcon, setCurrentIcon] = useState<FontAwesomeIcon>(faStarEmpty);

    // Switch the icon images when clicking the icon
    const handleStarChange = () => {
        if (currentIcon !== faStarFilled) {
            setCurrentIcon(faStarFilled);
        } else {
            setCurrentIcon(faStarEmpty);
        }
    }

    return (
        <motion.button
            style={{background: 'transparent', border: 0, filter: "drop-shadow(2px 2px 5px gray)"}}
            whileTap={{scale: 0.8, rotate: '72deg'}}
            onClick={() => {
                handleStarChange()
            }}>
            <FontAwesomeIcon style={{color: props.color}}
                             icon={currentIcon}></FontAwesomeIcon>
        </motion.button>
    );
}
