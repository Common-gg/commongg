import React from 'react';
import Text from '../Text.js';
import IconButton from '../IconButton.js';

function Comment(props) {

    const convertNum = (val) => {
        let editedVal = val;
        if (editedVal > 1000000) {
            editedVal = Math.round(val / 100000) / 10;
            return (editedVal + "mil");
        }
        if (editedVal > 1000) {
            editedVal = Math.round(val / 100) / 10;
            return (editedVal + "k");
        } else {
            return editedVal;
        }
    }

    return (
        <div className="Comment">
            <div className="container">
                <div className="row">
                    <Text text={props.comment.user} />
                </div>
                <div className="row">
                    <Text text={props.comment.time} />
                </div>
                <div className="row">
                    <Text text={props.comment.text} />
                </div>
                <div className="row">
                    <div className="col-2">
                        <IconButton class="fa fa-smile-o" text={convertNum(props.comment.likes)} />
                    </div>
                    <div className="col-2">
                        <IconButton class="fa fa-frown-o" text={convertNum(props.comment.dislikes)} />
                    </div>
                    <div className="col-4">

                    </div>
                    <div className="col-2">
                        <IconButton class="fa fa-comment-o" text={convertNum(props.comment.numComments)} />
                    </div>
                    <div className="col-2">
                        <IconButton class="fa fa-share-alt" text="" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-10">
                        {console.log(props.comment)}
                        {/*put nested comments here*/}
                        {props.comment.comments.map(comment => {
                            return (
                                <div className="commentBorder">
                                    <Comment comment={comment} />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
