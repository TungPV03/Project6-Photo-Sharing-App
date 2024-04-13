import React from "react";

import "./styles.css";
import {Link, useParams} from "react-router-dom";
import models from "../../modelData/models";
import Modal from "../PortalModal/userModal";

/**
 * Define UserDetail, a React component of Project 4.
 */
function UserDetail() {
    const user = useParams();
    const userInfor = models.userModel(user.userId);
    return (
        <>
          <div className="user-detail-container">
            <h2>User Information</h2>
            <p className="user-detail"><span className="label">ID: </span>{userInfor._id}</p>
            <p className="user-detail"><span className="label">First Name: </span>{userInfor.first_name}</p>
            <p className="user-detail"><span className="label">Last Name: </span>{userInfor.last_name}</p>
            <p className="user-detail"><span className="label">Location: </span>{userInfor.location}</p>
            <p className="user-detail"><span className="label">Description: </span>{userInfor.description}</p>
            <p className="user-detail"><span className="label">Occupation: </span>{userInfor.occupation}</p>
            <Link to={`/photos/${user.userId}`}>Photos shared by {userInfor.first_name}</Link>
            <Modal>
              <span style={{ fontWeight: 'bold',fontSize: "20px" }}>{userInfor.first_name}</span>
            </Modal>
          </div>
        </>
    );
}

export default UserDetail;
