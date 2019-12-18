import pandas as pd
import string
import numpy as np
import networkx as nx
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN

# Load Dataset

#df=pd.read_csv('/users/liuyuhang/desktop/db3.csv',encoding = 'gbk', sep=',',usecols=[521, 522, 523, 524, 525, 531, 537, 555, 564], header= 0, names=['timestamp', 'week', 'time','year', 'date', 'id', 'text', 'location', 'coordinate'])

df=pd.read_csv('/users/liuyuhang/desktop/db2.csv',encoding = 'gbk', sep=',',usecols=[4, 5, 6, 7, 8, 14, 20, 27, 33], header= 0, names=['timestamp', 'week', 'time','year', 'date', 'id', 'text', 'location', 'coordinate'])
# df['time'] = df['tpep_pickup_datetime'].str[11:]
print(df.head())
print(df.tail())

df['Hour'] = df['time'].str[:2]
df['Day/night'] = df['Hour'].map(lambda x:1 if 18>int(x)>=9 else 0)



# 选取有经纬度的点
help = []
for string in df['coordinate']:
    if string == "#VALUE!":
        continue
    if string not in help:
        help.append(string)

df1 = df[df['coordinate'].isin(help)]


df1.to_csv('/users/liuyuhang/desktop/10000.csv')

df1=pd.read_csv('/users/liuyuhang/desktop/10000.csv', sep=',', usecols=[9,11], header= 0, names=['coordinate','Day/night'])

# df1.to_csv('/users/liuyuhang/desktop/1000.csv')
print(df1.head())
print(df1.tail())

df1 = df1.dropna()


result = []
file = open('/users/liuyuhang/desktop/coordinate.txt','a')

for index, row in df.iterrows():
    string1 = row['coordinate']
    string2 = row['Day/night']
    string3 = str(string2)
    if len(string1) > 100 or len(string1) < 8:
        continue
    string = string1[:len(string1) - 1]
    temp1 = string.split("]")
    res = []
    for item1 in temp1:
        temp2 = item1.split("[")
        for item2 in temp2:
            if item2:
                res.append(item2)

    for item in res:
        temp1, temp2 = "", ""
        i, j = 0, 0
        istrue = False
        while (i < 7):
            temp1 += item[j]
            j += 1
        # print(item)
        # print (len(item),j)
            if item[j] == ".":
                istrue = True
            if istrue:
                i += 1
        temp2 = item[j + 1:]
        if temp2[0] == '，':
            temp2 = temp2[1:]

        if temp1 + "," + temp2 not in result:
            result.append(temp1 + "," + temp2 + ',' + string3)


for mid in result:
    xy = mid.split(",")
    x = xy[0]
    y = xy[1]
    z = xy[2]
    '''if y[0] == '，':
        y = y[1:]'''
    num1 = float(x)
    num2 = float(y)
    if num1 > -78.2 and num1 < -76.3 and num2 > 38.05 and num2 < 39.55:
        s = str(num1) + "," + str(num2) + ',' + z + "\n"
        file.write(s)


print(result)
file.close

