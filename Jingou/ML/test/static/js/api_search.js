url = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.0/Music_ML_tracks/";
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
        var songappend=songinfo.append("div")

        var showartists = data.Item.artists.L
        if (inputvalue2===""){
            var artistlist = songinfo.append("div")
            artistlist.text("It seems like below artist(s) have this song, select one you want to see?").style("font-size","20px")
            for (var s=0; s<showartists.length; s++){
                var artistlist = songinfo.append("div")
                artistlist.text(showartists[s].S)
            };
        } else {

            songappend.text(`Search name: ${data.Item.name.S}`);
            
            var detail1 = songinfo.append("div")
            detail1.text(`Artist: ${showartists[0].S}`)
            var detail2 = songinfo.append("div")
            detail2.text(`This song is in Cluster ${data.Item.Assignments.L[0].N}`)
            cluster_key = data.Item.Assignments.L[0].N
            show(data.Item.Assignments.L[0].N)

            inputcluster(cluster_key)
            // for (var i =0 ; i<showartists.length; i++){
            //     if (showartists[i].S == inputvalue2){
            //         var detail1 = songinfo.append("div")
            //         detail1.text(`Artist: ${showartists[i].S}`)
            //         artists_key = i
            //         var detail2 = songinfo.append("div")
            //         detail2.text(`This song is in Cluster ${data.Item.Assignments.L[i].N}`)
            //     } else {   
            //     };   
            // }
            
        } 
    })
    
};

function inputcluster(cluster_key){
    d3.json(clusterurl+cluster_key).then(function(cluster){
        console.log(cluster)
        var clusterinfo = d3.select(".clusterinfo")
        clusterinfo.html("")
        // var clusterappend=clusterinfo.append("ul")
        cluster.forEach((c) => {
            clusterinfo.append("h5").text(c.name)
        })
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





