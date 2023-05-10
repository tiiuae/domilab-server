import os
import json
import numpy as np
from flask import Flask
from flask_cors import CORS
from flask import request
from flask import render_template
from flask import send_from_directory

# GRAPHS = ["dolphins", "zachary", "patents", "people"]
GRAPHS = ["dolphins", "zachary"]
CENTRALITIES = ["domirank"]

def create_app(test_config=None):
    # create and configure the app
    app = Flask(__name__, instance_relative_config=True)
    CORS(app)
    app.config.from_mapping(
        SECRET_KEY='dev',
    )

    if test_config is None:
        # load the instance config, if it exists, when not testing
        app.config.from_pyfile('config.py', silent=True)
    else:
        # load the test config if passed in
        app.config.from_mapping(test_config)

    # ensure the instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass
    

    @app.route('/favicon.ico')
    def favicon():
        return send_from_directory(os.path.join(app.root_path, 'static'),
                                'favicon.ico', mimetype='image/vnd.microsoft.icon')

    # endpoint
    @app.get('/graphs')
    def get_graphs():
        return {
            'data': [
                {'id': "dolphins", 'value': "dolphins"}, 
                {'id': "zachary", 'value': "zachary"}, 
                # {'id': "patents", 'value': "patents"}, 
                # {'id': "people", 'value': "people"}
            ]
        }

    # endpoint
    @app.get('/graphs/<name>')
    def get_graph(name):
        assert name in GRAPHS
        with open(os.path.join('flaskr', 'data', '{}.json'.format(name)), 'r') as f:
            graph = json.load(f)
        return graph

    # endpoint
    @app.get('/centralities')
    def get_centralities():
        return {
            'data': [
                {'id': "domirank", 'value': "domirank"}
            ]
        }

    # endpoint
    @app.get('/centralities/<name>')
    def get_centrality(name):
        graph = request.args.get('graph')
        alpha = request.args.get('alpha')
        alpha = int(alpha)-1
        assert name in CENTRALITIES
        assert graph in GRAPHS

        with open(os.path.join('flaskr', 'data', '{}.json'.format(graph)), 'r') as f:
            graph_json = json.load(f)

        if graph == "dolphins":
            d = np.load(os.path.join('flaskr', 'data', 'dolphins_centrality_component.npy'), allow_pickle=True)
        elif graph == "zachary":
            d = np.load(os.path.join('flaskr', 'data', 'zachary_centrality_component.npy'), allow_pickle=True)
        
        for i in graph_json['nodes']:
            i['value'] = d[alpha][0][int(i['id'])-1].tolist()
        
        return graph_json

    # page
    @app.route('/interactive-alpha')
    def page_alpha():
        return render_template('alpha.html')
    
    # page
    @app.route('/network-attack')
    def page_attack():
        return render_template('attack.html')
    
    # page
    @app.route('/arc-diagram')
    def page_arc():
        return render_template('attack.html')

    return app