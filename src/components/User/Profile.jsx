import { useEffect, useState } from 'react'
import PostContainer from './Posts/PostContainer';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackdropLoader from '../Layouts/BackdropLoader';
import { metaballsMenu, postsIconFill, postsIconOutline, reelsIcon, savedIconFill, savedIconOutline, settingsIcon, taggedIcon } from './SvgIcons';
import UsersDialog from '../Layouts/UsersDialog';
import MetaData from '../Layouts/MetaData';
import NotFound from '../Errors/NotFound';
import { newChatReset } from '../../featured/reducers/chat/newChatReducer';
import { clearErrors as followClearErrors, followUserReset } from '../../featured/reducers/user/followUserReducer';
import { clearErrors as chatClearErrors } from '../../featured/reducers/chat/newChatReducer';
import { followUser, getUserDetails } from '../../featured/actions/userActions';
import { addNewChat } from '../../featured/actions/chatActions';
import { clearErrors } from '../../featured/reducers/user/userDetailsReducer';

const Profile = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [follow, setFollow] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);
    const [savedTab, setSavedTab] = useState(false);

    const { user, error, loading } = useSelector((state) => state.userDetails);
    const { user: loggedInUser } = useSelector((state) => state.user);
    const { error: followError, success, message } = useSelector((state) => state.followUser);
    const { error: chatError, chat } = useSelector((state) => state.newChat);

    const handleFollow = () => {
        dispatch(followUser(user._id));
    }

    const handleFollowersModal = () => {
        setFollowersModal(true);
        setViewModal(true)
    }

    const handleFollowingModal = () => {
        setViewModal(true)
        setFollowersModal(false);
    }

    const closeModal = () => {
        setViewModal(false)
    }

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getUserDetails(params.username));

        if (followError) {
            toast.error(followError);
            dispatch(followClearErrors());
        }
        if (success) {
            toast.success(message)
            dispatch(followUserReset());
        }

    }, [dispatch, error, params.username, followError, success, message]);

    useEffect(() => {
        setFollow(user?.followers?.some((u) => u._id === loggedInUser._id))
    }, [user, loggedInUser]);

    const addToChat = () => {
        dispatch(addNewChat(user._id));
    }

    useEffect(() => {
        if (chatError) {
            toast.error(chatError);
            dispatch(chatClearErrors());
        }
        if (chat) {
            const friendId = chat.users?.find((id) => id !== loggedInUser._id);
            navigate(`/direct/t/${chat._id}/${friendId}`);
            dispatch(newChatReset());
        }
    }, [dispatch, chatError, chat, navigate, loggedInUser]);

    return (
        <>
            <MetaData title={`${user?.name} (@${user?.username}) • Instagram photos and videos`} />

            {loading && <BackdropLoader />}
            {user ?
                <div className="mt-16 xl:w-2/3 mx-auto">

                    <div className="sm:flex w-full sm:py-8">

                        {/* profile picture */}
                        <div className="sm:w-1/3 flex justify-center mx-auto sm:mx-0">
                            <img draggable="false" className="w-40 h-40 rounded-full object-cover" src={user.avatar?.url} alt="" />
                        </div>

                        {/* profile details */}
                        <div className="flex flex-col gap-6 p-4 sm:w-2/3 sm:p-1">
                            <div className="flex items-center gap-8 sm:justify-start justify-between">

                                <h2 className="text-2xl sm:text-3xl font-thin">{user.username}</h2>
                                {(loggedInUser.username === user.username) ? (
                                    <div className="flex gap-3 items-center">
                                        <Link to="/accounts/edit" className="border font-medium hover:bg-gray-50 text-sm rounded px-2 py-1">Edit Profile</Link>
                                        <Link to="/accounts/edit">{settingsIcon}</Link>
                                    </div>
                                ) : (
                                    <div className="flex gap-3 items-center">
                                        {follow ? (
                                            <>
                                                <button onClick={addToChat} className="border rounded px-2.5 py-[0.3rem] text-sm font-medium hover:bg-gray-100">Message</button>
                                                <button onClick={handleFollow} className="font-medium text-sm bg-red-50 rounded py-1.5 px-3 text-red-600 hover:bg-red-100 hover:text-red-700">Unfollow</button>
                                            </>
                                        ) : (
                                            <button onClick={handleFollow} className="font-medium bg-primary-blue text-sm text-white hover:shadow rounded px-6 py-1.5">Follow</button>
                                        )}
                                        <span className="sm:block hidden">{metaballsMenu}</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center max-w-[21.5rem]">
                                <div className="cursor-pointer"><span className="font-semibold">{user.posts?.length}</span> posts</div>
                                <div onClick={handleFollowersModal} className="cursor-pointer"><span className="font-semibold">{user.followers?.length}</span> followers</div>
                                <div onClick={handleFollowingModal} className="cursor-pointer"><span className="font-semibold">{user.following?.length}</span> following</div>
                            </div>

                            {/* bio */}
                            <div className="max-w-full">
                                <p className="font-medium">{user.name}</p>
                                <p className="whitespace-pre-line">{user.bio}</p>
                                {user?.website &&
                                    <a href={user.website} target="_blank" rel="noreferrer" className="text-blue-900 font-medium">{new URL(user.website).hostname}</a>
                                }
                            </div>
                        </div>

                    </div>

                    {followersModal ?
                        <UsersDialog title="Followers" open={viewModal} onClose={closeModal} usersList={user?.followers} />
                        :
                        <UsersDialog title="Following" open={viewModal} onClose={closeModal} usersList={user?.following} />
                    }

                    <div className="border-t sm:ml-8 sm:mr-14">

                        {/* tabs */}
                        <div className="flex gap-12 justify-center">
                            <span onClick={() => setSavedTab(false)} className={`${savedTab ? 'text-gray-400' : 'border-t border-black'} py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium`}>
                                {savedTab ? postsIconOutline : postsIconFill} posts</span>
                            {user._id === loggedInUser._id && (
                                <span onClick={() => setSavedTab(true)} className={`${savedTab ? 'border-t border-black' : 'text-gray-400'} py-3 cursor-pointer flex items-center text-[13px] uppercase gap-3 tracking-[1px] font-medium`}>
                                    {savedTab ? savedIconFill : savedIconOutline} saved</span>
                            )}
                            <span className="py-3 flex items-center text-gray-400 text-[13px] uppercase gap-3 tracking-[1px] font-medium">
                                {reelsIcon} reels</span>
                            <span className="py-3 hidden sm:flex items-center text-gray-400 text-[13px] uppercase gap-3 tracking-[1px] font-medium">
                                {taggedIcon} tagged</span>
                        </div>

                        {/* posts grid data */}
                        {savedTab ?
                            <PostContainer posts={user?.saved} id={"saved"} /> :
                            user?.posts?.length > 0 ?
                                <PostContainer posts={user?.posts} id={"posts"} /> :
                                <div className="bg-white mt-2 mb-10 drop-shadow-sm rounded flex sm:flex-row flex-col sm:gap-0 gap-5 sm:p-0 p-4 items-center justify-between">
                                    <img draggable="false" className="w-2/5 rounded-l" src="https://www.instagram.com/static/images/mediaUpsell.jpg/6efc710a1d5a.jpg" alt="" />
                                    <div className="mx-auto flex flex-col items-center">
                                        <h4 className="font-medium text-lg sm:text-xl">Start capturing and sharing your moments.</h4>
                                        <p>Get the app to share your first photo or video.</p>
                                    </div>

                                </div>
                        }

                    </div>

                </div>
                :
                <NotFound />
            }

        </>
    )
}

export default Profile