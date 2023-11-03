import React, { useEffect } from "react";
import "./dataFetching.css";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonLikeDis from "../Buttons/ButtonLikeDis";
import { useDispatch, useSelector } from "react-redux";
import { loadPost, loadComments, loadUsers } from "../Redux/Actions";
import SearchBar from "../SearchBar/SearchBar";
const DataFetching = () => {
  const dispatch = useDispatch();
  const post = useSelector((store) => store.post);
  const comments = useSelector((store) => store.comments);
  const users = useSelector((store) => store.users);
  const searchQuery = useSelector((state) => state.searchQuery);

  const filteredPosts = post.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  let urls = [
    "https://jsonplaceholder.typicode.com/posts",
    "https://jsonplaceholder.typicode.com/comments",
    "https://jsonplaceholder.typicode.com/users",
  ];

  useEffect(() => {
    axios
      .all(urls.map((url) => axios.get(url)))
      .then(
        axios.spread((postsRes, commentsRes, usersRes) => {
          dispatch(loadPost(postsRes.data));
          dispatch(loadComments(commentsRes.data));
          dispatch(loadUsers(usersRes.data));
        })
      )
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Container className="post">
      <h1 className="newsHeader">News list</h1>
      <Row className="  rows" xs={1}>
        <div className="searchData">
          <SearchBar />
        </div>

        {filteredPosts.slice(0, 20).map((postItem, index) => (
          <Col
            className="singlePost shadow p-3 mb-5 bg-white"
            key={postItem.id}
          >
            <div className="insideCard">
              <h4 className="cardHeader">{postItem.title}</h4>
              <p className="cardBody">{postItem.body}</p>
              <div className="likeDislike">
                <p className="like">+{postItem.like}</p>
                <p className="dislike">-{postItem.dislike}</p>
              </div>
            </div>
            {users
              .filter((user) => user.id === postItem.userId)
              .map((user) => (
                <Row className="userComments"  key={postItem.id}>
                  <Col className="userName font-weight-bold">{user.name}</Col>
                  <Col>
                    <a
                      className="buttonComments"
                      type="button"
                      data-toggle="collapse"
                      data-target={`#collapseExample${index}`}
                      aria-expanded="false"
                      aria-controls={`collapseExample${index}`}
                    >
                      See (
                      {
                        comments.filter(
                          (comment) => comment.postId === postItem.userId
                        ).length
                      }
                      ) comments ↓
                    </a>
                  </Col>

                  <Col className="btnLikeDis">
                    <ButtonLikeDis id={postItem.id} />
                  </Col>
                </Row>
              ))}

            <div className="collapse " id={`collapseExample${index}`}>
              {comments
                .filter((comment) => comment.postId === postItem.id)
                .map((comment) => (
                  <div key={comment.id} className="card card-body ">
                    <p className="text-center font-weight-bold">
                      {comment.name}
                    </p>
                    <p className="commentBody">{comment.body}</p>
                    <p className="commentEmail">{comment.email}</p>
                  </div>
                ))}
            </div>
          </Col>
        ))}
      </Row>
      <Row />
    </Container>
  );
};

export default DataFetching;
