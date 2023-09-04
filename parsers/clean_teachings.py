import json
import sqlite3
from tqdm import tqdm
import time
from datetime import datetime

with open('./resources/teachings.json') as f:
    teachings = json.load(f)


def count_word(word: str, words: list):
    count = 0
    for w in words:
        if w.lower().find(word) != -1:
            count += 1
    return count


def split_newline(string: str):
    return string.split('\n')[0].strip()


def remove_newline(teachings: list):
    final = []
    for t in teachings:
        temp = {}
        temp['title'] = split_newline(t['title'])
        temp['ssd'] = t['ssd']
        temp['code'] = t['code']
        temp['cfu'] = t['cfu']
        temp['site'] = t['site']
        temp['from'] = t['from']
        final.append(temp)
    return final


def is_dup(i, l):
    try:
        a = l.index(i)
    except ValueError:
        return False
    if i in l[a+1:]:
        return True
    return False

# dups = []
# start1 = time.time_ns()
# for j in tqdm(range(len(teachings))):
#     i = teachings[j]
#     if i in dups:
#         continue
#     if is_dup(i, teachings[j:]):
#         dups.append(i)
# end1 = time.time_ns()
# print(f'Search time: {(end1-start1)/1000000000} seconds')

# start2 = time.time_ns()
# # for j in tqdm(teachings):
# for j in teachings:
#     if j in dups:
#         continue
#     if teachings.count(j) > 1:
#         dups.append(j)
# end2 = time.time_ns()
# print(f'Time taken: {(end2-start2)/1000000000} seconds')

# start3 = time.time_ns()
# # for j in tqdm(range(len(teachings))):
# for j in range(len(teachings)):
#     i = teachings[j]
#     if i in dups:
#         continue
#     if teachings[j:].count(i) > 1:
#         dups.append(i)
# end3 = time.time_ns()
# print(f'Time taken: {(end3-start3)/1000000000} seconds')

# start1 = time.time_ns()
# dups.sort(key = lambda x: int(x['code']))
# end1 = time.time_ns()
# print(f'Sort time: {(end1-start1)/1000000000} seconds')

# print(len(dups))

# with open('./resources/dup_list.json', 'w+') as f:
#     json.dump(dups, f, indent=4)


# con = sqlite3.connect('./temp.db')
# cur = con.cursor()

# cur.ex

# for i in teachings:
teachings_temp = remove_newline(teachings)

teachings_empty_code = [i for i in teachings_temp if i['code'] == '']

with open('./resources/teachings_temp.json', 'w+') as f:
    json.dump(teachings_temp, f, indent=4)

with open('./resources/teachings_empty_code.json', 'w+') as f:
    json.dump(teachings_empty_code, f, indent=4)


codes = [i['code'] for i in teachings]
sites = [i['site'] for i in teachings]
titles = [i['title'] for i in teachings]
ssds = [i['ssd'] for i in teachings]

print('Codes:  ', len(codes), len(set(codes)))
print('Sites:  ', len(sites), len(set(sites)))
print('Titles: ', len(titles), len(set(titles)))
print('SSDs:   ', len(ssds), len(set(ssds)))
