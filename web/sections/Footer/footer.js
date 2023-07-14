import Link from "next/link";

export default function Footer() {
    return (
        <div className={`
            text-base leading-snug
            bg-black text-white
            px-32 py-16
        `}>
            Built by <Link href="https://maparla.es" className="underline">Mario Parreño</Link> with <span className="text-xl">♥</span>
        </div>
    )
}