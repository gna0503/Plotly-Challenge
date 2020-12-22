// Submit optionChange function, read the data from json file and 
//assign the selected parameter to the buildPlot fuction

function optionChange() {

  d3.json("samples.json").then((importedData) => {
    // Drop down list data prepare
    var subjectId = importedData.names;
    console.log(importedData);
    // Fill the drop down option list
    d3.select("#selDataset")
    .selectAll("option")
    .data(subjectId)
    .enter()
    .append("option")
    .text((d)=>d);

  // // Prevent the page from refreshing
  // d3.event.preventDefault();  -------------???
  // Select the input value from the dropdown list
  var sample = d3.select("#selDataset").node().value;
  console.log(sample);
  // d3.select("#selDataset").node().value = "";  ---------???
  buildPlots(sample);

  });

}

// Add event listener for change the dropdrown list then call a fuction
d3.select("#selDataset").on("change", optionChange);
optionChange()

// Build the plots with the new selected sample data
function buildPlots(sample) {
  d3.json("samples.json").then((importedData) => {

    //-------------------------Demographic Info panel build up -------------------------
    // Prepare the data for Demographic Info panel
    var metadata = importedData.metadata;
    var demographic_data = metadata.filter(x=>x.id==sample)[0];
    console.log(demographic_data);
    var demographic_panel = d3.select("#sample-metadata");

    // Clear any existing panel data
    demographic_panel.html("");

    // Fill the Demographic Info panel
    Object.entries(demographic_data).forEach(([key,value])=>{
      demographic_panel.append("h6").text(`${key}: ${value}`);
    });

    //-----------------------Bubble chart build up -------------------------------------
    var data = importedData.samples;
    var sample_data = data.filter(x=>x.id==sample);
    var sample_values = sample_data[0].sample_values;
    var otu_ids = sample_data[0].otu_ids;
    var otu_labels = sample_data[0].otu_labels;

    console.log(otu_labels);
    
      var data = [
        {
          x: otu_ids,
          y: sample_values,
          mode: 'markers',
          marker: {size:sample_values,color: otu_ids},
          text: otu_labels,
          type: 'scatter'
        }
      ];
      var layout = {
      xaxis:{zeroline:false, hoverformat: '.2f', title: `OTU ${sample}`},
    };
      Plotly.newPlot('bubble', data, layout);
  
    //-----------------------Bar chart build up -------------------------------------
      var otu_ids_new = otu_ids.slice(0,10).reverse();
      var data = [{
        type: 'bar',
        x: sample_values.slice(0,10).reverse(),
        y: otu_ids_new.map(x=> 'OTU ' + x),
        text: otu_labels.slice(0,10).reverse(),
        orientation: 'h'
      }];
    
      var layout = {
        height: 600,
        width: 800
      };
    
      Plotly.newPlot("bar", data, layout);

  });

}


