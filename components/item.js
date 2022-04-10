
import Image from "next/image"
import { useRouter } from "next/router"
import styles from "../styles/profile.module.css"

function getImgUrl(item) {
  return item.replace(/[.,\/#!$%\^&\*;:{}=\-_`~() ]/g,"")
}

const imgLoader = ({ src, width, quality }) => {
  return `/${src}?w=${width}&q=${quality || 75}`
}

const editItemHandler = (ev) => {
  document.getElementById("darkenedBack").style.display = "flex"
  document.getElementById("editDialog").style.display = "flex"
  document.getElementById("editName").value = ev.currentTarget.getAttributeNode("item").value
  document.getElementById("editUrl").parentElement.style.display = "flex"
  document.getElementById("editTitle").innerText = "Edit Item"
}

let dragging = 0

const dragStartHandler = (ev) => {
  dragging = parseInt(ev.currentTarget.id)
}

const dragOverHandler = (ev) => {
  // elements by default cannot be dropped into others
  ev.preventDefault()
  /*
  const idx = parseInt(ev.currentTarget.id)
  console.log(idx)
  document.getElementById(idx-1).getElementsByTagName("div")[0].classList.add("right")
  document.getElementById(idx).getElementsByTagName("div")[0].classList.add("left")
  */
}

const dropHandler = (ev) => {
  ev.preventDefault()
  const cat = "" //router.query.category
  const user = "" //router.query.profile
  const dropIdx = parseInt(ev.currentTarget.id)
  
  const dragEl = document.getElementById(dragging)
  const dropEl = document.getElementById(dropIdx)
  dropEl.before(dragEl)

  // If moving item into fav5, kick out the 5th item
  if (dragging > 5 && dropIdx <= 5) {
    document.getElementById("itemsBody").prepend(document.getElementById("5"))
  }
  reassignIds(user, cat, dropIdx)
}

// Send API request to rewrite users data then updates idAttrs
async function reassignIds(user, cat, dropIdx) {
  const res = await fetch("/api/reassign", {
    method: 'POST',
    body: JSON.stringify({
      dragging: dragging,
      dropped: dropIdx
    }),
    headers: { "Content-Type": "application/json" }
  })
  const r = await res.json()

  const imgs = document.getElementsByTagName("img")
  for (let i = 0; i < imgs.length; ++i) {
    const div = imgs[i].parentNode.parentNode
    div.id = i + 1
    if (i < 5) {
      div.className = styles.favItem
    } else {
      div.className = styles.item
    }
  }
}

export default function Item(props) {
  return (
    <div id={props.idx} className={props.idx <= 5 ? styles.favItem : styles.item} onClick={editItemHandler} draggable={true} onDragStart={dragStartHandler} onDragOver={dragOverHandler} onDrop={dropHandler} item={props.item}>
      <div id={styles.hoveredItem}></div>
      <Image
        //loader={imgLoader}
        //src={props.url ? props.url : " "}
        src={props.url ? `/api/imageproxy?url=${encodeURIComponent(props.url)}` : "/notfound"}
        alt={props.item}
        layout={"fill"}
      />
    </div>
  )
}