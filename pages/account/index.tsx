import { auth } from '@components/firebase';
import Footer from '@components/Footer';
import { HeaderSolid } from '@components/Header';
import Layout from '@components/layouts/Layout';
import { actionTypes } from '@components/reducer';
import { useStateValue } from '@components/StateProvider';
import { redirect } from 'next/dist/next-server/server/api-utils';
import React, { useState } from "react";
import { AiOutlineSecurityScan } from 'react-icons/ai'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { ImUsers } from 'react-icons/im'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use';

export default function SuccessfulPayment() {
  return (
    <Layout title="Login">
      <HeaderSolid />
      <div className="px-20 py-40 text-center">
        <div className="grid sm:grid-flow-col">
          <div className="pr-4 text-left whitespace-nowrap flex-shrink">
            <h3 className="pb-8 text-gray-700">Welcome to Kubernetic Account</h3>
            <AccountSection icon={<AiOutlineSecurityScan size={32} />} title="Access your purchases" subtitle="and view your order history" />
            <AccountSection icon={<AiOutlineSafetyCertificate size={32} />} title="Identify expired and outdated licenses" subtitle="order new licenses and upgrades" />
            <AccountSection icon={<ImUsers size={32} />} title="Manage your company licenses" subtitle="and distribute them to end users" />
          </div>
          <div className="sm:pl-12 space-y-12">
            <LoginCard />
            <SignUpCard />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  )
}

interface AccountSectionProps { icon: any, title: string, subtitle: string }
function AccountSection({ icon, title, subtitle }: AccountSectionProps) {
  return (
    <div className="flex items-center text-gray-500 pb-4">
      {icon}
      <div className="pl-4">
        <p className="font-semibold tracking-widest">{title}</p>
        <p className="font-light">{subtitle}</p>
      </div>
    </div>
  )
}

function LoginCard() {
  const [, dispatch] = useStateValue() as any;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const signIn = (e: any) => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .then(result => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        })
      }).catch(error => {
        alert(error.message)
      })
  }

  return (
    <form className="bg-gray-100 text-left p-4 text-gray-600 space-y-2 w-80" onSubmit={signIn}>
      <h6 className="pb-2">Sign in with existing account</h6>
      <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full px-2 py-1 border" placeholder="Email address" />
      <input value={password} onChange={(e) => { setPassword(e.target.value) }} type="password" className="w-full px-2 py-1 border" placeholder="Password" />
      <div className="flex items-center pt-2">
        <button type="submit" className="bg-blue-500 text-white rounded-md whitespace-nowrap px-4 py-1">Sign In</button>
        <span className="text-sm text-right w-full">Forgot password?</span>
      </div>
    </form>
  )
}

function SignUpCard() {
  const [, dispatch] = useStateValue() as any;
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [emailForSignIn, setEmailForSignIn] = useLocalStorage("emailForSignIn")
  var actionCodeSettings = {
    url: 'http://localhost:3000/account/finish-sign-up',
    handleCodeInApp: true,
  };

  const signUp = (e: any) => {
    e.preventDefault();

    auth.sendSignInLinkToEmail(email, actionCodeSettings)
      .then(result => {
        setEmailForSignIn(email);
        dispatch({
          type: actionTypes.SET_USER,
          user: email,
        })
        router.push("/account/signup-request")
      }).catch(error => {
        alert(error.message)
      })
  }
  return (
    <form className="bg-gray-100 text-left p-4 text-gray-600 space-y-2 w-80" onSubmit={signUp} >
      <h6 className="pb-2">Create new account</h6>
      <input value={email} onChange={(e) => { setEmail(e.target.value) }} className="w-full px-2 py-1 border" placeholder="Email address" />
      <div className="flex items-center pt-2">
        <button type="submit" className="bg-blue-500 text-white rounded-md whitespace-nowrap px-4 py-1">Sign Up</button>
      </div>
    </form>
  )
}