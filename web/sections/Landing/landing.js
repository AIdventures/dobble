import Image from "next/image";
import Button from "@/components/button";
import ActionButton from "@/components/ActionButton/ActionButton";

export default function Landing() {
    return (
        <main className="flex h-screen">

            {/* Create two containers, one with text and another image */}
            <div className="flex flex-col gap-4 w-5/12 justify-center px-32 bg-white">
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
            <div className="w-7/12">
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