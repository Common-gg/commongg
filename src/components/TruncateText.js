import React, { useEffect, useState } from 'react';
import Text from './Text.js';

function TruncateText(props) {

    const [shownText, setShownText] = useState("");
    const [expand, setExpand] = useState(false); //false = button is showing

    const expandButtonStyle = {
        height: 32,
        marginLeft: "auto",
        backgroundColor: "transparent",
        color: "#BF9AFC",
        border: "solid",
        borderRadius: "10px",
        borderColor: "#BF9AFC",
        borderWidth: "2px",
        cursor: "pointer"
    }

    useEffect(() => {
        setExpand(false);
        if (countNumChar(props.text) <= props.maxChars) {
            if (countNumNewLines(props.text) <= props.maxLines) {
                setShownText(props.text);
                setExpand(true);
            } else {
                setShownText(firstLines(props.text) + "...");
            }
        } else {
            if (countNumNewLines(props.text) <= props.maxLines) {
                setShownText(props.text.substring(0, props.maxChars) + "...");
            } else {
                setShownText(firstLines(props.text.substring(0, props.maxChars)) + "...");
            }
        }
    }, [props.text])

    const countNumNewLines = (text) => {
        return text.split(/\r\n|\r|\n/).length;
    }

    const countNumChar = (text) => {
        return text.length;
    }

    const firstLines = (text) => {
        let lines = text.split(/\r\n|\r|\n/);
        let returnText = lines[0];
        var i;
        for (i = 1; i < lines.length && i < props.maxLines; i++) {
            returnText += '\n' + lines[i];
        }
        return returnText;
    }

    const toggleExpand = () => {
        if (expand === false) {
            setShownText(props.text);
            setExpand(true);
        } else {
            setExpand(false);
        }
    }

    const checkExpandButton = (expand) => {
        if (expand === false) {
            return (
                <button onClick={toggleExpand} style={expandButtonStyle}>
                    expand
                </button>
            )
        }
    }

    return (
        <div className="TruncateText">
            <Text text={shownText} style={{ whiteSpace: "pre-wrap" }} />
            {checkExpandButton(expand)}
        </div>
    )
}

export default TruncateText