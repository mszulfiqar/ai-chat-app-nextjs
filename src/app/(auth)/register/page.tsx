"use client"
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import React, { useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { SubmitHandler, useForm } from 'react-hook-form'
import { CheckedState } from '@radix-ui/react-checkbox'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type Inputs = {
    name: string
    email: string
    password: string
    confirmPassword: string
}

const Page = () => {
    const [showPassword, setShowPassword] = useState<CheckedState>(false);
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

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.confirmPassword !== data.password) return toast.error("Confirm Password does not match!");

        const sendingData = {
            name: data.name,
            email: data.email,
            password: data.password
        }
        // register_form_mutation.mutate(sendingData);
    }
    return (
        <div className='mt-[20px]'>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                {/* Name field */}
                <div className='my-[20px]'>
                    <label htmlFor="" className='text-20px font-medium'>Name:</label>
                    <div className='flex items-center border-b-[2px] border-t-[2px] border-[#0E87CC] relative'>
                        <Input className='border-l-0 border-r-0  rounded-none focus:outline-none !text-[16px]   shadow-none focus:shadow-none focus:ring-0' {...register("name", { required: true })} />
                        <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("name")}`} />
                    </div>
                </div>
                {/* Email Field */}
                <div className='my-[20px]'>
                    <label htmlFor="" className='text-20px font-medium'>Email:</label>
                    <div className='flex items-center border-b-[2px] border-t-[2px] border-[#0E87CC] relative'>
                        <Input className='border-l-0 border-r-0 !text-[16px]  rounded-none focus:outline-none  shadow-none focus:shadow-none focus:ring-0' {...register("email", {
                            required: true, pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email address",
                            },
                        })} />
                        <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("email")}`} />
                        {
                            errors.email?.message ? (
                                <div className="absolute right-[4%] top-[-85%] mt-2">
                                    <div className="relative bg-[#ffffff] shadow-xl border font-medium text-[black] text-sm px-3 py-2 rounded-lg">
                                        {errors.email?.message}
                                    </div>
                                </div>
                            ) : " "
                        }

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
                                    "Must include A-Z, 0-9, and a symbol.",
                            },
                        })} />
                        <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("password")}`} />
                        {
                            errors.password?.message ? (
                                <div className="absolute right-[4%] top-[-85%] mt-2">
                                    <div className="relative font-medium bg-[#ffffff] shadow-xl border text-[black] text-sm px-3 py-2 rounded-lg ">
                                        {errors.password?.message}
                                    </div>
                                </div>
                            ) : " "
                        }

                    </div>
                </div>
                {/* Confirm Password */}
                <div className='my-[20px]'>
                    <label htmlFor="" className='text-20px font-medium'>Confirm Password:</label>
                    <div className='flex items-center border-b-[2px] border-t-[2px] border-[#0E87CC] relative'>
                        <Input type={showPassword == true ? "text" : "password"} className='font-normal !text-[16px] border-l-0 border-r-0  rounded-none focus:outline-none  shadow-none focus:shadow-none focus:ring-0' {...register("confirmPassword", {
                            required: true, minLength: {
                                value: 8,
                                message: "Password must be at least 8 characters long",
                            },
                            pattern: {
                                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/,
                                message:
                                    "Must include A-Z, 0-9, and a symbol.",
                            },
                        })} />
                        <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("confirmPassword")}`} />
                        {
                            errors.confirmPassword?.message ? (
                                <div className="absolute right-[4%] top-[-85%] mt-2">
                                    <div className="relative font-medium bg-[#ffffff] shadow-xl border text-[black] text-sm px-3 py-2 rounded-lg">
                                        {errors.confirmPassword?.message}
                                    </div>
                                </div>
                            ) : " "
                        }

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
                    <Link href="/sigin" className='font-light underline'>Alreagy have an account?</Link>
                </div>
                {
                    //   register_form_mutation.isPending ?
                    //     <Button className="flex items-center gap-2 w-full !p-6 mt-5 cursor-pointer hover:bg-primary/70">
                    //       <Loader2 className="w-5 h-5 animate-spin" />
                    //       Submitting............
                    //     </Button> :
                    <Button className='w-full !p-6 mt-5 '>Create an account</Button>
                }
                {/* <MorphingButton  idleText="Create Account" /> */}
            </form>

            <div className="flex items-center mt-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 font-medium">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="flex items-center justify-center mt-2">
                <button className="flex items-center justify-center border rounded-md shadow-xs   bg-white  border-gray-300   hover:bg-gray-100 transition flex-1 mr-2 py-2">
                    <Image
                        src="/facebook.png"
                        width={20}
                        height={20}
                        alt='facebook logo'
                    />
                </button>

                <button className="flex items-center justify-center  p rounded-md shadow-xs border  transition flex-1 py-2 hover:bg-gray-100 ">
                    <Image
                        src="/google.png"
                        width={20}
                        height={20}
                        alt='google logo'

                    />
                </button>
            </div>

        </div>

    )
}

export default Page