import React, {useMemo, useRef, useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";

function App() {
        const [posts, setPosts] = useState([
            {id: 1, title: 'ясуо', body: 'Луверпуль'},
            {id: 2, title: 'арена Металлург', body: 'Гейкпо'},
            {id: 3, title: 'Бабселона', body: 'Великий МЮ'}
        ])

   const [filter, setFilter] = useState({sort: '', query: ''});

    const sortedPosts = useMemo(() => {
        if (filter.sort) {
            return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]));
        }

        return posts;
    }, [filter.sort, posts])

    const sortedAndSearchPost = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(filter.query));
    }, [filter.query, sortedPosts]);

    const createPost = (newPost) => {
            setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <PostForm create={createPost} />
        <hr/>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />
        <PostList remove={removePost} posts={sortedAndSearchPost} title={'Список постов #1'}/>
    </div>
  );
}

export default App;
