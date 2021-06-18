url = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.1/Music_ML_tracks/";
clusterurl = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.1/Random_Song_Assignments/"
// path = "../../Resources/MLResources/full_Imploded.json"

// var form = d3.select("form")
var button = d3.select("#filter-btn");
// form.on("submit", runEnter)
button.on("click", runEnter);

// function runEnter(){
//     d3.event.preventDefault();
//     var inputelement = d3.select("#songinput")
//     var song=inputelement.property("value")
//     console.log(song)

//     var inputvalue = "Karel Gott"

//     d3.json(url+song).then(function(data){
//         console.log(data.Item.name)
//         var songinfo=d3.select(".songinfo")
//         songinfo.html("")
//         var songappend=songinfo.append("div")
//         songappend.text(data.Item.name.S)
//         var filterdata = data.Item.artists.L
//         for (var i =0 ; i<filterdata.length; i++){
//             if (filterdata[i].S == inputvalue){
//                 console.log(filterdata[i].S)
//                 artists_key = i
//                 console.log(data.Item.Assignments.L[i].N)
//                 console.log(data.Item.genres.L[i].L)
//             } else {
                
//             }

//         }
//     })
// }

function input(inputvalue, inputvalue2){
    d3.json(url+inputvalue).then(function(data){
        // console.log(data.Item.name)
        var songinfo=d3.select(".songinfo")
        // var songinfo=d3.select("#songinput")
        songinfo.html("")
        var clusterinfo = d3.select(".clusterinfo")
        clusterinfo.html("")
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
            
        for (var i =0 ; i<showartists.length; i++){
            if (showartists[i].S == inputvalue2){
                    var detail1 = songinfo.append("div")
                    detail1.text(`Artist: ${showartists[i].S}`).style("font-size","20px").style("font-weight","bold")
                    var detail2 = songinfo.append("div")
                    detail2.text(`This song is in Cluster ${data.Item.Assignments.L[i].N}`).style("font-size","20px").style("font-weight","bold")
                    
                    var songinfoSpotify = d3.select("#search-spotify")
                    // var iframe = d3.createElement('iframe');
                    // iframe.src = "https://open.spotify.com/embed/track/"+ data.Item.id.L[i].S;
                    // iframe.width= "300";
                    // iframe.height="80";
                    // iframe.frameborder= "0";
                    // iframe.allowtransparency="true";
                    // iframe.allow="encrypted-media";
                    // songinfoSpotify.append(iframe);
                    // console.log(iframe)

                    var sample = songinfoSpotify.append('text')
                    sample.text('<iframe src="https://open.spotify.com/embed/track/7GFxray2pxG2i4UM7kn0Xx" width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>')
                    cluster_key = data.Item.Assignments.L[i].N
                    show(data.Item.Assignments.L[i].N)
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
        console.log(cluster)
        var clusterinfo = d3.select(".clusterinfo")
        clusterinfo.html("")
        clusterinfo.text("There are 10 songs that we recommend in the same cluster: ").style("font-size","20px").style("font-weight","bold")
        // var clusterappend=clusterinfo.append("ul")
        cluster.forEach((c) => {
            clusterinfo.append("h6").text(c.name)
            var recommend = c.artists
            recommend = recommend.replace(/[\[\]']+/g,'')
            // console.log(recommend)
            var space = "\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0"
            clusterinfo.append("h6").text(`${space}----By: ${recommend}`)
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


