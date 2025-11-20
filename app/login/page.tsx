"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";

const Page = () => {
  console.log("rendering");
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <SignIn routing="hash" />
    </div>
  );
};

export default Page;

// import { useUser } from '@clerk/nextjs'

// const {user} = useUser()

// // loggedUser
// useEffect(()=>{
//   if(user){
//     // Send post request to api/login -> email clerkId
//   }
// },[user])
