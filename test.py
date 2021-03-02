import json

with open('courses.json') as f:
    d = json.load(f)

for i in d.keys():
    print(len(d[i]))