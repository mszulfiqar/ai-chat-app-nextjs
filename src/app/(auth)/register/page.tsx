"use client"
import CreateAcount from "@/components/custom/CreateAcount"
import Image from "next/image"
import { useState } from "react"
import { ClipLoader } from "react-spinners"

const Page = () => {
    const [pending, setPending] = useState(false);

    return (
        <>
            {
                pending ?
                    <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50">
                        <div className="bg-white p-8  text-center gap-2 flex justify-between items-center">
                            <ClipLoader />
                            <p className="text-lg font-medium">Authenticating…</p>
                        </div>
                    </div> 
                    :
                    <div className='max-w-[100%]  h-[100vh] px-2 flex items-center '>
                        <div className=' max-sm:max-w-[100%] min-w-[50%] h-full rounded-3xl relative border-r-0 bg-gradient-to-b from-[#0C6FA0] to-[#0E87CC] max-md:hidden'>
                            <div className='bg-white rounded-[30px] w-[60px] h-[523px] absolute top-[10%] left-[95%] max-lg:hidden '></div>
                            <div className='absolute top-[20%] left-[20%] text-center text-white flex flex-col items-center '>
                                <div className='rounded-full p-4 bg-white w-max mb-[20px]'>
                                    <Image src="/chat.png" alt='logo' width={30} height={30} className='text-white' />
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h1 className="text-4xl max-xl:text-3xl max-lg:text-xl max font-bold mb-6">Connect, Chat & Share</h1>
                                    <ul className="space-y-4 max-lg:text-[12.4px]">
                                        <li className="flex items-start ">
                                            <span className="text-green-300 mr-3 text-xl">✓</span>
                                            <p>Instant messaging with friends and family</p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-300 mr-3 text-xl">✓</span>
                                            <p>Share images, videos, and files seamlessly</p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-300 mr-3 text-xl">✓</span>
                                            <p>Create group chats with your communities</p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-300 mr-3 text-xl">✓</span>
                                            <p>Real-time notifications and online status</p>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-green-300 mr-3 text-xl">✓</span>
                                            <p>Secure and private conversations</p>
                                        </li>
                                    </ul>
                                </div>

                                {/* <p className="mt-6 font-semibold text-center">Sign up today and start chatting!</p> */}
                            </div>
                        </div>
                        <CreateAcount loading={pending} setLoading={setPending} />
                    </div>
            }
        </>


    )
}

export default Page