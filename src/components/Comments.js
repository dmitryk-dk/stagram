import React from 'react';
import Comment from './Comment';
import getStore from '../store/store';
import {observer} from 'mobx-react';


const Comments = () => {

    const store = getStore();
    const comments = store.comments;

    return (
        <div className="comments">
            {Object.keys(comments).map(() => <Comment />)}
            <form
                className="comment-form"
                onSubmit={() => console.log('submit')}>
                <input
                    type="text"
                    placeholder="author"
                    onChange={() => console.log('change')}
                />
                <input
                    type="text"
                    placeholder="comment"
                    onChange={()=>console.log('change')}
                />
                <input type="submit" hidden />
            </form>
        </div>
    );
};


export default observer(Comments);
