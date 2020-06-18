import React from "react";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
export function LinkBtn(props) {
    return (
        <span className="btn btn-danger" {...props} role="button">
            Go to Link
        </span>
    );
}