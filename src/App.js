import React, {useEffect, useMemo, useRef, useState} from "react";
import './styles/App.css';
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/modal/MyModal";
import {usePosts} from "./components/hooks/usePosts";
import PostService from "./components/api/PostService";
import Loader from "./components/UI/loader/Loader";
import {useFetching} from "./components/hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])

    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const sortedAndSearchPost = usePosts(posts, filter.sort, filter.query);
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const posts = await PostService.getAll();
        setPosts(posts)
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    useEffect(() => {
        fetchPosts()
    }, [])

  return (
    <div className="App">
        <MyButton onClick={() => fetchPosts()}>Test fetch</MyButton>
        <MyButton style={{marginTop: 15, marginBottom: 15}} onClick={() => setModal(true)}>Создать пост</MyButton>
        <MyModal visible={modal} setVisible={setModal}> <PostForm create={createPost} /></MyModal>
        <PostFilter
            filter={filter}
            setFilter={setFilter}
        />

        {postError && <h1>Ошибка ${postError}</h1>}

        {isPostLoading
            ? <div style={{display: 'flex', justifyContent: 'center'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchPost} title={'Список постов #1'}/>
        }

    </div>
  );
}

export default App;
