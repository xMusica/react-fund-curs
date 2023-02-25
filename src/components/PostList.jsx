import React, {useMemo, useState} from 'react';
import PostItem from "./PostItem";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, title, remove}) => {

    let availableTitle = title;
    if (!posts.length) {
        return <h1>Посты не найдены</h1>
    }

    return (
        <div>
            <h1>{title}</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                    <PostItem remove={remove} number={index + 1} post={post} ></PostItem>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    );
};

export default PostList;