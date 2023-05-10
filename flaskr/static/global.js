selectGraph = $('#selectGraph')
selectGraph_default = 'dolphins'

selectCentrality = $('#selectCentrality')
selectCentrality_default = 'domirank'

selectAlpha = $('#inputAlpha')
selectAlpha_default = 50

getCentralities()
.done((data) => {
    data['data'].forEach(e => {
        selected = e['id'] == selectCentrality_default ? "selected" : ""
        selectCentrality.append(`<option value="${e['id']}" ${selected}>${e['value']}</option>`)
    });
})

getGraphs()
.done((data) => {
    data['data'].forEach(e => {
        selected = e['id'] == selectGraph_default ? "selected" : ""
        selectGraph.append(`<option value="${e['id']}" ${selected}>${e['value']}</option>`)
    });
})

// events listeners
$('#inputAlphaValue').html(selectAlpha_default)
selectAlpha.on('change', function(e) {
    value = e.target.value
    $('#inputAlphaValue').html(value)

    form = getFormValues()
    getCentrality(form['centrality'], {
        'graph': form['graph'],
        'alpha': form['alpha']
    })
    .done((data) => {
        console.log(data);
    })
})
