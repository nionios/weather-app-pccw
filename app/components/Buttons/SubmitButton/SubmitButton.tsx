"use client";

export default function SubmitButton(props: { buttonText: string }) {
    return (
        <button type="submit"
                className="btn-animate btn-submit btn-red flex w-full justify-center rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">
            {props.buttonText}
        </button>
    );
}
