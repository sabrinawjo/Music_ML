from flask_cors import CORS
import json
from flask import Flask, jsonify
import boto3

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, inspect
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float
dynamo_client = boto3.Session(region_name='us-west-1').client('dynamodb')

def get_item_Music_ML3(table,track):
    table=table
    name=track
    response = dynamo_client.get_item(
    Key={
        'name': {'S': name}
    }, 
    TableName=table  #could pass this value in as well to manage multiple tables
    )
    return response
# Create engine
engine = create_engine("sqlite:///musicData.sqlite")

# Setup Flask
app = Flask(__name__)
CORS(app)

@app.route("/")
def homepage():
  return(
    f"Available Routes: <br/>"
    # f"/api/v1.0/data <br/>"
    # f"/api/v1.0/data_popularity_over_80 <br/>"
    # f"/api/v1.0/data_o <br/>"
    f"/api/v1.0/data_by_year <br/>"
    # f"/api/v1.0/data_by_year_o <br/>"
    # f"/api/v1.0/data_by_artist <br/>"
    f"/api/v1.0/data_by_artist_clean/&lt;artist&gt; <br/>"
    # f"/api/v1.0/data_by_artist_o <br/>"
    # f"/api/v1.0/data_by_genres <br/>"
    # f"/api/v1.0/data_by_genres_o <br/>"
    # f"/api/v1.0/data_w_genres <br/>"
    f"/api/v1.0/top_51_genres <br/>"
    # f"/api/v1.0/data_w_genres_o <br/>"
    f"/api/v2.0/Music_ML_tracks/&lt;track&gt; <br/>"
    f"/api/v2.1/Music_ML_tracks/&lt;track&gt; <br/>"
    f"/api/v2.1/Fixed_Song_Assignments/&lt;Assignments&gt; <br/>"
    # f"/api/v2.1/Music_ML_Assignment_Name/A=&lt;Assignment&gt;&amp;N=&lt;Name&gt; <br/>"
  )

# @app.route("/api/v1.0/data")
# def data():

#   # Open Session
#   session = Session(bind=engine)

#   # Query all data from 'data' table
#   data = engine.execute("SELECT * from data")

#   # Close Session
#   session.close()

#   # Create dataJSON
#   dataJSON = json.dumps([dict(r) for r in data])

#   return dataJSON

# @app.route("/api/v1.0/data_popularity_over_80")
# def data_85():
#   session = Session(bind=engine)
#   data80 = engine.execute("SELECT * from data \
#     WHERE popularity >= 80")
#   session.close()
#   data80JSON = json.dumps([dict(r) for r in data80])

#   return data80JSON
# @app.route("/api/v1.0/data_o")
# def data_o():
#   session = Session(bind=engine)
#   dataO = engine.execute("SELECT * from data_o")
#   session.close()
#   dataOJSON = json.dumps([dict(r) for r in dataO])

#   return dataOJSON

@app.route("/api/v1.0/data_by_year")
def data_by_year():
  session = Session(bind=engine)  
  dataByYear = engine.execute("SELECT * from data_by_year")
  session.close()
  dataByYearJSON = json.dumps([dict(r) for r in dataByYear])

  return dataByYearJSON

# @app.route("/api/v1.0/data_by_year_o")
# def data_by_year_o():
#   session = Session(bind=engine)
#   dataByYearO = engine.execute("SELECT * from data_by_year_o")
#   session.close()
#   dataByYearOJSON = json.dumps([dict(r) for r in dataByYearO])

#   return dataByYearOJSON

# @app.route("/api/v1.0/data_by_artist")
# def data_by_artist():
#   session=Session(bind=engine)  
#   dataByArtist = engine.execute("SELECT * from data_by_artist")
#   session.close()
#   dataByArtistJSON = json.dumps([dict(r) for r in dataByArtist])

#   return dataByArtistJSON

