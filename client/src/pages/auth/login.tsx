import { useState } from "react";


function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className='login-page bg-[url(assets/images/bg-image-login-page.jpg)] h-screen w-full bg-cover min-h-[100vh] min-w-[100vw] flex justify-center md:justify-evenly items-center'>
            <div className="flex flex-col gap-6 filter">
                <h1 className='hidden md:block lg:text-6xl text-white text-4xl text-shadow-lg drop-shadow-lg font-bold text-center'>
                    Welcome to
                    <br /><span className="text-[#DFA408]">CashTrail app</span>
                    !
                </h1>
                <p className="hidden md:block lg:text-lg text-white text-sm font-semibold text-shadow-lg drop-shadow-lg">
                    You can easily track your daily expenses, monitor your
                    <br />budget, and gain complete control over your finances.
                    <br />Stay organized, make smarter financial decisions,
                    <br />and reach your goals faster — all in one simple,  
                    <br />intuitive platform.
                </p>
            </div>
            <div id="login-form" className="bg-white/40 backdrop-blur-xs rounded-4xl py-[30px] md:px-[60px] px-[20px] flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email-input" className="text-white text-shadow-lg drop-shadow-lg font-bold">email:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-sm bg-white p-1" type="email" name="email-input" id="email-input" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password-input" className="text-white text-shadow-lg drop-shadow-lg font-bold">password:</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-sm bg-white p-1" type="password" name="password-input" id="password-input" />
                    </div>
                    <a href="" className="self-end">
                        <p className="text-white underline hover:text-gray-100">Forget password?</p>
                    </a>
                </div>
                <button className="text-white font-bold py-2 bg-[#001948] rounded-sm hover:bg-[#001960] hover:cursor-pointer active:scale-95">
                    Sign in
                </button>
                <div className="flex flex-row items-center gap-4">
                    <div className="flex-1 border-t border-white"></div>
                    <p className="text-white">or</p>
                    <div className="flex-1 border-t border-white"></div>
                </div>
                <div>
                    <p className="flex flex-row gap-2 text-white">
                        Are you new?
                        <a href="">
                            <p className="text-blue-600 underline hover:text-blue-500">Create a new account</p>
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage