export default function Button({ children, ...props }) {
    return (
        <button
        className={`
            w-fit
            inline-flex items-center justify-center gap-2
            px-4 py-2
            font-medium text-sm text-white
            bg-gradient-to-br from-blue-500 to-blue-600
            rounded-md shadow-sm
            focus:outline-none focus:ring-2 focus
            :ring-offset-2 focus:ring-blue-500
            hover:from-blue-600 hover:to-blue-700
            active:from-blue-700 active:to-blue-800
            disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed
            dark:from-blue-400 dark:to-blue-500
            dark:hover:from-blue-500 dark:hover:to-blue-600
            dark:active:from-blue-600 dark:active:to-blue-700
            dark:disabled:from-gray-700 dark:disabled:to-gray-800
            dark:disabled:cursor-not-allowed
        `}
        {...props}
        >
            {children}
        </button>
    )
}