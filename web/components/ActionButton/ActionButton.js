import styles from "./ActionButton.module.css";

export default function ActionButton({ children, ...props }) {
    return (
        <div role="button"
        className={`
            w-fit
            mt-4
        ` + styles.actionButton} 
        {...props}
        >
            {children}
        </div>
    )
}