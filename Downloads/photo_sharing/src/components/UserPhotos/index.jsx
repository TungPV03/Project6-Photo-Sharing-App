import React from "react";

import "./styles.css";
import {useParams} from "react-router-dom";
import models from "../../modelData/models";
import Modal from "../PortalModal/userModal";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos () {
    const user = useParams();
    const photos = models.photoOfUserModel(user.userId);
    const userName = models.userModel(user.userId).first_name;
    return (
      <div className="photos-area">
        <Modal>
              <span style={{ fontWeight: 'bold',fontSize: "20px" }}>Photos of {userName}</span>
        </Modal>
        {photos.map(photo => (
          <div key={photo._id} className="photos-container">
            <span>{photo.date_time}</span>
            <img src={`${process.env.PUBLIC_URL}/images/${photo.file_name}`} alt="" />
            <div className="photo-detail">
            <span style={{textAlign: "center", textTransform: "uppercase", fontStyle: "italic"}}>Comments</span>
              {photo.comments && photo.comments.map(comment => (
                  <div key={comment._id} className="comment">
                    <span className="cmt-date">{comment.date_time}
                    </span>
                    <span className="cmt-content">
                      <span className="cmt-user">{comment.user.first_name}: </span>
                      "{comment.comment}"
                    </span>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    );
}

export default UserPhotos;
