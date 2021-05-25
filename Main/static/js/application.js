var viz;
var sheet


var vizDiv 
var vizURL 
var options 



function initViz() {

 vizDiv = document.getElementById('myViz');
 vizURL = 'https://public.tableau.com/views/Genre_Bubble/Dashboard1'
 options = {
    height: '800px',
    width: '1024px',
    hideToolbar: true,
    hideTabs: true
};

viz = new tableau.Viz(vizDiv, vizURL, options);

}
initViz();


function show(value){
    sheet = viz.getWorkbook().getActiveSheet()

        sheet.applyFilterAsync("Assignments", value, tableau.FilterUpdateType.REPLACE);

} 