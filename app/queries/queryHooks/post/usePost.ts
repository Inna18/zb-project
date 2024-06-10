import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Post, {
  createPost,
  deletePost,
  deletePostImage,
  getPostById,
  getPosts,
  updatePost,
  updatePostImg,
} from '@/app/service/usePostApi';
import { usePathname, useRouter } from 'next/navigation';
import { POST_KEYS } from '../../queryKeys';

export const usePost = () => {
  const router = useRouter();
  const pathname = usePathname();
  const queryClient = useQueryClient();

  const usePostCreate = () => {
    return useMutation({
      mutationFn: async (newPost: Post) => await createPost(newPost),
      onSuccess: (data) => {
        router.push(`${pathname}/fix?postId=${data._id}`);
      },
    });
  };

  const usePostDelete = () => {
    return useMutation({
      mutationFn: async (id: string) => await deletePost(id),
      onSuccess: (data) => {
        queryClient.setQueryData(POST_KEYS.list(), (old: Post[]) =>
          old.filter((p) => p._id !== data)
        );
      },
    });
  };

  const usePostDeleteImg = () => {
    return useMutation({
      mutationFn: async (id: string) => await deletePostImage(id),
      onSuccess: (data) => {
        queryClient.setQueryData(POST_KEYS.get(data._id), (old: Post) => ({
          ...old,
          postImage: null,
        }));
      },
    });
  };

  const usePostGet = (id: string) => {
    return useQuery({
      queryKey: POST_KEYS.get(id),
      queryFn: async () => await getPostById(id),
    });
  };

  const usePostList = () => {
    return useQuery({
      queryKey: POST_KEYS.list(),
      queryFn: async () => await getPosts(),
    });
  };

  const usePostUpdate = () => {
    return useMutation({
      mutationFn: async (obj: { id: string; post: Post }) =>
        await updatePost(obj.id, obj.post),
    });
  };

  const usePostUpdateImg = () => {
    return useMutation({
      mutationFn: async (imageArr: { id: string; image: File }) =>
        await updatePostImg(imageArr.id, imageArr.image),
      onSuccess: (data) => {
        queryClient.setQueryData(POST_KEYS.get(data._id), () => ({
          ...data,
          postImage: data.postImage,
        }));
      },
    });
  };

  return {
    usePostCreate,
    usePostDelete,
    usePostDeleteImg,
    usePostGet,
    usePostList,
    usePostUpdate,
    usePostUpdateImg,
  };
};
