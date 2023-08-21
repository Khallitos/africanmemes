import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import { Alert } from "../../components";
import { useRouter } from 'next/router'


// state for form

export default function verify () {
  const { verifyUser, isVerified } = useAppContext();
  const router = useRouter()
  const { verify } = router.query
  console.log(verify)


  const getVerified = () => {
     verifyUser(verify);
  };

  useEffect(() => {
    getVerified();
    setTimeout(() => {
      if (isVerified) {
        router.push('/login')
      }
    }, 3000);
  }, [isVerified]);
  return <div></div>;
};
