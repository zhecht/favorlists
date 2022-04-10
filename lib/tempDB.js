const DATA = require("/data/favorlists.json")
const URLs = require("/data/urls.json")
//const fs = require("fs")

export function getUserData(username, cat = "") {
  if (!(username in DATA)) {
    return []
  } else if (cat in DATA[username]) {
    return DATA[username][cat]  
  } else {
    return DATA[username]
  }
}

export function getURLs() {
  return URLs
}

export function saveURL(cat, name, url) {
  const urls = getURLs()
  if (!(cat in urls)) {
    urls[cat] = {}
  }
  urls[cat][name] = url

  /*
  fs.writeFile("/data/urls.json", JSON.stringify(urls, null, 4), (err) => {
    return res.status(200).json({
      success: err ? 0 : 1
    })
  })
  */
}