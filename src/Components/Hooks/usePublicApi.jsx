import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://bdhomefinders.vercel.app',
});

const usePublicApi = () => {
    return axiosPublic;
};

export default usePublicApi;

