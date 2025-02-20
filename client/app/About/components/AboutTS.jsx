import React from 'react'
import Testimonial from './Testimonial'
import SubscribeForm from '@/app/Home/SubscribeForm'

const AboutTS = () => {
    return (
        <div className="px-2 md:px-4 lg:px-16 py-8 mt-6 md:mt-10 space-y-16">
            <Testimonial />
            <SubscribeForm />
        </div>
    )
}

export default AboutTS