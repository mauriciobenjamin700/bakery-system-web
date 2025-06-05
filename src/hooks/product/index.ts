import { useAppSelector, useAppDispatch } from "@/hooks";

export function useGetProduct() : ProductResponse | null {
  const product = useAppSelector((state) => state.product.data);
  return product;
}

export function useSetProduct() : (product: ProductResponse) => void {
  const dispatch = useAppDispatch();
  return (product: ProductResponse) => {
    dispatch({ type: 'product/setProduct', payload: product });
  };
}

export function useClearProduct() : () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch({ type: 'product/clearProduct' });
  };
}

export function useGetProducts() : ProductResponse | null {
  const product = useAppSelector((state) => state.product.data);
  return product;
}

export function useSetProducts() : (product: ProductResponse[]) => void {
  const dispatch = useAppDispatch();
  return (product: ProductResponse[]) => {
    dispatch({ type: 'product/setProduct', payload: product });
  };
}

export function useClearProducts() : () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch({ type: 'product/clearProduct' });
  };
}