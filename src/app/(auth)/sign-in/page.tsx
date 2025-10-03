import Image from 'next/image'
import React from 'react'
import Sigin from './_components/Sigin'

const Page = () => {
    return (
        <div className=' h-[100vh] px-2 flex items-center '>
            <div className='  min-w-[50%] h-full rounded-3xl relative border-r-0 bg-gradient-to-b from-[#0C6FA0] to-[#0E87CC] max-md:hidden'>
                <div className='absolute left-1/2 -translate-x-1/2 top-[25%] text-center text-white flex flex-col '>
                    <div className='flex flex-col items-center justify-center mt-[50px] '>
                        <div className='rounded-full p-4 bg-white  mb-[20px] '>
                            <Image src="/welcome.jpg" alt='logo' width={50} height={50} className='text-white' />
                        </div>

                        <div className='flex justify-center'>
                            <h2 className='text-4xl max-xl:text-3xl  font-bold '>Welcome! <br />Sign In to continue</h2>
                        </div>
                    </div>
                </div>
            </div>
            {/* <CreateAcount loading={pending} setLoading={setPending} /> */}
            <Sigin />
        </div>
    )
}

export default Page