import {
  LIKE,
  DISLIKE,
  LOADPOST,
  COMMENTS,
  USERS,
  SET_SEARCH_QUERY,
  CLEAR_SEARCH_QUERY,
} from "./Actions";
const randomLike = Math.floor(Math.random() * 100);
const randomDislike = Math.floor(Math.random() * 100);

const initialState = {
  post: [],
  comments: [],
  users: [],
  searchQuery: "",
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.payload,
      };
    case CLEAR_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: "",
      };
    case COMMENTS:
      return {
        ...state,
        comments: action.payload.comments,
      };
    case USERS:
      return {
        ...state,
        users: action.payload.users,
      };
    case LOADPOST:
      const updatedPosts = action.payload.post.map((post) => ({
        ...post,
        like: Math.floor(Math.random() * 45),
        dislike: Math.floor(Math.random() * 25),
      }));
      return { ...state, post: updatedPosts };
    case LIKE:
      const currentPostIndex = state.post.findIndex(
        (post) => post.id === action.payload.id
      );

      const newsPost = [...state.post];
      const currentLike = Number(newsPost[currentPostIndex].like) || 0;
      newsPost[currentPostIndex] = {
        ...newsPost[currentPostIndex],
        like: newsPost[currentPostIndex].liked
          ? currentLike - 1
          : currentLike + 1,
        liked: !newsPost[currentPostIndex].liked,
      };
      return { ...state, post: newsPost };

    case DISLIKE:
      const currentPost = state.post.findIndex(
        (post) => post.id === action.payload.id
      );
      const Post = [...state.post];
      const currentDislike = Number(Post[currentPost].dislike) || 0;

      Post[currentPost] = {
        ...Post[currentPost],
        dislike: Post[currentPost].disliked
          ? currentDislike - 1
          : currentDislike + 1,
        disliked: !Post[currentPost].disliked,
      };
      return { ...state, post: Post };
    default:
      return state;
  }
};

export default reducer;
