import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeAction, dislikeAction } from './Actions';

function ButtonLikeDis({ id }) {
  const dispatch = useDispatch();
  const handleLike = () => {
    dispatch(likeAction(id));
  };

  const handleDislike = () => {
    dispatch(dislikeAction(id));
    
  };

  return (
  
      <div className="likesButtons">
        <button type="button" class="btn btn-success btnLike " onClick={handleLike}>Like</button>
        <button type="button" class="btn btn-danger btnDis" onClick={handleDislike}>Dislike </button>
      </div>
  
  );
}

export default ButtonLikeDis;
