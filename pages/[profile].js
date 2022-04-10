import { getSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import Layout from "../components/layout"
import { getUserData } from "../lib/tempDB"
import { useRouter } from "next/router"
import styles from "../styles/profile.module.css"

function getImgUrl(item) {
  return item.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g,"")
}

const imgLoader = ({ src, width, quality }) => {
  return `/${src}?w=${width}&q=${quality || 75}`
}

export default function Profile(props) {
  const router = useRouter()
  const user = router.query.profile
  const data = props.data
  // If user logged in matches current user, editable
  if (!data || data.length == 0) {
    return (
      <Layout>none</Layout>
    )
  }

  // Sort by largest cats
  let orderedCats = Object.keys(props.data).map(function(key) {
    return [key, props.data[key].length, props.data[key]]
  })
  orderedCats.sort(function(a, b) {
    return b[1] - a[1]
  })

  return (
    <Layout>
      <div className={styles.profileBody}>
        {orderedCats.map(catData => (
          <Link href={`/${user}/${catData[0]}`}>
            <div className={styles.catBox}>
              <div className={styles.catBoxHeader}>{catData[0]} ({catData[1]})</div>
              <div className={styles.catBoxBody}>
                {catData[2].map(pic => (
                  <Image
                    loader={imgLoader}
                    src={`${catData[0]}/${getImgUrl(pic)}.jpg`}
                    alt={pic}
                    width={120}
                    height={60}
                  />
                ))}
              </div>
              <div className={styles.shadow}>Expand</div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const data = getUserData(context.query.profile)
  return {
    props: { data }
  }
}