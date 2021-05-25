var viz;
var sheet


var vizDiv 
var vizURL 
var options 



function initViz() {

 vizDiv = document.getElementById('myViz');
 vizURL = 'https://public.tableau.com/views/combined_cluster/combined'
 options = {
    height: '850px',
    width: '1024px',
    hideToolbar: true,
    hideTabs: true
};

viz = new tableau.Viz(vizDiv, vizURL, options);
console.log("initViz works")
}
initViz();


function show(value){
    sheet = viz.getWorkbook().getActiveSheet()
    console.log("show() activates")
    if (value === "") {
        viz.revertAllAsync();
     } else {
        console.log("else works (beforeapplyFilter")
        sheet.applyFilterAsync("Assignments", value, tableau.FilterUpdateType.REPLACE);
        console.log("else works (after applyFilter")
    }
} 
console.log("Outside of functions work")