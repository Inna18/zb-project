import { useMutation } from '@tanstack/react-query';
import Post, { createPost } from '@/app/service/usePostApi';
import { usePathname, useRouter } from 'next/navigation';

export const usePostCreate = () => {
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: async (newPost: Post) => await createPost(newPost),
    onSuccess: (data) => {
      router.push(`${pathname}/fix?postId=${data._id}`);
    },
  });
};
