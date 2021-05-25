var viz;
var sheet


var vizDiv 
var vizURL 
var options 



window.onload = function() {

 vizDiv = document.getElementById('myViz');
 vizURL = 'https://public.tableau.com/views/combined_cluster/combined?:language=en&:display_count=y&:origin=viz_share_link'
 options = {
    height: '850px',
    width: '1024px',
    hideToolbar: true,
    hideTabs: true
};

viz = new tableau.Viz(vizDiv, vizURL, options);

}



function show(value){
    sheet = viz.getWorkbook().getActiveSheet()

    if (value === "") {
        viz.revertAllAsync();
     } else {
        sheet.applyFilterAsync("Assignments", value, tableau.FilterUpdateType.REPLACE);
    }
} 