
function init(){
    var selector = d3.select("#selDataset");
    d3.json("samples.json").then((data)=>{

        var selected_data = data.samples;
        //data.samples;
        var new_1 = selected_data.filter(d=>d.id==="940");

        //Created two arrays which sample values and otu_ids
        var arr1 = new_1[0].sample_values;
        var arr2 = new_1[0].otu_ids;



        //Converted them in to JSON object
        var obj = {};
        for (var i = 0; i < arr1.length; i++) {
        obj[arr2[i]] = arr1[i];
        }

        //Creating empty array
        var sortable = [];
        for (var i in obj) {
            //Pushing it in the empty array
            sortable.push([i, obj[i]]);
        }
        
        //Sorting the array Ascending!
        sortable.sort(function(a, b) {
            return a[1] - b[1];
        });
        console.log(sortable);


   });
}

init()
