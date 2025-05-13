import React from 'react'
import Link from "next/link";
import Image from "next/image";
import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
    const session = await auth();

    return (
        <header className='px-5 py-3 bg-white text-black shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href={"/"}>
                    <Image src={"/logo.png"} alt='logo' width={144} height={30} />
                </Link>
                <div className='flex items-center gap-5'>
                    {session && session?.user ? (
                        <>
                            <Link className='flex space-x-2' href={"/startup/create"}>
                                <span className='max-sm:hidden'>Create</span>
                                <BadgePlus className='size-6 sm-hidden text-[#007bff]' />
                                
                            </Link>

                            <form action={async () => {
                                "use server"
                                await signOut({ redirectTo: "/" })
                            }}>
                                <button className='cursor-pointer flex space-x-2' type='submit'>
                                    <span className='max-sm:hidden'>Logout</span>
                                    <LogOut className='size-6 sm-hidden text-red-500' />
                                </button>
                            </form>

                            <Link href={`/user/${session?.id || ""}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage className='' src={session?.user?.image || ''} alt={session?.user?.name || ""}  />
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>

                            </Link>
                        </>
                    ) : (
                        <form onClick={async () => {
                            "use server";
                            await signIn('github')
                        }}>
                            <button type='submit' className='cursor-pointer'>
                                <span>Login</span>
                            </button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
