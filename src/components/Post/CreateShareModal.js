import React, { useState } from 'react';

function CreateShareModal(props) {
  return (
    <div className="CreateShareModal">
      <div className="modal fade">
        <div className="modal-dialog">
          <div className="modal-header">
            <h5 className="modal-title">Share this post</h5>
            <btn></btn>
          </div>
          <div className="modal-body">
            <div className="card">
              <div className="card-body">
                <a>This is where a link to the post will be.</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateShareModal;