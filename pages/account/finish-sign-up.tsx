import { auth } from '@components/firebase';
import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import { useLocalStorage } from 'react-use';
import firebase from 'firebase';

export default function FinishSignUp() {
  const router = useRouter()
  const [email, setEmail] = useLocalStorage<string | null>('emailForSignIn', '');
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  console.log(email, router.asPath)
  useEffect(() => {
    if (auth.isSignInWithEmailLink(router.asPath)) {
      if (!email) {
        setEmail(window.prompt('Please provide your email for confirmation'));
      }
      // The client SDK will parse the code from the link for you.
      auth.signInWithEmailLink(email || "", router.asPath)
        .then((result: firebase.auth.UserCredential) => {
        })
        .catch((error) => {
          // router.push("/account")
        });
    }
  }, [email])

  return (
    <Layout title="Payment Success">
      <HeaderSolid />
      <div className="p-40 text-left w-full">
        <h2>Welcome to Kubernetic Account!</h2>
        <h6>Please complete the registration form below</h6>
        <div className="flex flex-col w-96 items-center pt-4 space-y-2">
          <div className="flex w-full items-center">
            <span className="w-40">Email Address</span>
            <span className="px-2 py-1 w-full">{email}</span>
          </div>
          <Field title="First Name" value={firstName} setValue={setFirstName} />
          <Field title="Last Name" value={lastName} setValue={setLastName} />
          <Field type="password" title="Password" value={password} setValue={setPassword} />
          <Field type="password" title="Repeat Password" value={repeatPassword} setValue={setRepeatPassword} />
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

interface FieldProps { title: string, type?: string, value: string, setValue(value: string): void }
function Field({ title, type, value, setValue }: FieldProps) {
  return (
    <div className="flex w-full items-center">
      <span className="w-40">{title}</span>
      <input type={type} className="border px-2 py-1 w-full" value={value} onChange={e => setValue(e.target.value)} />
    </div>
  )
}