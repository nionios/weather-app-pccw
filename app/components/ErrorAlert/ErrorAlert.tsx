/**
 * @returns An alert informing the user for an error.
 * @param props
 * @param props.errorText {string} A string describing the error to the user.
 * @constructor
 */
export default function ErrorAlert (props: {errorText: string}) {
    return (
        <div className="text-center py-4 lg:px-4">
            <div className="p-2 bg-red-800 items-center text-red-100 leading-none rounded-lg flex lg:inline-flex"
                 role="alert">
                <span className="flex rounded-lg bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                    Error!
                </span>
                <span className="error-text font-semibold mr-2 text-left flex-auto">
                    {props.errorText}
                </span>
            </div>
        </div>
    );
}
