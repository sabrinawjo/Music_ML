url = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.1/Music_ML_tracks/";
clusterurl = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.1/Random_Song_Assignments/"
// path = "../../Resources/MLResources/full_Imploded.json"

// var form = d3.select("form")
var button = d3.select("#filter-btn");
// form.on("submit", runEnter)
button.on("click", runEnter);

function iframe(track){

    $('<iframe />');  // Create an iframe element
    $('<iframe />', {
        name: 'frame1',
        id: 'frame1',
        src: `https://open.spotify.com/embed/track/${track}`,
        width: "300",
        height: "80",
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media"
    }).appendTo("#search-spotify");
}

function iframe2(track){

    $('<iframe />');  // Create an iframe element
    $('<iframe />', {
        name: 'frame1',
        id: 'frame1',
        src: `https://open.spotify.com/embed/track/${track}`,
        width: "300",
        height: "80",
        frameborder: "0",
        allowtransparency: "true",
        allow: "encrypted-media"
    }).appendTo(".spotifysample");
}

function input(inputvalue, inputvalue2){
    d3.json(url+inputvalue).then(function(data){
        // console.log(data.Item.name)
        var songinfo=d3.select(".songinfo")
        // var songinfo=d3.select("#songinput")
        songinfo.html("")
        var spotifysearch = d3.select("#search-spotify")
        spotifysearch.html("")

        var clusterinfo = d3.select(".clusterinfo")
        clusterinfo.html("")

        var spotifysample=d3.select(".spotifysample")
        spotifysample.html("")

        var songappend=songinfo.append("div")

        var showartists = data.Item.artists.L
        if (inputvalue2===""){
            var artistlist = songinfo.append("div")
            artistlist.text("It seems like below artist(s) have this song, select one you want to see?").style("font-size","20px").style("font-weight","bold")
            for (var s=0; s<showartists.length; s++){
                var artistlist = songinfo.append("div")
                artistlist.text(showartists[s].S)
            };
        } else {

        songappend.text(`Search name: ${data.Item.name.S}`).style("font-size","20px").style("font-weight","bold");
        var track = data.Item.id.L[0].S
        iframe(track)

        // console.log(data.Item.id.L[0].S)

        for (var i =0 ; i<showartists.length; i++){
            if (showartists[i].S == inputvalue2){
                    var detail1 = songinfo.append("div")
                    detail1.text(`Artist: ${showartists[i].S}`).style("font-size","20px").style("font-weight","bold")
                    var detail2 = songinfo.append("div")
                    detail2.text(`This song is in Cluster ${data.Item.Assignments.L[i].N}`).style("font-size","20px").style("font-weight","bold")
                    // var track = data.Item.id.L[i].S
                    // var sample = songinfoSpotify.append('text')
                    // sample.text('<iframe src="https://open.spotify.com/embed/track/7GFxray2pxG2i4UM7kn0Xx" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>')
                    cluster_key = data.Item.Assignments.L[i].N
                    show(data.Item.Assignments.L[i].N)
                    // console.log(data)
                    
                    // iframe(track)
                    break
            } else {   
            };   
        };

        
        
        inputcluster(cluster_key)
            
        } 
    })
    
};

function inputcluster(cluster_key){
    d3.json(clusterurl+cluster_key).then(function(cluster){
        // console.log(cluster)
        var clusterinfo = d3.select(".clusterinfo")
        clusterinfo.html("")
        clusterinfo.text("There are 10 songs that we recommend in the same cluster: ").style("font-size","20px").style("font-weight","bold")

        var spotifysample=d3.select(".spotifysample")
        spotifysample.html("")
        // var space = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
        // spotifysample.text(`SONG SAMPLES`)



        // var clusterappend=clusterinfo.append("ul")
        cluster.forEach((c) => {
            clusterinfo.append("h6").text(c.name)
            var recommend = c.artists
            recommend = recommend.replace(/[\[\]']+/g,'')
            // console.log(recommend)
            var space = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
            clusterinfo.append("h6").text(`${space}----By: ${recommend}`)
            // document.write('<br />');
            // console.log(c.id)
            // spotifysample.append("h6").text(<br></br>)
            clusterinfo.append("h6").text(`${space}`)
            var track = c.id
            iframe2(track)
        })
        // var clusterinfo = d3.select("tbody")
        // clusterinfo.html("")
        // clusterinfo.text("There are 10 songs that we recommend in the same cluster: ").style("font-size","20px")
    })
}

function runEnter(){
    d3.event.preventDefault();
    var inputelement = d3.select("#songinput")
    var inputelement2 = d3.select("#artistinput")
    var inputvalue=inputelement.property("value")
    var inputvalue2=inputelement2.property("value")
    input(inputvalue, inputvalue2)

};


