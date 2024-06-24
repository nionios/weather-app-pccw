/**
 * A progress bar made with Bootstrap v5.3
 * @param props.bgColor {string} The color of the progress bar
 * @param props.width {string} The width of the progress bar (% out of 100)
 * @param props.displayText {string} The text that will be displayed on the progress bar
 * @constructor
 */
export const ProgressBar = (props: {bgColor: string, width: string, displayText: string}) => {

    return (
        <div class="progress my-1 shadow"
             style={{backgroundColor: "rgba(255,255,255,0.2)"}}>
                <span className="progress-bar progress-bar-striped animate-on-hover progress-bar-animated"
                      role="progressbar"
                      style={{filter: 'drop-shadow(2px 0px 10px white)', width: `${props.width}%`,  backgroundColor: `${props.bgColor}`}}>
                          {props.displayText}
                </span>
        </div>
    );
}
