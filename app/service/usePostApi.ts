import { client } from '@/sanity/lib/client';

export default interface Post {
  _id: string;
  title: string;
  content: string;
  postImage?: string | File;
  createdBy: string;
  _createdAt?: string;
}

async function getPosts() {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
        _id,
        title,
        content,
        "postImage": postImage.asset->url,
        createdBy,
        _createdAt
    }`;
  const allPosts = await client.fetch(query);
  console.log('All Posts: ', allPosts);
  return allPosts;
}

async function getPostById(postId: string) {
  const query = `*[_type == 'post' && _id == '${postId}'] | order(_createdAt desc)[0] {
        _id,
        title,
        content,
        "postImage": postImage.asset->url,
        createdBy,
        _createdAt
    }`;
  const postById = await client.fetch(query);
  console.log('Post By Id: ', postById);
  return postById;
}

async function createPost(newPost: Post) {
  const uploadedImg = newPost.postImage
    ? await client.assets.upload('image', newPost.postImage)
    : null;

  const sanityPost = {
    _type: 'post',
    title: newPost.title,
    content: newPost.content,
    postImage: uploadedImg
      ? {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: uploadedImg?._id,
          },
        }
      : undefined,
    createdBy: newPost.createdBy,
  };

  const postCreated = await client.create(sanityPost);
  console.log('Post created: ', postCreated);
  return postCreated;
}

async function updatePost(postId: string, updatedPost: Post) {
  const updatePost = await client
    .patch(postId)
    .set({
      title: updatedPost.title,
      content: updatedPost.content,
    })
    .commit();
  console.log('Updated Post: ', updatePost);
  return updatePost;
}

async function updatePostImg(postId: string, postImage: File) {
  const uploadedImg = postImage
    ? await client.assets.upload('image', postImage)
    : null;

  const updatedImage = await client
    .patch(postId)
    .set({
      postImage: uploadedImg
        ? {
            _type: 'image',
            asset: {
              _type: 'reference',
              _ref: uploadedImg?._id,
            },
          }
        : undefined,
    })
    .commit();
  // console.log('Updated image post: ', updatedImage);
  const inDB = await getPostById(postId);
  return inDB;
}

async function deletePost(postId: string) {
  const inDB = await getPostById(postId);
  if (inDB) {
    const deleteResult = await client.delete(postId);
    console.log('Post delete: ', deleteResult);
  } else {
    console.log('No such post');
    throw new Error('No such post');
  }
}

async function deletePostImage(postId: string) {
  const inDB = await getPostById(postId);
  if (inDB) {
    const deleteResult = await client
      .patch(postId)
      .set({
        postImage: null,
      })
      .commit();
    console.log('Post image delete: ', deleteResult);
  } else {
    console.log('No such post');
    throw new Error('No such post');
  }
}

export {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  updatePostImg,
  deletePost,
  deletePostImage,
};
