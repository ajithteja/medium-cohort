import { SignUpInputType } from "@ajithteja/medium-common"
import axios from "axios"
import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import { BACKEND_URL } from "../config";

export const Auth = ({ type }: {type: "signup" | "signin"}) => {
    const navigate = useNavigate()
    
    const [postuserInputs, setPostuserInputs] = useState<SignUpInputType>({
        name: "",
        email: "",
        password: ""
    })

    const sendRequest = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup": "signin"}`, postuserInputs)
            const jwt = response.data.token;
            localStorage.setItem("token", jwt)
            navigate("/blogs")
        } catch (error) {
            console.log(error)
        }
    }

    return <div className="h-screen flex justify-center flex-col">
        <div className=" flex justify-center " >
            <div className="w-7/12">
            <div className="text-center">
                <div className=" text-3xl font-extrabold" >
                    Create an account
                </div>
                <div className="text-slate-500" >
                    { type === "signin" ? "Don't have an account?": "Already have an account?" } 
                    <Link to={ type === "signin"? "/signup": "/signin" } className="pl-2 underline">{ type == "signin" ? "signup": "signin" }</Link>
                </div>
            </div>
            { type === "signup" && <LabelledInput label = "Username" placeholder = "Harkirat Sing..." onChange = {(e) => {
                setPostuserInputs(c => ({
                    ...c,
                    name: e.target.value
                }))
            }} /> }
            
            
            <LabelledInput label = "Email" placeholder = "Harkirat Sing..." onChange = {(e) => {
                setPostuserInputs(c => ({
                    ...c,
                    email: e.target.value
                }))
            }} />
            
            <LabelledInput label = "Password" type= {"password"} placeholder = "" onChange = {(e) => {
                setPostuserInputs(c => ({
                    ...c,
                    password: e.target.value
                }))
            }} />
            <button onClick={sendRequest} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type}</button>

            </div>
            
        </div>        
    </div>
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    type?: string
}

export function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
    return <div>
        <label className="mt-3 block mb-2 text-xl font-medium text-gray-900 dark:text-white">{label}</label>
        <input onChange={onChange} type={type || "text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
        </div>

}