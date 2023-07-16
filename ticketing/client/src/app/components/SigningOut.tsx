"use client"

import useRequest from "@/hooks/use-request"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

export default function SigningOut() {
  const router = useRouter()
  const { doRequest } = useRequest()

  const signout = useCallback(async () => {
    try {
      const res = await doRequest({
        url: "/api/users/signout",
        method: "post",
        body: {},
        onSuccess: () => router.replace("/")
      })
    } catch (error) {}
  }, [router, doRequest])

  useEffect(() => {
    signout()
  }, [signout])

  return <span>Signing you out...</span>
}