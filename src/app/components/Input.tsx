"use client"
import { IoSearchOutline } from "react-icons/io5"

type InputProps = {
    city: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
};

const Input = ({ city, onChange, onSubmit }: InputProps) => {
    return (
        <form
            onSubmit={onSubmit}
            className="flex items-center md:w-2/4 w-full order-2 md:order-1"
            role="search"
            aria-label="City search form"
        >
            <label htmlFor="city-search" className="sr-only">
                Search City
            </label>
            <input
                id="city-search"
                type="text"
                placeholder="Search City"
                className="w-full md:w-1/2 bg-transparent border-b-2 placeholder-white outline-none text-white autofill:text-gray-600"
                value={city}
                onChange={onChange}
                aria-required="true"
            />
            <button
                type="submit"
                aria-label="Search city"
                className="ml-[-25px] text-white cursor-pointer"
            >
                <IoSearchOutline aria-hidden="true" />
            </button>
        </form>
    )
}

export default Input;
