"use client";
import Link from "next/link";
import {X} from "lucide-react";


const SearchFromReset = () => {
    
  const reset = () => {
    const form = document.querySelector('.search-form') as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button onClick={reset} type="reset" className="search-btn ">
     
       <Link href={"/"} className="search-btn text-white">
        <X className="size-5" />
       </Link>
    </button>
    
  )
}

export default SearchFromReset
