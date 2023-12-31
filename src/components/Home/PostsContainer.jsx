import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import UsersDialog from '../Layouts/UsersDialog'
import PostItem from './PostItem'
import StoriesContainer from './StoriesContainer'
import InfiniteScroll from 'react-infinite-scroll-component';
import SpinLoader from '../Layouts/SpinLoader'
import SkeletonPost from '../Layouts/SkeletonPost'
// import { postFollowingReset } from '../../featured/reducers/posts/followingPostsReducer'
import { getPostsOfFollowing } from '../../featured/actions/postActions'
import {  likeUnlikePostReset } from '../../featured/reducers/posts/likePostReducer'
import { newCommentReset } from '../../featured/reducers/posts/newCommentReducer'
import { saveUnsavePostReset } from '../../featured/reducers/posts/savePostReducer'
import { clearErrors } from '../../featured/reducers/posts/followingPostsReducer'
import { clearErrors as likeClearErrors } from '../../featured/reducers/posts/likePostReducer'
import { clearErrors as commentClearErrors } from '../../featured/reducers/posts/newCommentReducer'
import { clearErrors as saveClearErrors } from '../../featured/reducers/posts/savePostReducer'

const PostsContainer = () => {

    const dispatch = useDispatch();

    const [usersList, setUsersList] = useState([]);
    const [usersDialog, setUsersDialog] = useState(false);
    const [page, setPage] = useState(2);

    const { loading, error, posts, totalPosts } = useSelector((state) => state.postOfFollowing)
    const { error: likeError, message, success } = useSelector((state) => state.likePost)
    const { error: commentError, success: commentSuccess } = useSelector((state) => state.newComment)
    const { error: saveError, success: saveSuccess, message: saveMessage } = useSelector((state) => state.savePost)

    const handleClose = () => setUsersDialog(false);

    useEffect(() => {
        dispatch(getPostsOfFollowing());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (likeError) {
            toast.error(likeError);
            dispatch(likeClearErrors());
        }
        if (success) {
            toast.success(message)
            dispatch(likeUnlikePostReset());
        }
        if (commentError) {
            toast.error(commentError);
            dispatch(commentClearErrors());
        }
        if (commentSuccess) {
            toast.success("Comment Added")
            dispatch(newCommentReset());
        }
        if (saveError) {
            toast.error(saveError);
            dispatch(saveClearErrors());
        }
        if (saveSuccess) {
            toast.success(saveMessage)
            dispatch(saveUnsavePostReset());
        }
    }, [dispatch, success, error, likeError, message, commentError, commentSuccess, saveError, saveSuccess, saveMessage])

    const fetchMorePosts = () => {
        setPage((prev) => prev + 1)
        dispatch(getPostsOfFollowing(page));
    }

    return (
        <>
            <div className="flex flex-col w-full lg:w-2/3 sm:mt-6 sm:px-8 mb-8">

                <StoriesContainer />

                {loading &&
                    Array(5).fill("").map((el, i) => (<SkeletonPost key={i} />))
                }
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchMorePosts}
                    hasMore={posts.length !== totalPosts}
                    loader={<SpinLoader />}
                >
                    <div className="w-full h-full mt-1 sm:mt-6 flex flex-col space-y-4">
                        {posts?.map((post) => (
                            <PostItem key={post._id} {...post} setUsersDialog={setUsersDialog} setUsersList={setUsersList} />
                        ))}
                    </div>
                </InfiniteScroll>

                <UsersDialog title="Likes" open={usersDialog} onClose={handleClose} usersList={usersList} />

            </div>
        </>
    )
}

export default PostsContainer