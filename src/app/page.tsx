"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'


const images = {
  src: '/assets/wallpaper.jpg',
  alt: 'Welcome Image',
  width: 1920,
  height: 1080,
}

export default function Page() {
  const router = useRouter();
  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <Image
        src={images.src}
        alt={images.alt}
        width={images.width}
        height={images.height}
        className="object-cover"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
          zIndex: -1,
        }}
      />

      <div className='absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center text-white px-4'>
        <h2 className='text-gray-300 font-bold text-5xl'>Welcome!</h2>
        <p className='pt-3 '>This application helps you Track Petroleum Commodities</p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 w-full max-w-md px-8">

        <Button onClick={() => router.push('/signin')} className="w-full bg-primary hover:bg-primary/90 rounded-xl py-6 shadow-lg shadow-black/50 " size="lg">
          Explore Now
          <ArrowRight className="ml-2 h-6 w-6" />
        </Button>

      </div>

    </div>

  )
}
