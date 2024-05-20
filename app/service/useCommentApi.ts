import { client } from '@/sanity/lib/client';

export default interface Comment {
  _id?: string;
  rating?: number;
  content?: string;
  commentImage?: string;
  productId?: string;
  createdBy?: string;
  _createdAt?: string;
}

async function getCommentsByProductId(productId: string) {
  const query = `*[_type == 'comment' && productId == '${productId}'] | order(_createdAt desc) {
        _id,
        rating,
        content,
        "commentImage": commentImage.asset->url,
        productId,
        createdBy,
        _createdAt
    }`;
  const commentListByProductId = await client.fetch(query);
  console.log('Comment list by Post Id" ', commentListByProductId);
  return commentListByProductId;
}

async function createComment(newComment: Comment) {
  const uploadedImg = newComment.commentImage
    ? await client.assets.upload('image', newComment.commentImage)
    : null;

  const sanityComment = {
    _type: 'comment',
    rating: newComment.rating,
    content: newComment.content,
    commentImage: uploadedImg
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImg?._id,
          },
        }
      : undefined,
    productId: newComment.productId,
    createdBy: newComment.createdBy,
  };

  const commentCreated = await client.create(sanityComment);
  console.log('Comment created: ', commentCreated);
  return commentCreated;
}

async function deleteCommentById(commentId: string) {
  const commentDeleted = await client.delete(commentId);
  console.log(commentDeleted);
}

async function deleteAllCommentsByProductId(productId: string) {
  const deleteResult = await client.delete({
    query: `*[_type == 'comment' && productId == '${productId}'][0...999]`,
  });
  console.log(deleteResult);
}

export {
  getCommentsByProductId,
  createComment,
  deleteCommentById,
  deleteAllCommentsByProductId,
};
