import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "./dataFetching.css"
import axios from 'axios';
import ButtonLikeDis from './Buttons/ButtonLikeDis';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost, loadComments, loadUsers } from './Buttons/Actions';

const DataFetching = () => {
    const dispatch = useDispatch();

    const post = useSelector(store => store.post);
    const comments = useSelector(store => store.comments);
    const users = useSelector(store => store.users);
    console.log(users);
    console.log(comments);
    console.log(post);
    let urls = [
        "https://jsonplaceholder.typicode.com/posts",
        "https://jsonplaceholder.typicode.com/comments",
        "https://jsonplaceholder.typicode.com/users",
    ];

    useEffect(() => {
        axios.all(urls.map(url => axios.get(url)))
            .then(axios.spread((postsRes, commentsRes, usersRes) => {
                dispatch(loadPost(postsRes.data));
                dispatch(loadComments(commentsRes.data));
                dispatch(loadUsers(usersRes.data));

            }))
            .catch(err => {
                console.log(err);
            });
    }, []);

    return (
        <div class="container post">
            <div class="row mx-md-n5 w-50 ">


                {post.slice(0, 20).map((postItem, index) => (
                    <div className='single-post col-md- rounded-top border align-middle ' key={postItem.id} >
                        <h4 class="card-header text-center">{postItem.title}</h4>
                        <h6 class="card-text">{postItem.body}</h6>
                        <ButtonLikeDis id={postItem.id} />

                        <p className='text-center'>
                            <button
                                className="btn btn-primary "
                                type="button"
                                data-toggle="collapse"
                                data-target={`#collapseExample${index}`}
                                aria-expanded="false"
                                aria-controls={`collapseExample${index}`}>
                                see ({comments.filter(comment => comment.postId === postItem.userId).length}) comments ↓
                            </button>
                        </p>

                            {users.filter(user => user.id === postItem.userId).map(user =>
                                <div>
                                    {user.name}
                                </div>
                            )}

                        <div className="collapse " id={`collapseExample${index}`}>
                            {comments.filter(comment => comment.postId === postItem.id).map(comment => (
                                <div key={comment.id} className="card card-body ">
                                    <p>{comment.email}</p>
                                    <p>{comment.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                ))}
            </div></div>

    );

}

export default DataFetching;
