import { Lock, Mail, ArrowRight } from "lucide-react"
import { useState } from "react";


function LoginPage() {

    const [email, setEmail] = useState("");

    return (
        <div className="login-page bg-gray-50 h-screen w-full flex justify-center items-center">
            <form className='login-form bg-white h-auto w-auto py-6 px-8 shadow-xl text-center flex flex-col justify-center items-center gap-6 rounded-3xl'>
                <div className="icon bg-gray-100 p-4 rounded-full shadow-md">
                    <Lock />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold">
                        Sign In
                    </h1>
                    <p className="border-b border-dashed border-gray-300 pb-8 sm:px-4 text-gray-600">
                        Enter your email to send a code.
                    </p>
                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-left font-semibold">
                        Email adresse :
                    </label>
                    <div className="relative w-64 sm:w-78">
                        <Mail
                            size={16}
                            className="absolute left-2 top-[31%] text-gray-400"
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@gmail.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border border-gray-300 rounded-xl pl-8 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button type="submit" className="flex flex-row justify-center gap-1 bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 hover:cursor-pointer transition w-64 sm:w-78">
                    Send code
                    <ArrowRight />
                </button>
                <div className="flex flex-col gap-1 w-[100%]">
                    <p className="text-start text-sm text-gray-600">
                        Don't have an account?
                    </p>
                    <a href="" className="text-end underline text-blue-600 hover:text-blue-800">
                        Sign up?
                    </a>
                </div>
            </form>
        </div>
    )
}

export default LoginPage