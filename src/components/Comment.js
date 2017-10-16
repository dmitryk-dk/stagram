import React from 'react';
import {observer} from 'mobx-react';
import getStore from '../store/store';


const Comment = () => {

    const store = getStore();
    const comment = store.comments;

    return (
        <div className="comment">
            <p>
                <strong>{comment.user}</strong>
                {comment.text}
                <button
                    className="remove-comment"
                    onClick={() => console.log('click')}>
                    &times;
                </button>
            </p>
        </div>
    );
};

export default observer(Comment);
