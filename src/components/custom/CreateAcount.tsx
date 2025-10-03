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
import { CreateAccountProps, Inputs } from '@/utils/types'
import { createUser } from '@/app/actions/createUser'
import { useRouter } from 'next/navigation'

const CreateAcount = ({ loading, setLoading }: CreateAccountProps) => {
    const [showPassword, setShowPassword] = useState<CheckedState>(false);
    const router = useRouter()
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
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        
        if (data.confirmPassword !== data.password) return toast.error("Confirm Password does not match!");

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("password", data.password);
        setLoading(true)
        const response = await createUser(formData);

        if (response.status == false) {
            toast.error(response?.message || "Signup failed!")
        }
        setLoading(false)
    }
    return (
        <div className='h-screen max-sm:px-[20px] px-12 max-md:pt-[60px]  pt-[20px] w-full overflow-hidden '>
            <h2 className='text-center text-2xl font-medium'>Create your account</h2>
            <div className='mt-[20px]'>
                <form onSubmit={handleSubmit(onSubmit, onError)} className=''>
                    {/* Name field */}
                    <div className='my-[20px]'>
                        <label htmlFor="" className=' font-medium'>Name:</label>
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
                            <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("password")}`} />
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
                                        "Password Must include A-Z, 0-9, and a symbol.",
                                },
                            })} />
                            <IoMdCheckmarkCircleOutline className={`h-5 w-5 ${getTickColor("confirmPassword")}`} />
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

                <div className="flex items-center mt-2">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="mx-4 text-gray-500 text-[15px] font-medium">Or Continue with</span>
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
        </div>
    )
}

export default CreateAcount