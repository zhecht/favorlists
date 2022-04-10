import Image from "next/image"
import Item from "../../components/item"
import Layout from "../../components/layout"
import Link from "next/link"
import { useRouter } from "next/router"
import { getURLs, getUserData } from "../../lib/tempDB"
import styles from "../../styles/profile.module.css"

function parseDataArr(items, startIdx = 0) {
  const arr = []
  for (let i of items) {
    arr.push({idx: startIdx++, item: i})
  }
  return arr
}

function showDialog(dialogType) {
  document.getElementById("darkenedBack").style.display = "flex"
  document.getElementById("editDialog").style.display = "flex"

  if (dialogType == "addCat") {
    document.getElementById("editUrl").parentElement.style.display = "none"
  } else {
    document.getElementById("editUrl").parentElement.style.display = "flex"
  }

  let title = "Edit Cat"
  if (dialogType == "addItem") {
    title = "Add Item"
  } else if (dialogType == "addCat") {
    title = "Add Category"
  }
  document.getElementById("editTitle").innerText = title
}

const addItemHandler = (ev) => {
  showDialog("addItem")
}

const addCatHandler = (ev) => {
  showDialog("addCat")
}

export default function Category(props) {
  const router = useRouter()
  const user = router.query.profile
  const cat = router.query.category

  if (!props.data) {
    return (
      <Layout>none</Layout>
    )
  }

  function getUrl(item) {
    const stripped = item.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g,"").toLowerCase()
    let url = ""
    if (cat in props.urls && stripped in props.urls[cat]) {
      url = props.urls[cat][stripped]
    }
    return url
  }

  const arr = props.data[cat]
  const favs = arr ? parseDataArr(arr.slice(0, 5), 1) : []
  const items = arr ? parseDataArr(arr.slice(5, arr.length), 6) : []

  // Sort by largest cats
  let orderedCats = Object.keys(props.data).map(function(key) {
    return [key, props.data[key].length]
  })
  orderedCats.sort(function(a, b) {
    return b[1] - a[1]
  })

  return (
    <Layout>
      <div id={styles.catHeader}>
        {orderedCats.map(catData => (
          <div className={styles.catHeader} id={catData[0] == cat ? styles.currCatHeader : ""}>
            <Link href={`/${user}/${catData[0]}`}>
              <a>
                <span className={styles.badge}>{catData[1]}</span>
                {catData[0]}
              </a>
            </Link>
          </div>
        ))}
      </div>
      <div id={styles.content}>
        <div id={styles.favorlist}>
          <p>Fav 5</p>
          <div id={styles.fav5Container}>
            {favs.map(item => (
              <Item url={getUrl(item.item)} cat={cat} idx={item.idx} item={item.item}/>
            ))}
          </div>
          <div id={styles.addContainer}>
            <button onClick={addCatHandler}>Add Cat</button>
            <button onClick={addItemHandler}>Add Item</button>
          </div>
        </div>
        <div id={`itemsBody`} className={styles.itemsBody}>
          {items.map(item => (
            <Item url={getUrl(item.item)} cat={cat} idx={item.idx} item={item.item}/>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const data = getUserData(context.query.profile)
  const urls = getURLs()
  return {
    props: {
      data,
      urls
    },
  }
}