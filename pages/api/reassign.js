
const fs = require("fs")
const profile = require("/data/favorlists.json")

export default async function handler(req, res) {
  const dragging = req.body.dragging
  const dropped = req.body.dropped

  const referer = req["headers"]["referer"].split("/")
  const user = referer[referer.length - 2]
  const cat = referer[referer.length - 1]

  const fromVal = profile[user][cat][dragging - 1]
  // Delete from array
  profile[user][cat].splice(dragging - 1, 1)

  if (dragging < dropped) {
    profile[user][cat].splice(dropped - 2, 0, fromVal)
  } else {
    profile[user][cat].splice(dropped - 1, 0, fromVal)
  }

  fs.writeFile("data/favorlists.json", JSON.stringify(profile, null, 4), (err) => {
    return res.status(200).json({
      success: err ? 0 : 1
    })
  })
}