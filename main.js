/* eslint-disable */
export default function main () {
/* eslint-enable */

  const url = 'https://api.twitch.tv/helix/users?login=Zarenimizxax'

  const myRequest = new Request(url, {
    method: 'GET',
    headers: process.env.AUTHORIZATION,
    mode: 'cors',
    cache: 'default'
  })

  fetch(myRequest)
    .then(response => response.json())

  // Extracting the user ID from their name
  const userJson = myRequest.response.text

  const userId = userJson.data.id
  console.log('test')

  console.log(userJson)

  // Pulling a video from that user's page
  const videoRequest = 'https://api.twitch.tv/helix/clips?broadcaster_id=' + userId

  const randomNumber = Math.floor(Math.random() * 21) // Generating a random number from 1-20

  console.log(randomNumber)

  const chooseVideo = videoRequest.data.randomNumber.url // Then we choose a video index from that list using the random number we created, and pull the URL

  console.log(chooseVideo)

  const VideoThumbnail = chooseVideo.data.randomNumber.thumbnail_url // We get the thumbnail url in order to get the unique Id for the video

  // If statement to determine what URL format needs to be used for the clip

  if ('offset' in VideoThumbnail) {
    const SplitThumbnail = VideoThumbnail.split('twitch.tv/') // First round of splitting the url to isolate the Id

    const VideoID = SplitThumbnail[1].split('-preview') // Taking the second indexed item and split it again

    const FinalVideoId = VideoID[0] // After the second split assign the video Id to a variable
    console.log(FinalVideoId)

    // Assign the endpoint url to a variable and insert the video Id to create the link
    const EndPointURL = 'https://clips-media-assets2.twitch.tv/' + FinalVideoId + '.mp4'

    return (EndPointURL)
  } else {
    const SplitThumbnail = VideoThumbnail.split('C') // First round of splitting the url to isolate the Id

    const VideoID = SplitThumbnail[1].split('-') // Taking the second indexed item and split it again

    const FinalVideoId = VideoID[0] // After the second split assign the video Id to a variable

    const EndPointURL = '"https://clips-media-assets2.twitch.tv/AT-cm%7C' + FinalVideoId + '.mp4' // Assign the endpoint url to a variable and insert the video Id to create the link

    return (EndPointURL)
  }
}
