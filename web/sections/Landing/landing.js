import Image from "next/image";
import ActionButton from "@/components/ActionButton/ActionButton";

export default function Landing() {

    return (
        <main className="flex h-screen bg-white overflow-hidden">

            {/* Create two containers, one with text and another image */}
            <div data-aos="fade-right" className="flex flex-col gap-4 w-5/12 justify-center px-32">
                <h1 className="text-8xl font-bold text-black">
                    Dobble
                </h1>
                <p className="text-3xl text-black">
                    Find out if you were painted in a distant era, by a famous painter.
                </p>

                {/* Use the Button component */}
                <ActionButton>Find Me</ActionButton>
            </div>

            {/* Use the Image component that covers all the width */}
            <div data-aos="fade-left" className="w-7/12 relative">
                <Image
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