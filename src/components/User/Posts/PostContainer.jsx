import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import PostItem from './PostItem'
import { getUserDetails } from '../../../featured/actions/userActions';
import { clearErrors, likeUnlikePostReset } from '../../../featured/reducers/posts/likePostReducer';
import { newCommentReset } from '../../../featured/reducers/posts/newCommentReducer';
import { saveUnsavePostReset } from '../../../featured/reducers/posts/savePostReducer';
import { deletePostReset } from '../../../featured/reducers/posts/deletePostReducer';

const PostContainer = ({ posts, id }) => {

    const dispatch = useDispatch();
    const params = useParams();

    const { error: likeError, message, success } = useSelector((state) => state.likePost)
    const { error: commentError, success: commentSuccess } = useSelector((state) => state.newComment)
    const { error: saveError, success: saveSuccess, message: saveMessage } = useSelector((state) => state.savePost)
    const { error: deleteError, success: deleteSuccess } = useSelector((state) => state.deletePost)

    useEffect(() => {
        dispatch(getUserDetails(params.username));
        if (likeError) {
            toast.error(likeError);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success(message)
            dispatch(likeUnlikePostReset());
        }
        if (commentError) {
            toast.error(commentError);
            dispatch(clearErrors());
        }
        if (commentSuccess) {
            toast.success("Comment Added")
            dispatch(newCommentReset());
        }
        if (saveError) {
            toast.error(saveError);
            dispatch(clearErrors());
        }
        if (saveSuccess) {
            toast.success(saveMessage)
            dispatch(saveUnsavePostReset());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (deleteSuccess) {
            toast.success("Post Deleted")
            dispatch(deletePostReset());
        }
         // eslint-disable-next-line
    }, [dispatch, success, likeError, message, commentError, commentSuccess, saveError, saveSuccess, saveMessage, deleteError, deleteSuccess, params.userName]);

    return (
        <div className="grid grid-cols-3 gap-1 sm:gap-8 my-1 mb-8" id={id}>
            {posts?.map((post, i) => (
                <PostItem {...post} key={i} />
            )).reverse()
            }
        </div>
    )
}

export default PostContainer