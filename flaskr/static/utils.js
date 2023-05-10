// api endpoints
function getCentralities() {
    return $.get("/centralities")
    .done(() => {})
    .fail(() => {})
    .always(() => {});
}

function getCentrality(name, args) {
    return $.get(`/centralities/${name}`, {graph: args.graph, alpha: args.alpha}, () => {})
    .done(() => {})
    .fail(() => {})
    .always(() => {});
}

function getGraphs() {
    return $.get("/graphs")
    .done(() => {})
    .fail(() => {})
    .always(() => {});
}

function getGraph(name) {
    return $.get(`/graphs/${name}`)
    .done(() => {})
    .fail(() => {})
    .always(() => {});
}

// utility functions
function getFormValues() {
    return {
        'centrality': selectCentrality.val(),
        'graph': selectGraph.val(),
        'alpha': selectAlpha.val()
    }
}