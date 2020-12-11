import React, { useRef } from 'react';
import { popover } from 'bootstrap';

//WORK IN PROGRESS
function ProfilePopover(props) {
    return (
        <div className="ProfilePopover" >
            <button type="button" class="btn btn-lg btn-danger" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>
        </div>
    );
}

export default ProfilePopover;
