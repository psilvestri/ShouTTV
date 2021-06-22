url = "https://api.twitch.tv/helix/users?login=Zarenimizxax"

process.env.AUTHORIZATION
process.env.OAUTHAUTHORIZATION
process.env.CLIENTID

function getVideoUrl() {
  // Extracting the user ID from their name
  response = requests.get(url, headers=headers, data=payload)
  userJson = json.loads(response.text)
  userId = userJson['data'][0]['id']

  console.log(userId)

  // More security stucff
  headers = {
    'Authorization': Authorization,
    'client-id': clientid
  }

  // Pulling a video from that user's page
  videoRequest = requests.get('https://api.twitch.tv/helix/clips?broadcaster_id=' + userId, headers=headers)
  pageURL = json.loads(videoRequest.text)
  //print(pageURL)

  // Generating a random number from 1-20 (default number of videos pulled is 20, that's plenty)
  randomNumber = random.randint(0, 19)
  console.log(randomNumber)

  // Then we choose a video index from that list using the random number we created, and pull the URL
  chooseVideo = pageURL['data'][randomNumber]['url']
  console.log(chooseVideo)

  // We get the thumbnail url in order to get the unique Id for the video
  VideoThumbnail = pageURL['data'][randomNumber]['thumbnail_url']
  console.log(VideoThumbnail)

  // If statement to determine what URL format needs to be used for the clip

  if ("offset" in VideoThumbnail) {
    // First round of splitting the url to isolate the Id
    SplitThumbnail = VideoThumbnail.split('twitch.tv/')
    console.log(SplitThumbnail)

    // Taking the second indexed item and split it again
    VideoID = SplitThumbnail[1].split("-preview")
    console.log(VideoID)

    // After the second split assign the video Id to a variable
    FinalVideoId = VideoID[0]
    console.log(FinalVideoId)

    // Assign the endpoint url to a variable and insert the video Id to create the link
    EndPointURL = "https://clips-media-assets2.twitch.tv/"+FinalVideoId+".mp4"

    return(EndPointURL)
  }

  else {
      // First round of splitting the url to isolate the Id
    SplitThumbnail = VideoThumbnail.split('C')
    console.log(SplitThumbnail)

    // Taking the second indexed item and split it again
    VideoID = SplitThumbnail[1].split("-")
    console.log(VideoID)

    // After the second split assign the video Id to a variable
    FinalVideoId = VideoID[0]
    console.log(FinalVideoId)

    // Assign the endpoint url to a variable and insert the video Id to create the link
    EndPointURL = "https://clips-media-assets2.twitch.tv/AT-cm%7C"+FinalVideoId+".mp4"

    return EndPointURL
  }
}