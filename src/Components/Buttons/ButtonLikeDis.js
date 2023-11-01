import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeAction, dislikeAction } from './Actions';

function ButtonLikeDis({ id }) {
  const dispatch = useDispatch();
  const like = useSelector(state => state.post.find(post=>post.id==id).like);
  const dislike = useSelector(state => state.post.find(post=>post.id==id).dislike);
  const handleLike = () => {
    dispatch(likeAction(id));
  };

  const handleDislike = () => {
    dispatch(dislikeAction(id));
  };

  return (
    <div className='text-center'>
      <button type="button" class="btn btn-success "  onClick={handleLike}>Like ({like})</button>
      <button type="button" class="btn btn-danger" onClick={handleDislike}>Dislike ({dislike})</button>

    </div>
  );
}

export default ButtonLikeDis;
