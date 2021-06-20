var url = "https://nxvasw6as4.execute-api.us-west-1.amazonaws.com/dev/api/v2.1/Music_ML_tracks/0QbZI8ohTHrz3DnQht89BC"




var sample = d3.select(".sample")
sample.text("Hey there")

var button = d3.select("#filter_btn")
button.on("click", runEnter);

function runEnter(){
    d3.event.preventDefault();
    iframe(track_id)

};


var track_id = "2moifOsda5B1NR0A72HTuK"

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
    }).appendTo(".sample_iframe");
}

var button = d3.select("#filter-btn");
// form.on("submit", runEnter)
button.on("click", runEnter);

function input(inputValue1, inputValue2){
    if (inputValue1, inputValue2 === "") {
        iframe(track)
    } else {
        iframe(track)
    }
}