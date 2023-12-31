import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import usePublicApi from '../../../Components/Hooks/usePublicApi';
import Swal from 'sweetalert2';
import useAuth from '../../../Components/Hooks/useAuth';
import useSecureApi from '../../../Components/Hooks/useSecureApi';
import { Helmet } from "react-helmet";


// Image Hosting
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useSecureApi();
    const { user } = useAuth();
    const [image, setImage] = useState();

    const handelAddProperty = async (data) => {
        const formData = new FormData();
        formData.append('image', data.home_photo[0]);
        fetch(image_hosting_api, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json()).then((res) => {
                setImage(res.data.display_url)
                if (res.data.display_url) {
                    const newProperty = {
                        home_name: data.home_name,
                        home_location: data.home_location,
                        home_description: data.home_description,
                        home_starting_price: data.home_starting_price,
                        home_ending_price: data.home_ending_price,
                        home_type: data.home_type,
                        home_area: data.home_area,
                        home_bed: data.home_bed,
                        home_bath: data.home_bath,
                        home_garage: data.home_garage,
                        home_size: data.home_size,
                        home_status: 'Pending',
                        home_photo: res.data.display_url,

                        home_owner_name: user.displayName,
                        home_owner_email: user.email,
                        home_owner_phone: user.phoneNumber,
                        home_owner_photo: user.photoURL,
                    }
                    axiosSecure.post('/propertys', newProperty)
                        .then(res => {
                            if (res.status === 200) {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'success',
                                    title: 'Property Added',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                                reset();
                            }
                            else {
                                Swal.fire({
                                    position: 'top-end',
                                    icon: 'error',
                                    title: 'Something went wrong',
                                    showConfirmButton: false,
                                    timer: 1500
                                })
                            }
                        })
                }
            })


    }

    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Add Property ||bdHomeFinders</title>
                <link rel="canonical" href="https://i.ibb.co/VxJBfnG/rokon-high-resolution-logo-transparent.png" />
            </Helmet>
            <div className="flex flex-col items-center justify-center mt-3">
                <h2 className='text-2xl'>Add Your Property </h2>
                <div className="divider text-indigo-400"></div>
            </div>
            <div className="">
                <form onSubmit={handleSubmit(handelAddProperty)} className="w-full ">
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                                Property Name
                            </label>
                            <input {...register('home_name', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-indigo-100" id="grid-first-name" type="text" placeholder="Amar Villa" />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                                Property Location
                            </label>
                            <input {...register('home_location', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-last-name" type="text" placeholder="Mirpur-11" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                Property Description
                            </label>
                            <textarea {...register('home_description', { required: true })} className="textarea textarea-bordered h-32 w-full" placeholder=" Property Description"></textarea>
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 gap-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-price">
                                Price Rangge
                            </label>
                            <div className="flex gap-3 items-center">
                                <input {...register('home_starting_price', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-price" type="text" placeholder="$100" />
                                <p className=""> - </p>
                                <input {...register('home_ending_price', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-time" type="text" placeholder="$999" />
                            </div>
                        </div>

                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Property Type
                            </label>
                            <div className="relative">
                                <select {...register('home_type', { required: true })} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-state">
                                    <option>Flat</option>
                                    <option>House</option>
                                    <option>Office</option>
                                    <option>Shop</option>
                                    <option>Garage</option>
                                    <option>Land</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 6.707a1 1 0 010-1.414L8.586 1.5a2 2 0 012.828
                                            0l2.829 2.829a1 1 0 11-1.414 1.414L11
                                            4.414V13a1 1 0 11-2 0V4.414L6.707
                                            6.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>

                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Property Area
                            </label>
                            <input {...register('home_area', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-zip" type="text" placeholder="1200" />
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Property Bed
                            </label>
                            <input {...register('home_bed', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-city" type="text" placeholder="3" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Property Bath
                            </label>
                            <div className="relative">
                                <select {...register('home_bath', { required: true })} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-state">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 6.707a1 1 0 010-1.414L8.586 1.5a2 2 0 012.828
                                            0l2.829 2.829a1 1 0 11-1.414 1.414L11
                                            4.414V13a1 1 0 11-2 0V4.414L6.707
                                            6.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Property Garage
                            </label>
                            <input {...register('home_garage', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-zip" type="text" placeholder="1" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Property Size
                            </label>
                            <input {...register('home_size', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-city" type="text" placeholder="1200" />
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                                Property Status
                            </label>
                            <div className="relative">
                                <select {...register('home_status', { required: true })} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-state">
                                    <option>Rent</option>
                                    <option>Sale</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M5.293 6.707a1 1 0 010-1.414L8.586 1.5a2 2 0 012.828
                                            0l2.829 2.829a1 1 0 11-1.414 1.414L11
                                            4.414V13a1 1 0 11-2 0V4.414L6.707
                                            6.707a1 1 0 01-1.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
                                Property Agent
                            </label>
                            <input {...register('home_agent', { required: true })} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" id="grid-zip" type="text" placeholder="1" />
                        </div> */}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Property Image
                            </label>
                            <input {...register('home_photo',)} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-2 px-4 leading-tight focus:outline-none focus:bg-indigo-100 focus:border-indigo-500" type="file" />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-2">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <button className="bg-indigo-500 hover:ring-2 hover:ring-indigo-700  text-white font-bold py-2 px-4 rounded">
                                Add Property
                            </button>
                        </div>
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddProperty;