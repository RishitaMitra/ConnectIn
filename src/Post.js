import React, {forwardRef} from 'react';

import './Post.css';
import { Avatar } from '@mui/material';
import Inputoption from './Inputoption';
//import Imageicon from '@mui/icons-material/Image';
import Thumbupaltouticon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Chatouticon from '@mui/icons-material/ChatOutlined';
import Shareouticon from '@mui/icons-material/ShareOutlined';
import Sendouticon from '@mui/icons-material/SendOutlined';
import { useState , useEffect } from 'react';
import { auth } from './firebasefile';
//import { useSelector } from 'react-redux';
//import { selectUser } from './features/userSlice';
import { db } from './firebasefile';
import firebase from 'firebase/compat/app';

const Post = forwardRef(({ id, name, description, message, photoUrl, image}, ref)=> {
  //const user = useSelector(selectUser);
  //const [selectedFile, setSelectedFile] = useState(null);
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [comments, setComments] = useState([]);
 
  const user = auth.currentUser;
  
  
  const openCommentPopup = () => {
    setIsCommentPopupOpen(true);
  };
  
  const closeCommentPopup = () => {
    setIsCommentPopupOpen(false);
  };
  
  
  
  useEffect(() => {
    // Fetch the initial likes count from the database
    const fetchLikesCount = async () => {
      try {
        const postRef = db.collection('posts').doc(id);
        const postSnapshot = await postRef.get();
        const postData = postSnapshot.data();
        if (postData) {
          setLikeCount(postData.likes || 0);
        }
      } catch (error) {
        console.error('Error fetching likes count:', error);
      }
    };

    fetchLikesCount();
  }, [id]);

  const handleLike = () => {
    // Update the liked state
    setLiked(!liked);
  
    // Update the like count locally
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  
    // Update the like count in the database
    db.collection("posts")
      .doc(id) // Assuming you have the postId available
      .update({
        likes: liked ? firebase.firestore.FieldValue.increment(-1) : firebase.firestore.FieldValue.increment(1)
      })
      .then(() => {
        console.log("Like count updated successfully in the database");
      })
      .catch((error) => {
        console.error("Error updating like count:", error);
      });
  };
  
  
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsSnapshot = await db
          .collection("comments")
          .where("postId", "==", id)
          .get();
  
        const commentsData = commentsSnapshot.docs.map((doc) => ({
          
          id: doc.id,
          data: doc.data(),
        }));
        console.log("Fetched comments:", commentsData);
        setComments(commentsData);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
  
    fetchComments();
  }, [id]);
  //console.log('Rendered comments:', comments);
  
  const handleAddComment = (commentId) => {
    
    if (commentText.trim() !== '') {
      
    if (user) {
      const newComment = {
        postId: id, // Use the id prop as the postId
        name: user.displayName, // Use the user's display name
        description: user.email,
        text: String(commentText),
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };
    
      db.collection("comments")
        .add(newComment)
        .then(() => {
          console.log("Comment added successfully");
          //console.log("Comment text:", commentText);
          setComments((prevComments) => [
            ...prevComments,
            { id: commentId, data: newComment },
          ]);
          
          
          
          setCommentText(''); // Clear the comment input field
          closeCommentPopup();
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });
    }
    else {
      console.log("User not authenticated. Please log in to post a comment.");
    }
  };
};
  
const handleDeleteComment = (commentId) => {
  db.collection("comments")
    .doc(commentId)
    .delete()
    .then(() => {
      console.log("Comment deleted successfully");
      // Update the comments state by removing the deleted comment
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    })
    .catch((error) => {
      console.error("Error deleting comment:", error);
    });
};
const handleDeletePost = (postId, setPosts) => {
  // Delete the post from Firebase
  db.collection("posts")
    .doc(postId)
    .delete()
    .then(() => {
      console.log("Post deleted successfully");
      // Remove the post from the posts state
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    })
    .catch((error) => {
      console.error("Error deleting post:", error);
    });
};



  return (
    <div ref={ref} className='post'>
            <div className='post_header'>
            
                <Avatar src={photoUrl}>
                  {name[0]}
                </Avatar>
                <div className='post_info'>
                  <h2>  {name}</h2>
                  <p>{description}</p>
                  
                </div>
            </div>
            <div className='post_body'>
                <p>{message}</p>
                
            </div>
            

            <div className='post_button'>
            <Inputoption
          Icon={liked ? ThumbUpAltIcon : Thumbupaltouticon}
          title="Like"
          color={liked ? 'blue' : 'gray'}
          onClick={handleLike}
        />
                {isCommentPopupOpen && (
      <div className="comment-popup">
        <textarea
          placeholder="Write a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <button onClick={() => {
          handleAddComment(commentText);
          setCommentText('');
          closeCommentPopup();
        }}>Post Comment</button>
        <button onClick={closeCommentPopup}>Cancel</button>
      </div>
    )}
                <Inputoption
      Icon={Chatouticon}
      title="Comment"
      color="gray"
      onClick={openCommentPopup}
    />
                <Inputoption Icon={Shareouticon} title='Share' color='gray'/>
                <Inputoption Icon={Sendouticon} title='Send' color='gray'/>
            </div>
            <p>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</p>
            
          <div className='commentbox'>
  {/* Render the comments */}<h3>Comments</h3>
  {comments.map((comment) => (
    <div key={comment.id}>
      <h4>{comment.data.name}</h4>
        <p>{comment.data.text}</p>
        {user && user.displayName === comment.data.name && (
      <button onClick={() => handleDeleteComment(comment.id)}>
        Delete
      </button>)}
    </div>
  ))}
</div>
{user && user.displayName === name && (
      <button onClick={() => handleDeletePost(id)}>Delete Post</button>
    )}
            
    </div>
  )
})

export default Post