import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PRODUCT_KEYS } from '@/app/queries/queryKeys';
import Product, {
  getBestProductList,
  createProduct,
  deleteProductById,
  deleteProductImage,
  deleteProductImages,
  getProductById,
  getProductImages,
  getProductList,
  updateProduct,
  updateProductImages,
  updateProductQuantity,
  updateProductRating,
  updateProductStatus,
  getShopProductList,
} from '@/app/service/useProductApi';
import { useProductStore } from '@/app/stores/useProductStore';
import { useProductIdStore } from '@/app/stores/useProductIdStore';

export const useProduct = () => {
  const queryClient = useQueryClient();
  const { product, setProduct } = useProductStore((state) => state);
  const productId = useProductIdStore((state) => state.productId);

  const useBestProductList = (count: number) => {
    return useQuery({
      queryKey: PRODUCT_KEYS.list(),
      queryFn: async () => await getBestProductList(count),
    });
  };

  const useProductCreate = () => {
    return useMutation({
      mutationFn: async (newProduct: Product) =>
        await createProduct(newProduct),
    });
  };

  const useProductDeleteById = () => {
    return useMutation({
      mutationFn: async (id: string) => await deleteProductById(id),
      onSuccess: (data) => {
        const prevProducts = queryClient.getQueryData(PRODUCT_KEYS.list());
        queryClient.setQueryData(PRODUCT_KEYS.list(), (old: Product[]) =>
          old.filter((p) => p._id !== data)
        );
        return { prevProducts };
      },
    });
  };

  const useProductDeleteImg = () => {
    return useMutation({
      mutationFn: async (product: { id: string; imageUrl: string }) =>
        await deleteProductImage(product.id, product.imageUrl),
      onSuccess: (data) => {
        queryClient.setQueryData(PRODUCT_KEYS.get(productId), () => ({
          ...product,
          productImages: data,
        }));
      },
    });
  };

  const useProductDeleteImgs = () => {
    return useMutation({
      mutationFn: async (product: { id: string; numToDelete: number }) =>
        await deleteProductImages(product.id, product.numToDelete),
      onSuccess: (data) =>
        setProduct({ ...product, productImages: data.updatedImages }),
    });
  };

  const useProductGetById = (id: string) => {
    return useQuery({
      queryKey: PRODUCT_KEYS.get(id),
      queryFn: async () => await getProductById(id),
      refetchOnWindowFocus: false,
    });
  };

  const useProductGetImages = (id: string | undefined) => {
    return useQuery({
      queryKey: PRODUCT_KEYS.get(id),
      queryFn: async () => await getProductImages(id),
    });
  };

  const useProductList = (orderBy: string, filter?: string | null) => {
    return useQuery({
      queryKey: PRODUCT_KEYS.list(),
      queryFn: async () => await getProductList(orderBy, filter),
    });
  };

  const useProductUpdate = () => {
    return useMutation({
      mutationFn: async (obj: { id: string; product: Product }) =>
        await updateProduct(obj.id, obj.product),
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: PRODUCT_KEYS.list() });
      },
    });
  };

  const useProductUpdateImages = () => {
    return useMutation({
      mutationFn: async (imagesArr: { id: string; images: File[] }) =>
        await updateProductImages(imagesArr.id, imagesArr.images),
      onSuccess: async (data) => {
        queryClient.setQueryData(PRODUCT_KEYS.get(productId), () => ({
          ...product,
          productImages: data,
        }));
      },
    });
  };

  const useProductUpdateQuantity = () => {
    const queryClient = useQueryClient();
    const { product, setProduct } = useProductStore((state) => state);

    return useMutation({
      mutationFn: async (obj: { id: string; quantity: number }) =>
        await updateProductQuantity(obj.id, obj.quantity),
      onSuccess: (data) => {
        setProduct({ ...product, quantity: data.quantity });
        queryClient.setQueryData(
          PRODUCT_KEYS.get(product._id),
          (old: Product) => ({
            ...old,
            quantity: data.quantity,
          })
        );
      },
    });
  };

  const useProductUpdateRating = () => {
    return useMutation({
      mutationFn: async (obj: { id: string; rating: number }) =>
        await updateProductRating(obj.id, obj.rating),
      onSuccess: (data) => {
        queryClient.setQueryData(
          PRODUCT_KEYS.get(data._id),
          (old: Product) => ({
            ...old,
            rating: data.rating,
          })
        );
      },
    });
  };

  const useProductUpdateStatus = () => {
    return useMutation({
      mutationFn: async (obj: { id: string; posted: boolean }) =>
        await updateProductStatus(obj.id, obj.posted),
      onSuccess: () => {
        queryClient.refetchQueries({ queryKey: PRODUCT_KEYS.list() });
      },
    });
  };

  const useShopProductList = (orderBy: string, filter?: string | null) => {
    return useQuery({
      queryKey: PRODUCT_KEYS.list(),
      queryFn: async () => await getShopProductList(orderBy, filter),
    });
  };

  return {
    useBestProductList,
    useProductCreate,
    useProductDeleteById,
    useProductDeleteImg,
    useProductDeleteImgs,
    useProductGetById,
    useProductGetImages,
    useProductList,
    useProductUpdate,
    useProductUpdateImages,
    useProductUpdateQuantity,
    useProductUpdateRating,
    useProductUpdateStatus,
    useShopProductList,
  };
};
