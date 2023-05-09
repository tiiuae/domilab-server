import os
import json
from flask import Flask
from flask_cors import CORS
from flask import request
from flask import render_template
from flask import send_from_directory

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
    @app.get('/graphs/<name>')
    def get_graph(name):
        assert name in ["dolphins", "zachary"]
        with open(os.path.join('/home/sultan/Databases/domilab', '{}.json'.format(name)), 'r') as f:
            graph = json.load(f)
        return graph

    # endpoint
    @app.get('/centralities')
    def get_centralities():
        return {
            'data': ['domirank']
        }

    # endpoint
    @app.get('/centralities/<name>')
    def get_centrality(name):
        graph = request.args.get('graph')
        alpha = request.args.get('alpha')
        return [name, graph, alpha]

    # page
    @app.route('/interactive-alpha')
    def page_alpha():
        return render_template('alpha.html')
    
    # page
    @app.route('/network-attack')
    def page_attack():
        return render_template('attack.html')

    return app