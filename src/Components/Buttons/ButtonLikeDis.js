import React from "react";
import { useDispatch } from "react-redux";
import { likeAction, dislikeAction } from "../../Redux/Actions";

const ButtonLikeDis = ({ id }) => {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likeAction(id));
  };

  const handleDislike = () => {
    dispatch(dislikeAction(id));
  };

  return (
    <div className="likesButtons">
      <button type="button" className="btnLike " onClick={handleLike}>
        Like
      </button>
      <button type="button" className="btnDis" onClick={handleDislike}>
        Dislike
      </button>
    </div>
  );
};

export default ButtonLikeDis;
