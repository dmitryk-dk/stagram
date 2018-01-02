import React from 'react';
import getStore from '../store/store';
import incrementLike from '../actions/incrementLike';
import {Link} from 'react-router-dom';
import {observer} from 'mobx-react';
import CSSTransitionGroup from 'react-addons-css-transition-group';


const Photo = ({post, comments}) => (
    <figure className="grid-figure" key={post.id}>
        <div className="grid-photo-wrap">
            <Link to={`/view/${post.code}`}>
                <img
                    className="grid-photo"
                    src={post.display_src}
                    alt={post.caption} 
                />
            </Link>
            <CSSTransitionGroup
                transitionName="like"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={500}>
                    <span
                        key={post.likes}
                        className="likes-heart">
                        {post.likes}
                    </span>
            </CSSTransitionGroup>
        </div>
        <figcaption>
            <p>{post.caption}</p>
            <div className="control-buttons">
                <button
                    className="likes"
                    onClick={(e)=> incrementLike(post.id)}
                >
                    &hearts; {post.likes}
                </button>
                <Link to={`/view/${post.code}`} className="button">
                    <span className="comment-count">
                        <span className="speech-bubble" /> {(comments[post.code] ? comments[post.code].length : 0)}
                    </span>
                </Link>
            </div>
        </figcaption>
    </figure>
);

export default observer(Photo);
