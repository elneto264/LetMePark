from django.http import HttpResponse
from pymongo import MongoClient


MONGO_URI = 'mongodb+srv://students:a428PmHV6DzfPMnk@mongodb-cluster-us-east-1-yuln1.mongodb.net/'
client = MongoClient(MONGO_URI)

db= client['letmepark']
coleccion= db['parkings']


    