import numpy as np
import pandas as pd
import datetime as dt
import json
from flask import Flask, jsonify

# Python SQL toolkit and Object Relational Mapper
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

from sqlalchemy import create_engine
from sqlalchemy import Column, Integer, String, Float

from sqlalchemy.ext.declarative import declarative_base
Base = declarative_base()

engine = create_engine("sqlite:///musicData.sqlite")

session = Session(bind=engine)

data = engine.execute("SELECT * from data")
dataJSON = json.dumps([dict(r) for r in data])

dataO = engine.execute("SELECT * from data_o")
dataOJSON = json.dumps([dict(r) for r in dataO])

dataByYear = engine.execute("SELECT * from data_by_year")
dataByYearJSON = json.dumps([dict(r) for r in dataByYear])

dataByYearO = engine.execute("SELECT * from data_by_year_o")
dataByYearOJSON = json.dumps([dict(r) for r in dataByYearO])

dataByArtist = engine.execute("SELECT * from data_by_artist")
dataByArtistJSON = json.dumps([dict(r) for r in dataByArtist])

dataByArtistO = engine.execute("SELECT * from data_by_artist_o")
dataByArtistOJSON = json.dumps([dict(r) for r in dataByArtistO])

dataByGenres = engine.execute("SELECT * from data_by_genres")
dataByGenresJSON = json.dumps([dict(r) for r in dataByGenres])

dataByGenresO = engine.execute("SELECT * from data_by_genres_o")
dataByGenresOJSON = json.dumps([dict(r) for r in dataByGenresO])

dataWithGenres = engine.execute("SELECT * from data_w_genres")
dataWithGenresJSON = json.dumps([dict(r) for r in dataWithGenres])

dataWithGenresO = engine.execute("SELECT * from data_w_genres_o")
dataWithGenresOJSON = json.dumps([dict(r) for r in dataWithGenresO])

# print(dataJSON)
