// getByPostId
// create
// deleteByCommentId
// deleteAllByPostId

import { client } from '@/sanity/lib/client';
import { SanityImageAssetDocument } from 'next-sanity';

export default interface Comment {
    _id?: string;
    rating?: number;
    content?: any; // what is rich text type?
    commentImages?: string[];
    postId?: string;
    createdBy?: string;
    _createdAt?: string; 
}

async function getCommentsByPostId(postId: string) {
    const query = `*[_type == 'comment' && postId == ${postId}] | order(_createdAt desc) {
        _id,
        rating,
        content,
        "commentImages": commentImages[].asset->url,
        postId,
        createdBy,
        _createdAt
    }`;
    const commentListByPostId = await client.fetch(query);
    console.log('Comment list by Post Id" ', commentListByPostId);
    return commentListByPostId;
}

async function createComment(newComment: Comment) {
    let commentImages: SanityImageAssetDocument[] = [];
  const promises = newComment.commentImages!.map(async (commentImage: string) => {
    return await client.assets.upload('image', commentImage);
  });
  commentImages = await Promise.all(promises);

  const sanityComment = {
    _type: 'comment',
    rating: newComment.rating,
    content: newComment.content,
    commentImages: commentImages
      ? commentImages.map((productImage) => {
          return {
            _key: productImage?._id,
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: productImage?._id,
            },
          };
        })
      : null,
    postId: newComment.postId,
    createdBy: newComment.createdBy
  };
  
  const commentCreated = await client.create(sanityComment);
  console.log('Comment created: ', commentCreated);
  return commentCreated;
}

async function deleteCommentById(commentId: string) {
    const commentDeleted = await client.delete(commentId);
    console.log(commentDeleted);
}

async function deleteAllCommentsByPostId(postId: string) {
    const deleteResult = await client.delete({
        query: `*[_type == 'comment' && postId == ${postId}][0...999]`,
      });
      console.log(deleteResult);
}

export { getCommentsByPostId, createComment, deleteCommentById, deleteAllCommentsByPostId }