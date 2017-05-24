/**
 * Created by Kylart on 11/04/2017.
 */

const {getNewsNoDetails} = require('mal-scraper')

exports.getNews = (res) => {
  let news = getNewsNoDetails(() => {
    console.log('[Mal-Scraper] (News): Finished gathering the news.')

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.write(JSON.stringify(news))
    res.end()
  })
}