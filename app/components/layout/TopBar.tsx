"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/app/lib/constants'

const TopBar = () => {
    const [dropdownMenu,setDropdownMenu]= useState(false)
    const pathname = usePathname();
  return (
    <div className='sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 bg-blue-2 shadow-xl lg:hidden'>
        <Image src="/logo.png" alt='logo' width={150} height={70}/>
        <div className='flex gap-8 max-md:hidden'>
            {navLinks.map((link)=>(
                <Link href={link.url} key={link.url} className={`flex gap-4 text-body-medium ${pathname===link.url ? "text-blue-1":"text-grey-1"}`}>
                   <p>{link.label}</p>
                </Link>
            ))}
        </div>
        <div className='relative flex gap-4 text-body-medium items-center'>
            <Menu className='cursor-pointer md:hidden' size={24} onClick={()=>setDropdownMenu(!dropdownMenu)}/>
            {
                dropdownMenu && (
                    <div className='absolute top-14 right-6 bg-white p-4 rounded-lg shadow-xl flex flex-col gap-4'>
                        {navLinks.map((link)=>(
                            <Link href={link.url} key={link.url} className='flex gap-4 text-body-medium hover:bg-blue-2 text-grey-1 p-2 rounded-md'>
                                <p>{link.label}</p>
                            </Link>
                        ))}
                    </div>
                )
            }
            <UserButton/>
       
        </div>
    </div>
  )
}

export default TopBar