import boto3
import json

#this script is to help you load a fairly simple JSON file to DynamoDB
dynamo_client= boto3.resource('dynamodb', region_name='us-west-1')  #establish connection to your dynamoDB

table = dynamo_client.Table('Music_ML_IDs') #assign YOUR tablename here
file="../Resources/MLResources/revised_full_Imploded.json" #full path to your json data

#this will loop through your file and put_item each row into your table
#note taht you have to make sure you are "putting" your key and
#you have to add the columnnames for each item
with open(file) as json_file:  
    songs = json.load(json_file)
    for song in songs:
        name = song['name']
        artists = song['artists']
        genres = song['genres']
        assignments = song['Assignments']
        ids = song['id']

        print("Adding Song:", name)

        table.put_item(
           Item={
               'name':name,
               'artists':artists,
               'genres':genres,
               'Assignments':assignments,
               'id':ids
            }
        )