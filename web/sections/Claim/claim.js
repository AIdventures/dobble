import styles from "./Claim.module.css";

export default function Claim() {
    return (
        <div className={`
            text-xl sm:text-2xl md:text-3xl xl:text-5xl leading-snug
            text-white
            px-14 md:px-24 xl:px-32 py-16
        ` + styles.claim}>
            <p data-aos="fade-right">
                Discover your artistic doppelgänger at the Prado Museum with our <b>AI-powered tool</b> that matches your face to the closest resemblance in famous masterpieces.
            </p>
        </div>
    )
}