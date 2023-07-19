import Image from "next/image";
import ActionButton from "@/components/ActionButton/ActionButton";
import { Link as ScrollLink } from 'react-scroll';

export default function Landing() {

    return (
        <main className="flex w-full lg:h-screen flex-col-reverse pb-8 lg:pb-0 lg:flex-row bg-white overflow-hidden">

            {/* Create two containers, one with text and another image */}
            <div data-aos="fade-right" className="flex flex-col gap-4 w-12/12 lg:w-6/12 2xl:w-5/12 justify-center py-8 lg:py-0 px-8 md:px-32">
                <h1 className="text-6xl md:text-8xl font-bold text-black">
                    Dobble
                </h1>
                <p className="text-2xl md:text-3xl text-black">
                    Find out if you were painted in a distant era, by a famous painter.
                </p>

                {/* Use the Button component */}
                <ScrollLink to="finder" smooth={true} duration={750}>
                    <ActionButton>Find Me</ActionButton>
                </ScrollLink>
            </div>

            {/* Use the Image component that covers all the width */}
            <div data-aos="fade-left" className="w-full lg:w-6/12 2xl:w-7/12 relative">
                <Image
                    priority
                    src="/images/hero.webp"
                    alt="Monalisa"
                    width={1500}
                    height={1500}
                    className='h-full min-w-full object-cover'
                />
            </div>

        </main>
    )
}