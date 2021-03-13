import json

with open('temp.txt') as f:
    mylist = f.readlines()

sos = {}
for i, z in zip(mylist, range(len(mylist))):
    sos[i] = z

with open('temp.txt', 'w+') as f:
    for i in sos.keys():
        f.write(i + '\n')

with open('temp.json', 'w+') as f:
    json.dump(sos, f)


