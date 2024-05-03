import { useState } from "react";
import "./CreatePost.css";
import { MDBBtn } from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import API from "../../API";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const goTo = useNavigate();

  const handleCreatPost = (title, content, img, goTo) => {
    if(title === "" || content === ""){
      alert("Empty title or content!");
    }
    else{
      dispatch(API.createPost(title, content, img, goTo));
    }
  };

  const hanleClick = () => {
    goTo("/home");
  }

  const exContent ="ex. Soluta voluptate eum quos amet. Corporis aliquam accusantium laborum ducimus saepe eaque quae. Assumenda eum perferendis molestiae id neque quidem perferendis ab.";

  return (
    <div className="create-post" style={{backgroundImage: 'url(/img/contact-bg.jpg)'}}> 
        <button className="backward" onClick={hanleClick}>
            <FontAwesomeIcon icon={faArrowAltCircleLeft} className="backward-icon"/>
        </button>
        <div className="create-post-container">
            <h1 className="cp-title">Create a post</h1>
            <label htmlFor="title-inp" className="title-label">
            Title:
            </label>
            <input
              className="text-inp"
              id="title-inp"
              type="text"
              placeholder="ex. Lorem Ipsum Title"
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="textarea-content">Content:</label>
            <textarea
                className="text-inp"
              name="content"
              id="textarea-content"
              cols="30"
              rows="10"
              placeholder= {exContent}
              onChange={(e) => setContent(e.target.value)}
            />
            <div className="img-upload">
            <input type="file" onChange={(e) => setImg(e.target.files[0])} />
            </div>
            <MDBBtn
              className="me-1"
              color="success"
              onClick={() => handleCreatPost(title, content, img, goTo)}
            >
              Success
            </MDBBtn>
        </div>
    </div>
  );
}
