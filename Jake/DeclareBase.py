import numpy as np
import pandas as pd
import datetime as dt

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# create engine to musicData.sqlite
engine = create_engine("sqlite:///musicData.sqlite")
inspector=inspect(engine)
inspector.get_table_names()

# dataByYearColumns = inspector.get_columns('data_by_year')
# for c in dataByYearColumns:
#     print(c["name"],c["type"])

# Declare DataByYear table
class DataByYear(Base):
  __tablename__ = "data_by_year"
  year = Column(String, primary_key=True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)

# dataColumns = inspector.get_columns('data')
# for c in dataColumns:
#     print(c["name"],c["type"])

# Declare Data table
class Data(Base):
  __tablename__ = "data"
  acousticness = Column(Float)
  artists = Column(String)
  danceability = Column(Float)
  duration_ms = Column(Integer)
  energy = Column(Float)
  explicit = Column(Integer)
  id = Column(String, primary_key = True)
  instrumentalness = Column(Float)
  key = Column(Integer)
  liveness = Column(Float)
  loudness = Column(Float)
  mode = Column(Integer)
  name = Column(String)
  popularity = Column(Integer)
  release_date = Column(String)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  year = Column(Integer)

# dataByArtistColumns = inspector.get_columns('data_by_artist')
# for c in dataByArtistColumns:
#     print(c["name"],c["type"])

# Declare DataByArtist table
class DataByArtist(Base):
  __tablename__ = "data_by_artist"
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)

# dataByArtistOColumns = inspector.get_columns('data_by_artist_o')
# for c in dataByArtistOColumns:
#     print(c["name"],c["type"])

# Declare DataByArtistO table
class DataByArtistO(Base):
  __tablename__ = 'data_by_artist_o'
  mode = Column(Integer)
  count = Column(Integer)
  acousticness = Column(Float)
  artists = Column(String, primary_key = True)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)

# dataByGenresColumns = inspector.get_columns('data_by_genres')
# for c in dataByGenresColumns:
#     print(c["name"], c["type"])

# Declare DataByGenres table
class DataByGenres(Base):
  __tablename__ = 'data_by_genres'
  genres = Column(String, primary_key=True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)

# dataByGenresOColumns = inspector.get_columns('data_by_genres_o')
# for c in dataByGenresOColumns:
#     print(c["name"], c["type"])

# Declare DataByGenresO table
class DataByGenresO(Base):
  __tablename__ = 'data_by_genres_o'
  mode = Column(Integer)
  genres = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)

# dataByYearOColumns = inspector.get_columns('data_by_year_o')
# for c in dataByYearOColumns:
#     print(c["name"],c["type"])

# Declare DataByYearO table
class DataByYearO(Base):
  __tablename__ = 'data_by_year_o'
  mode = Column(Integer)
  year = Column(Integer, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)

# dataOColumns = inspector.get_columns('data_o')
# for c in dataOColumns:
#     print(c["name"],c["type"])

# Declare DataO table
class DataO(Base):
  __tablename__ = 'data_o'
  valence = Column(Float)
  year = Column(Integer)
  acousticness = Column(Float)
  artists = Column(String)
  danceability = Column(Float)
  duration_ms = Column(Integer)
  energy = Column(Float)
  explicit = Column(Integer)
  id = Column(String, primary_key = True)
  instrumentalness = Column(Float)
  key = Column(Integer)
  liveness = Column(Float)
  loudness = Column(Float)
  mode = Column(Integer)
  name = Column(String)
  popularity = Column(Integer)
  release_date = Column(String)
  speechiness = Column(Float)
  tempo = Column(Float)

# dataWGenresColumns = inspector.get_columns('data_w_genres')
# for c in dataWGenresColumns:
#     print(c["name"],c["type"])

# Declare DataWGenres table
class DataWGenres(Base):
  __tablename__ = 'data_w_genres'
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)
  genres = Column(String)

# dataWGenresOColumns = inspector.get_columns('data_w_genres_o')
# for c in dataWGenresOColumns:
#     print(c["name"],c["type"])

# Declare DataWGenresO table
class DataWGenresO(Base):
  __tablename__ = 'data_w_genres_o'
  genres = Column(String)
  artists = Column(String, primary_key = True)
  acousticness = Column(Float)
  danceability = Column(Float)
  duration_ms = Column(Float)
  energy = Column(Float)
  instrumentalness = Column(Float)
  liveness = Column(Float)
  loudness = Column(Float)
  speechiness = Column(Float)
  tempo = Column(Float)
  valence = Column(Float)
  popularity = Column(Float)
  key = Column(Integer)
  mode = Column(Integer)
  count = Column(Integer)

# Crete metadata for all tables in Base
Base.metadata.create_all(engine)

# session = Session(bind=engine)

# allByYear = session.query(DataByYear)
# for row in allByYear:
#   print(row.year)
# #Close session!
# session.close()

# #Save results in a dictionary
# # allYearDict = {}
# # for row in allByYear:
# #   print(row.year)

# Start a session
session = Session(bind=engine)

#print all of the years in the DataByYear table
years = session.query(DataByYear)
for bob in years:
    print(bob.year)

# Close session
session.close()