@app.route("/api/v1.0/data_by_artist_clean/<artist>")
def data_by_artist_clean(artist):
  queryArtist = artist
  session=Session(bind=engine)  
  dataByArtistClean = engine.execute(f'SELECT * from Clean_Artists \
    WHERE artists = "{queryArtist}"')
  session.close()
  dataByArtistCleanJSON = json.dumps([dict(r) for r in dataByArtistClean])

  return dataByArtistCleanJSON

# @app.route("/api/v1.0/data_by_artist_o")
# def data_by_artist_o():
#   session = Session(bind=engine)
#   dataByArtistO = engine.execute("SELECT * from data_by_artist_o")
#   session.close()
#   dataByArtistOJSON = json.dumps([dict(r) for r in dataByArtistO])

#   return dataByArtistOJSON

# @app.route("/api/v1.0/data_by_genres")
# def data_by_genres():
#   session = Session(bind=engine)
#   dataByGenres = engine.execute("SELECT * from data_by_genres")
#   session.close()
#   dataByGenresJSON = json.dumps([dict(r) for r in dataByGenres])

#   return dataByGenresJSON

# @app.route("/api/v1.0/data_by_genres_o")
# def data_by_genres_o():
#   session = Session(bind=engine)
#   dataByGenresO = engine.execute("SELECT * from data_by_genres_o")
#   session.close()
#   dataByGenresOJSON = json.dumps([dict(r) for r in dataByGenresO])

#   return dataByGenresOJSON

# @app.route("/api/v1.0/data_w_genres")
# def data_w_genres():
#   session = Session(bind=engine)
#   dataWithGenres = engine.execute("SELECT * from data_w_genres")
#   session.close()
#   dataWithGenresJSON = json.dumps([dict(r) for r in dataWithGenres])

#   return dataWithGenresJSON

@app.route("/api/v1.0/top_51_genres")
def data_top_51_genres():
  session = Session(bind=engine)
  dataTop51Genres = engine.execute("SELECT * from top_51_genres")
  session.close()
  dataTop51GenresJSON = json.dumps([dict(r) for r in dataTop51Genres])

  return dataTop51GenresJSON

# @app.route("/api/v1.0/data_w_genres_o")
# def data_w_genres_o():
#   session = Session(bind=engine)
#   dataWithGenresO = engine.execute("SELECT * from data_w_genres_o")
#   session.close()
#   dataWithGenresOJSON = json.dumps([dict(r) for r in dataWithGenresO])

#   return dataWithGenresOJSON

@app.route("/api/v2.0/Music_ML_tracks/<track>")
def get_track_data(track):
  table = 'Music_ML3'
  return   jsonify(get_item_Music_ML3(table,track))

@app.route("/api/v2.1/Music_ML_tracks/<track>")
def get_track_data_v2(track):
  table = 'Music_ML_IDs'
  return   jsonify(get_item_Music_ML3(table,track))

# @app.route("/api/v2.1/Music_ML_Assignment_Name/A=<Assignment>&N=<Name>")
# def get_by_Assignment_Name(Assignment, Name):
#   table = 'Music_ML_AssignName'
#   Assignment=Assignment
#   Name=Name
#   response = dynamo_client.get_item(
#   Key={
#       'name': {'S': name}
#   }, 
#   TableName=table  #could pass this value in as well to manage multiple tables
#   )
#   return response

@app.route("/api/v2.1/Fixed_Song_Assignments/<Assignments>")
def data_assignments_fixed(Assignments):
  Assignments = Assignments
  session=Session(bind=engine)  
  dataAssignmentsFixed = engine.execute(f'SELECT * from fixed_song_combined \
    WHERE Assignments = {int(Assignments)}')
  session.close()
  dataAssignmentsFixed = json.dumps([dict(r) for r in dataAssignmentsFixed])

  return dataAssignmentsFixed

if __name__ == '__main__':
    app.run(debug=True)