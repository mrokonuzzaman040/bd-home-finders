import { useQuery } from "@tanstack/react-query";
import useSecureApi from "./useSecureApi";

const useAddtoWishList = () => {
    const axiosSequre = useSecureApi();

    const { data: wishList = [], isPending: loading, refetch } = useQuery({
        queryKey: ['wishList'],
        queryFn: async () => {
            const res = await axiosSequre.get('/wishlist');
            return res.data;
        }
    })

    return { wishList, loading, refetch };

};

export default useAddtoWishList;