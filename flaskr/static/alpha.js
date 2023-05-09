
chart = ForceGraph({
    nodes: [{
        id: "Structural basis of PROTAC cooperative recognition for selective protein degradation.",
        group: "Cited Works",
        radius: 2,
        citing_patents_count: 2
      },{
        id: "The influence of rough lipopolysaccharide structur…nteractions with mammalian antimicrobial peptides",
        group: "Cited Works",
        radius: 1,
        citing_patents_count: 1
      },{
        id: "New Synthetic Routes to Triazolo-benzodiazepine An… and Extra-Terminal (BET) Bromodomain Inhibition.",
        group: "Cited Works",
        radius: 1,
        citing_patents_count: 1
      },{
        id: "Cyclic and Macrocyclic Peptides as Chemical Tools … Surfaces and Probe Protein-Protein Interactions.",
        group: "Cited Works",
        radius: 1,
        citing_patents_count: 1
      }],
    links: [{
        source: "Structural basis of PROTAC cooperative recognition for selective protein degradation.",
        target: "The influence of rough lipopolysaccharide structur…nteractions with mammalian antimicrobial peptides",
        value: 2
      },{
        source: "New Synthetic Routes to Triazolo-benzodiazepine An… and Extra-Terminal (BET) Bromodomain Inhibition.",
        target: "The influence of rough lipopolysaccharide structur…nteractions with mammalian antimicrobial peptides",
        value: 2
      },{
        source: "New Synthetic Routes to Triazolo-benzodiazepine An… and Extra-Terminal (BET) Bromodomain Inhibition.",
        target: "Cyclic and Macrocyclic Peptides as Chemical Tools … Surfaces and Probe Protein-Protein Interactions.",
        value: 2
      }]
}, {
    nodeId: (d) => d.id,
    nodeGroup: (d) => d.group,
    linkStrokeWidth: (l) => Math.sqrt(l.value),  
    width: 400,
    height: 600,
    // invalidation, // a promise to stop the simulation when the cell is re-run
  })

  // console.log(d3.select('#scatter_area'));
  // console.log(document.getElementById('scatter_area'));
  document.getElementById('scatter_area').appendChild(chart)
  // d3.select('#scatter_area').insert(chart)