function buildCharts(id){
    d3.json("samples.json").then((data)=>{
    // data.filter()  
    // console.log(data)
    sampleArray = data.samples.filter(obj=>obj.id==id)
        // var samples= data.samples;
        // var resultsarray= samples.filter(sampleobject => sampleobject.id == sample);
        // var result= resultsarray[0]

        // var ids = result.otu_ids;
        // var labels = result.otu_labels;
        // var values = result.sample_values;
        
        // Step 1: BarChart: Create the Trace
    var trace1 = {
        x: sampleArray[0].otu_ids.slice(0,10),
        y: sampleArray[0].sample_values.slice(0,10),
        type: "bar",
        orientation: 'h',
        text: sampleArray[0].otu_labels.slice(0,10)
    };
    // Create the data array for the plot
    var data1 = [trace1];
    // Define the plot layout
    var layout = {
        title: "Otu ID's vs Sample Values" ,
        xaxis: { title: "Otu ID's" },
        yaxis: { title: "Sample Values" }
    };
    // Plot the chart to a div tag with id "bar-plot"
    Plotly.newPlot("bar", data1, layout);
    var trace2= {
        x: sampleArray[0].otu_ids,
        y: sampleArray[0].sample_values,
        text: sampleArray[0].otu_labels,
        mode: 'markers',
        marker: {
          color: sampleArray[0].otu_ids,
          size: sampleArray[0].sample_values
        }
      };
      var data2 = [trace2];
      var layout = {
        title: 'Display of Each Sample',
      };
      Plotly.newPlot('bubble', data2, layout);
      metadataArray = data.metadata.filter(obj=>obj.id==id);
      console.log(metadataArray)
    })
}
d3.json("samples.json").then((data)=>{
    var dropDown = d3.select("#selDataset")
    data.names.forEach((ids)=>{
        dropDown.append("option").text(ids).property('value', ids)
    })
    buildCharts(data.names[0])
})
function optionChanged(newSample){
    buildCharts(newSample);
    buildMetadata(newSample);
}

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata= data.metadata;
      var resultsarray= metadata.filter(sampleobject => sampleobject.id == sample);
      var result= resultsarray[0]
      var demoInfo = d3.select("#sample-metadata");
      demoInfo.html("");
      Object.entries(result).forEach(([key, value]) => {
        demoInfo.append("h6").text(`${key}: ${value}`);
      });
    });
  }