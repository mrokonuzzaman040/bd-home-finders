import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://localhost:5000',
});

const usePublicApi = () => {
    return axiosPublic;
};

export default usePublicApi;

