"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { CheckedState } from '@radix-ui/react-checkbox'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Inputs } from '@/utils/types'
import { signIn } from '@/app/actions/authentication'
import { toast } from 'sonner'
import { ClipLoader } from 'react-spinners'
import { authClient } from '@/lib/auth-client'

const Page = () => {
    const [showPassword, setShowPassword] = useState<CheckedState>(false);
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>({ mode: "onChange" });
    const onError = (errors: any) => {
        const firstErrorField = Object.keys(errors)[0] as keyof Inputs;
        const message = errors[firstErrorField]?.message || "Invalid input";
        toast.error(message);
    };

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        setLoading(true)
        const response = await signIn(formData);

        if (response.status == false) {
            setLoading(false)
            toast.error(response?.message || "Signup failed!")
        }

    }
    const signInwithGoogle = async () => {
        // console.log("hi")
        setLoading(true)
        const data = await authClient.signIn.social({
            provider:"google"
        })
        console.log(data?.error)
        setLoading(false)
    }
    const signInwithFacebook = async () => {
        console.log("hi")
        const data = await authClient.signIn.social({
            provider:"facebook"
        })
        console.log(data?.error)
    }
    return (
        <>
            {
                loading ?
                    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
                        <div className="bg-white p-8  text-center gap-2 flex justify-between items-center">
                            <ClipLoader />
                            <p className="text-lg font-medium">Logging In…</p>
                        </div>
                    </div> :
                    <div className=' h-[100vh] px-2 flex items-center '>
                        <div className='  min-w-[50%] h-full rounded-3xl relative border-r-0 bg-gradient-to-b  from-[#0C6FA0] to-[#0E87CC] max-md:hidden'>
                            <div className='absolute left-1/2 -translate-x-1/2 top-[25%] text-center text-white flex flex-col '>
                                <div className='flex flex-col items-center justify-center mt-[50px] '>
                                    <div className='rounded-full p-4 bg-white  mb-[20px] '>
                                        <Image src="/welcome.jpg" alt='logo' width={50} height={50} className='text-white' />
                                    </div>

                                    <div className='flex justify-center max-lg:text-[2px]'>
                                        <h2 className='text-3xl max-xl:text-[25px]  font-bold max-lg:text-[20px] '>Welcome! <br />Sign In to continue</h2>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* <Sigin /> */}
                        <div className='h-screen max-sm:px-[20px] px-12 max-md:pt-[60px]  pt-[20px] w-full overflow-hidden '>
                            <h2 className='text-center  text-2xl font-medium mt-[50px]'>Log in to WeChat</h2>
                            <p className='text-center text-[#807b7b] text-[13px] mt-[10px] font-semibold'>Login with your Facebook or Google account</p>
                            <div className='mt-[20px]'>
                                <div className="flex flex-col lg:flex-row items-center justify-center mt-2 gap-2">
                                    <button onClick={signInwithFacebook} className="max-lg:w-full flex-1 flex gap-2 items-center justify-center border rounded-md shadow-xs bg-white border-gray-300 hover:bg-gray-100 transition py-2">
                                        <Image src="/facebook.png" width={20} height={20} alt='facebook logo' />
                                        <span className='text-sm font-semibold'>Login with Facebook</span>
                                    </button>

                                    <button onClick={signInwithGoogle} className="max-lg:w-full flex-1 flex gap-2 items-center justify-center border rounded-md shadow-xs bg-white border-gray-300 hover:bg-gray-100 transition py-2">
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
                                        </div>
                                    </div>
                                    {/* Password */}
                                    <div className='my-[20px]'>
                                        <div className='flex justify-between'>
                                            <label htmlFor="" className=' font-medium'>Password:</label>
                                            <Link href="" className='text-[13px] hover:underline hover:underline-offset-4 font-medium'>Forgot your password?</Link>
                                        </div>
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
                                <div className='flex justify-center mt-[10px] text-[15px] gap-1'>
                                    <span className=''>Don&apos;t have an account?</span><Link href="/register" className='font-medium'>Sign up</Link>
                                </div>
                            </div>
                        </div>
                        {/*  */}
                    </div>
            }
        </>

    )
}

export default Page