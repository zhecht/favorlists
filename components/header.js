import { getSession, signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Link from "next/link"

export default function Header() {
  const router = useRouter()
  const query = router.query

  const { data: session, status } = useSession()
  
  let user = query.profile

  return (
    <header>
      {!session && (
        <>
          <Link href={`/${user}`}>
            <h1>{user}</h1>
          </Link>
          {!session && (
            <a onClick={(e) => { e.preventDefault(); signIn() }}>
              Sign In
            </a>
          )}
          {session && (
            <a onClick={(e) => { e.preventDefault(); signOut() }}>
              Sign Out
            </a>
          )}
        </>
      )}
      <style jsx>{`
        header {
          width: 100%;
          background-color: black;
          color: white;
          position: relative;
          text-align: center;
          padding: 0.5rem 0;
        }
        header a {
          position: absolute;
          right: 2rem;
          top: 1.25rem;
        }
        h1 {
          margin:0;
        }
        h1:hover {
          cursor: pointer;
        }
      `}</style>
    </header>
  )
}

export async function getServerSideProps(context) {
  return { props: { session: await getSession(context) }}
}