import { useAppSelector, useAppDispatch } from "@/hooks";

export function useGetUser() : UserResponse | null {
  const user = useAppSelector((state) => state.user.data);
  return user;
}

export function useSetUser() : (user: UserResponse) => void {
  const dispatch = useAppDispatch();
  return (user: UserResponse) => {
    dispatch({ type: 'user/setUser', payload: user });
  };
}

export function useClearUser() : () => void {
  const dispatch = useAppDispatch();
  return () => {
    dispatch({ type: 'user/clearUser' });
  };
}

export function useisUserLoggedIn() : boolean {
  const user = useGetUser();
  return user !== null;
}