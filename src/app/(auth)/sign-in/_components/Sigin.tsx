"use client"
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Inputs } from '@/utils/types'
import { CheckedState } from '@radix-ui/react-checkbox'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { toast } from 'sonner'

const Sigin = () => {
    const [showPassword, setShowPassword] = useState<CheckedState>(false);
    // const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>({ mode: "onChange" });

    const values = watch();

    const getTickColor = (feild: keyof Inputs) => {
        const value = values[feild];
        if (!value) return "text-gray-400";
        if (errors[feild]) return "text-red-500";
        return "text-green-500"
    }
    const onError = (errors: any) => {
        const firstErrorField = Object.keys(errors)[0] as keyof Inputs;
        const message = errors[firstErrorField]?.message || "Invalid input";
        toast.error(message);
    };
    const onSubmit = () => {

    }
    return (
        <div className='h-screen max-sm:px-[20px] px-12 max-md:pt-[60px]  pt-[20px] w-full overflow-hidden '>
            <h2 className='text-center text-2xl font-medium mt-[60px]'>Log in to WeChat</h2>
            <p className='text-center text-[#807b7b] text-[13px] mt-[10px] font-semibold'>Login with your Facebook or Google account</p>
            <div className='mt-[20px]'>
                <div className="flex flex-col lg:flex-row items-center justify-center mt-2 gap-2">
                    <button className="max-lg:w-full flex-1 flex gap-2 items-center justify-center border rounded-md shadow-xs bg-white border-gray-300 hover:bg-gray-100 transition py-2">
                        <Image src="/facebook.png" width={20} height={20} alt='facebook logo' />
                        <span className='text-sm font-semibold'>Login with Facebook</span>
                    </button>

                    <button className="max-lg:w-full flex-1 flex gap-2 items-center justify-center border rounded-md shadow-xs bg-white border-gray-300 hover:bg-gray-100 transition py-2">
                        <Image src="/google.png" width={20} height={20} alt='google logo' />
                        <span className='text-sm font-semibold'>Login with Google</span>
                    </button>
                </div>


                <div className="flex items-center mt-[20px] ">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-[15px] font-medium">Or continue with</span>
                    <div className="flex-grow border-t border-gray-300"></div>
                </div>

                <form onSubmit={handleSubmit(onSubmit, onError)} className=''>
                    {/* Email Field */}
                    <div className='mb-[20px] mt-[10px]'>
                        <label htmlFor="" className='text-20px font-medium'>Email:</label>
                        <div className='flex items-center border-b-[2px] border-t-[2px] border-[#0E87CC] relative'>
                            <Input className='border-l-0 border-r-0 !text-[16px]  rounded-none focus:outline-none  shadow-none focus:shadow-none focus:ring-0' {...register("email", {
                                required: true, pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Enter a valid email address",
                                },
                            })} />
                            {/* <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("email")}`} /> */}
                        </div>
                    </div>
                    {/* Password */}
                    <div className='my-[20px]'>
                        <label htmlFor="" className='text-20px font-medium'>Password:</label>
                        <div className='flex items-center border-b-[2px] border-t-[2px] border-[#0E87CC] relative'>
                            <Input type={showPassword == true ? "text" : "password"} className='!text-[16px] border-l-0 border-r-0  rounded-none focus:outline-none  shadow-none focus:shadow-none focus:ring-0' {...register("password", {
                                required: true, minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                                    message:
                                        "Password Must include A-Z, 0-9, and a symbol.",
                                },
                            })} />
                            {/* <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("password")}`} /> */}
                        </div>
                    </div>

                    <div className='flex items-center justify-between text-[14px]'>
                        <div className='flex items-center gap-2'>
                            <Checkbox className='w-5 h-5 border border-gray-300 rounded
                                                    data-[state=checked]:bg-[#0E87CC]
                                                    data-[state=checked]:border-[#0E87CC]
                                                    focus:ring-0' id='pass' checked={showPassword} onCheckedChange={setShowPassword} />
                            <label htmlFor='pass'>Show Password </label>
                        </div>
                        {/* <Link href="/sigin" className='font-light underline'>Alreagy have an account?</Link> */}
                    </div>
                    <Button className='w-full !p-6 mt-5 '>Create an account</Button>
                </form>
            </div>
        </div>
    )
}

export default Sigin