import Image from "next/image";

export default function Banner() {
    return (
        <Image
            src="/images/banner.webp"
            alt="Monalisa"
            width={1500}
            height={900}
            className='h-96 min-w-full object-cover object-center'
        />
    )
}