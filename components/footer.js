import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"

export default function Footer() {
  const router = useRouter()
  const query = router.query

  return (
    <footer></footer>
  )
}