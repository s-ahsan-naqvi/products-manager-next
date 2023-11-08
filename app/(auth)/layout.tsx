export default function AuthLayout({ children }: { children : React.ReactNode }) {
    return (
        <div className="flex justify-center items-center p-24 h-screen">
            {children}
        </div>
    )
}