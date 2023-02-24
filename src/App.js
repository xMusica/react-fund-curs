import React, {useRef, useState} from "react";
import Counter from "./components/Counter";
import ClassCounter from "./components/ClassCounter";
import './styles/App.css';
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";

function App() {
        const [posts, setPosts] = useState([
            {id: 1, title: 'ясуо', body: 'Луверпуль'},
            {id: 2, title: 'арена Металлург', body: 'Гейкпо'},
            {id: 3, title: 'Бабселона', body: 'Великий МЮ'}
        ])

    const [selectedSort, setSelectedSort] = useState('')

    const sortPosts = (sort) => {
        setSelectedSort(sort);
        setPosts([...posts].sort((a, b) => a[sort].localeCompare(b[sort])));
    }

    const createPost = (newPost) => {
            setPosts([...posts, newPost])
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

  return (
    <div className="App">
        <PostForm create={createPost} />

        <hr></hr>
        <MySelect
            value={selectedSort}
            onChange={sortPosts}
            defaultValue="Сортировка по"
            options={[
                {value: 'title', name: 'По названию'},
                {value: 'body', name: 'По описанию'}

            ]}
        >

        </MySelect>

        <PostList remove={removePost} posts={posts} title={'Список постов #1'}/>
    </div>
  );
}

export default App;
