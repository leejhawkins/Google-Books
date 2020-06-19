import React from "react";

function Thumbnail(props) {
    return (
        <div role="img">
            <img className="border border-info" alt={props.title} src={props.image}/>
        </div>
    )
}

export default Thumbnail;