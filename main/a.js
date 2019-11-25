
// getting submit event from the form
document.getElementById("form").addEventListener("submit",cName)

// client youtube api key
const apikey = 'AIzaSyAobwseFwaq2SFjsdXae8TLH4Sx5nP2N7M'

function cName( event ){
    event.preventDefault()
    let video = document.getElementById("c-name").value
    youtubeURL ( String(video) )
}

function youtubeURL( url ){
    let tempURL = url 
    let urlSplit = tempURL.split("/")
    let videoID = urlSplit[ urlSplit.length - 1]
    getVideoInfo( videoID )    
}

function getVideoInfo( videoID ) {
    fetch(`https://www.googleapis.com/youtube/v3/videos?id=${ videoID }&key=${apikey}&part=snippet`)
    .then( res => res.json())
    .then( data => videoINFO( data ))
    .catch( err => error( err ) )
}

function error( err ){
    let val = document.getElementById("c-name")
    let e = document.getElementById("error")

    if ( val === " "){
        e.innerHTML = `<div class="mx-5 alert alert-danger alert-dismissible fade show p-1 text-center" role="alert">
                        <h4>fill the input form</h4>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`
    }
    if ( err ){
        e.innerHTML = `<div class="alert alert-warning alert-dismissible fade show p-1 mx-5 text-center" role="alert">
                        <h3>some thing went wrong, chack the url</h3>
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>`
    }
}

function videoINFO( data ){
    let videoTitle = data.items[0].snippet.title
    let videopublishedDate =  data.items[0].snippet.publishedAt
    let videoChannel = data.items[0].snippet.channelTitle
    let videoThubnail = data.items[0].snippet.thumbnails.medium.url
    let videoTags = data.items[0].snippet.tags
    let videoLang = data.items[0].snippet.defaultLanguage
    let videoID = data.items[0].id
    renderINFO( videoTitle,videopublishedDate,videoChannel,
                videoThubnail,videoTags,videoLang,videoID )
} 

function renderINFO( title,date,channel,thumbnail,tags,lang,id ){
    let items = document.getElementById("items")
    items.innerHTML = `<tr>
                        <td>Title</td>
                        <td>${ title }</td>
                    </tr>
                    <tr>
                        <td>Uploaded Date</td>
                        <td>${ date }</td>
                    </tr>     
                    <tr>
                        <td>Channel</td>
                        <td>${ channel }</td>
                    </tr>  
                    <tr>
                        <td>Thumbnail</td>
                        <td><img src="${ thumbnail }" alt="thumbnail"></td>
                    </tr>  
                    <tr>
                        <td>Tage's</td>
                        <td>${ tags }</td>
                    </tr>  
                    <tr>
                        <td>Language</td>
                        <td>${ lang }</td>
                    </tr>  
                    <tr>
                        <td>Id</td>
                        <td>${ id }</td>
                    </tr>` 
    emptyINPUT() 
} 

function emptyINPUT(){
    document.getElementById("c-name").value = '' 
}

