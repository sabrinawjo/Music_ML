url = "https://1whrq8dnsi.execute-api.us-west-1.amazonaws.com/dev/api/v2.0/Music_ML_tracks/"
path = "../../Resources/MLResources/full_Imploded.json"

var form = d3.select("form")
var bottom = d3.select("#filter-btn")
form.on("submit", runEnter)
bottom.on("click", runEnter)

function runEnter(){
    d3.event.preventDefault();
    var inputelement = d3.select("#songinput")
    var song=inputelement.property("value")
    console.log(song)

    var inputvalue = "Karel Gott"

    d3.json(url+song).then(function(data){
        console.log(data.Item.name)
        var songinfo=d3.select(".songinfo")
        songinfo.html("")
        var songappend=songinfo.append("div")
        songappend.text(data.Item.name.S)
        var filterdata = data.Item.artists.L
        for (var i =0 ; i<filterdata.length; i++){
            if (filterdata[i].S == inputvalue){
                console.log(filterdata[i].S)
                artists_key = i
                console.log(data.Item.Assignments.L[i].N)
                console.log(data.Item.genres.L[i].L)
            } else {
                
            }

        }
    })
    
    

}



