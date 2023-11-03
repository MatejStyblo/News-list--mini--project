import React, { useState, useEffect } from 'react';
import "./dataFetching.css"
import axios from 'axios';
import ButtonLikeDis from './Buttons/ButtonLikeDis';
import { useDispatch, useSelector } from 'react-redux';
import { loadPost, loadComments, loadUsers, likeAction, dislikeAction } from './Buttons/Actions';
import SearchBar from './SearchBar';
const DataFetching = () => {
    const dispatch = useDispatch();
    const post = useSelector(store => store.post);
    const comments = useSelector(store => store.comments);
    const users = useSelector(store => store.users);
    const [filteredPosts, setFilteredPosts] = useState(post);

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
    useEffect(() => {
        setFilteredPosts(post);
    }, []);

    return (
        <div class="container post">
            <h1 class='newsHeader shadow p-3 mb-5 bg-white rounded font-weight-bold'>News list</h1>
            <div class="row rounded-circle ">
                <div className='searchData'>
                    <SearchBar setFilteredPosts={setFilteredPosts} />
                </div>

                {filteredPosts.slice(0, 20).map((postItem, index) => (
                    <div class='singlePost col-lg- align-middle shadow p-3 mb-5 bg-white rounded' key={postItem.id} >
                        <div className='insideCard'>

                            <h4 class="card-header">{postItem.title}</h4>
                            <h6 class="card-text">{postItem.body}</h6>
                            <div className='likeDislike'>
                                <p className="like">+{postItem.like}
                                </p>
                                <p className="dislike">
                                    -{postItem.dislike}
                                </p>
                            </div>




                        </div>
                        {users.filter(user => user.id === postItem.userId).map(user =>
                            <div className='userComments row'>
                                <p class="font-weight-bold userName col">{user.name}</p>
                           
                                    <button
                                        class="btn btn-primary col userComments"
                                        type="button"
                                        data-toggle="collapse"
                                        data-target={`#collapseExample${index}`}
                                        aria-expanded="false"
                                        aria-controls={`collapseExample${index}`}>
                                        see ({comments.filter(comment => comment.postId === postItem.userId).length}) comments ↓
                                    </button>
                               
                                <div className='btnLikeDis col'>

                                    <ButtonLikeDis id={postItem.id} />
                                </div>
                            </div>

                        )}

                        <div class="collapse " id={`collapseExample${index}`}>
                            {comments.filter(comment => comment.postId === postItem.id).map(comment => (
                                <div key={comment.id} class="card card-body ">
                                    <p class="text-center font-weight-bold">{comment.name}</p>
                                    <p className='commentBody'>{comment.body}</p>
                                    <p className='commentEmail'>{comment.email}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                ))}
            </div></div>

    );

}

export default DataFetching;
