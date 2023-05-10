
// Draw the graph network
function drawGraph(centrality, graph, alpha) {
  getCentrality(centrality, {
      'graph': graph,
      'alpha': alpha
  })
  .done(function (data) {
  
    nodes = data['nodes'].map((e) => {
      return {
        id: e.id,
        radius: 1,
        value: e.value
      }
    });
  
    links = data['links'].map((e) => {
      return {
        source: e.source,
        target: e.target,
        value: 1
      }
    })
  
    chart = ForceGraph({
      nodes: nodes,
      links: links
    }, {
      nodeId: (d) => d.id,
      // nodeGroup: (d) => d.group,
      nodeFill: (d) => `rgb(0, 193, 140, ${d.value})`,
      linkStrokeWidth: (l) => Math.sqrt(l.value),
      width: $('div#graphContainer').width(),
      height: $('div#graphContainer').height(),
      // invalidation, // a promise to stop the simulation when the cell is re-run
    })
  
    $('#graphContainer').html(chart)
  })
}

drawGraph(selectCentrality_default, selectGraph_default, selectAlpha_default)
function updateGraph() {
    form = getFormValues()
    drawGraph(form['centrality'], form['graph'], form['alpha'])
}


selectGraph.on('change', function(e) {
  if (e.target.value.length)
    updateGraph()
})
selectCentrality.on('change', function(e) {
  if (e.target.value.length)
    updateGraph()
})
selectAlpha.on('change', function(e) {
  if (e.target.value.length)
    updateGraph()
})