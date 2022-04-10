import Header from "../components/header"
import { useRouter } from "next/router"
import { saveURL } from "../lib/tempDB"

const name = 'Zack Hecht'
export const siteTitle = 'Favorlists'

const closeDialog = (ev) => {
  document.getElementById("editDialog").style.display = "none"
  document.getElementById("darkenedBack").style.display = "none"
}

const saveDialog = (ev) => {
  const name = document.getElementById("editName").value
  const url = document.getElementById("editUrl").value

  const router = useRouter()
  const user = router.query.profile
  const cat = router.query.category

  //saveURL(cat, name, url)
}

export default function Layout({ children }) {
  return (
    <>
      <Header/>
      <main>
        {children}
      </main>
      <div id={`darkenedBack`}></div>
      <div id={`editDialog`}>
        <div id={`editTitle`}>Edit Item</div>
        <div>
          <label>Name</label>
          <input id={`editName`} />
        </div>
        <div>
          <label>URL</label>
          <input id={`editUrl`} />
        </div>
        <div>
          <button onClick={saveDialog}>Save</button>
          <button onClick={closeDialog}>Close</button>
        </div>
      </div>
      <style jsx global>{`
        #__next {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </>
  )
}
