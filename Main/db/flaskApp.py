from flask_cors import CORS
import json
from flask import Flask, jsonify

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.orm import Session
# from sqlalchemy import create_engine, func, inspect
from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float

# Create engine
engine = create_engine("sqlite:///musicData.sqlite")

# Setup Flask
app = Flask(__name__)
CORS(app)

@app.route("/")
def homepage():
  return(
    f"Available Routes: <br/>"
    f"/api/v1.0/data <br/>"
    f"/api/v1.0/data_popularity_over_80 <br/>"
    f"/api/v1.0/data_by_year <br/>"
    f"/api/v1.0/data_by_artist <br/>"
    f"/api/v1.0/data_by_artist_clean/&lt;artist&gt; <br/>"
    f"/api/v1.0/data_by_genres <br/>"
    f"/api/v1.0/data_w_genres <br/>"
    f"/api/v1.0/top_51_genres <br/>"
  )

@app.route("/api/v1.0/data")
def data():

  # Open Session
  session = Session(bind=engine)

  # Query all data from 'data' table
  data = engine.execute("SELECT * from data")

  # Close Session
  session.close()

  # Create dataJSON
  dataJSON = json.dumps([dict(r) for r in data])

  return dataJSON

@app.route("/api/v1.0/data_popularity_over_80")
def data_85():
  session = Session(bind=engine)
  data80 = engine.execute("SELECT * from data \
    WHERE popularity >= 80")
  session.close()
  data80JSON = json.dumps([dict(r) for r in data80])

  return data80JSON

@app.route("/api/v1.0/data_by_year")
def data_by_year():
  session = Session(bind=engine)  
  dataByYear = engine.execute("SELECT * from data_by_year")
  session.close()
  dataByYearJSON = json.dumps([dict(r) for r in dataByYear])

  return dataByYearJSON

@app.route("/api/v1.0/data_by_artist")
def data_by_artist():
  session=Session(bind=engine)  
  dataByArtist = engine.execute("SELECT * from data_by_artist")
  session.close()
  dataByArtistJSON = json.dumps([dict(r) for r in dataByArtist])

  return dataByArtistJSON

@app.route("/api/v1.0/data_by_artist_clean/<artist>")
def data_by_artist_clean(artist):
  queryArtist = artist
  session=Session(bind=engine)  
  dataByArtistClean = engine.execute(f'SELECT * from Clean_Artists \
    WHERE artists = "{queryArtist}"')
  session.close()
  dataByArtistCleanJSON = json.dumps([dict(r) for r in dataByArtistClean])

  return dataByArtistCleanJSON

@app.route("/api/v1.0/data_by_genres")
def data_by_genres():
  session = Session(bind=engine)
  dataByGenres = engine.execute("SELECT * from data_by_genres")
  session.close()
  dataByGenresJSON = json.dumps([dict(r) for r in dataByGenres])

  return dataByGenresJSON

@app.route("/api/v1.0/data_w_genres")
def data_w_genres():
  session = Session(bind=engine)
  dataWithGenres = engine.execute("SELECT * from data_w_genres")
  session.close()
  dataWithGenresJSON = json.dumps([dict(r) for r in dataWithGenres])

  return dataWithGenresJSON

@app.route("/api/v1.0/top_51_genres")
def data_top_51_genres():
  session = Session(bind=engine)
  dataTop51Genres = engine.execute("SELECT * from top_51_genres")
  session.close()
  dataTop51GenresJSON = json.dumps([dict(r) for r in dataTop51Genres])

  return dataTop51GenresJSON

if __name__ == '__main__':
    app.run(debug=True)