import React from "react";
import {
  Divider,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';

import "./styles.css";
import models from "../../modelData/models";

/**
 * Define UserList, a React component of Project 4.
 */
function UserList () {
    const users = models.userListModel();
    return (
      <div>
        <h2>User List</h2>
        <List component="nav">
          {users.map((item) => (
            <div key={item._id}>
              <ListItem >
                      <Link to={`/users/${item._id}`}>
                        {item.first_name}
                      </Link>
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
        <Typography variant="body1">
          The model comes in from models.userListModel()
        </Typography>
      </div>
    );
}

export default UserList;
