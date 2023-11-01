export const LIKE = 'LIKE';
export const DISLIKE = 'DISLIKE';
export const LOADPOST = 'LOADPOST';
export const COMMENTS = 'COMMENTS';
export const USERS = 'USERS';
export function likeAction(id) {
  return { type: LIKE, payload: { id } };
}

export function dislikeAction(id) {
  return { type: DISLIKE, payload: { id } };
}

export function loadPost(post) {
  return {type:LOADPOST,payload:{post} }
}
export function loadComments(comments) {
  return { type: COMMENTS, payload: {comments} }
}
export function loadUsers(users) {
  return { type: USERS, payload: {users} }
}