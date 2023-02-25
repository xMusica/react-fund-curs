import React, {useMemo, useState} from 'react';
import PostItem from "./PostItem";
import MySelect from "./UI/select/MySelect";

const PostList = ({posts, title, remove}) => {

    const availableTitle = useMemo(() => {

        if (posts.length === 0) {
            return  "Записей нет."
        } else {
            return title;
        }
    }, [posts]);

    return (
        <div>
            <h1>{availableTitle}</h1>
            {posts.map((post, index) =>
                <PostItem remove={remove} number={index + 1} post={post} key={post.id}></PostItem>
            )}
        </div>
    );
};

export default PostList;