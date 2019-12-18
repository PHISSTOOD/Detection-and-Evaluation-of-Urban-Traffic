# Term project website
In this term project, we use visulization ways for our data analysis, also we use react_tweet for latest important road information. Thank for my team member: Isuan-Tao, Wentao Fan

## Getting Started
#### Twitter Crawling Part
1. Change directory to tweepy
2. For python2 user use
```
python -m twitterstream3.py
```

3. For python3 user use
```
python3 -m twitterstream3.py
```

#### Database & Data Preprocessing Part
1. For  python2 user use
```
python -m Database_data_preprocessing.py
```
2. For  python3 user use
```
python3 -m Database_data_preprocessing.py
```
#### First Website Part
1. input google maps API API at website/index.html line 26.
2. demo: https://admiring-nightingale-41f5b2.netlify.com/
```
<script src="https://maps.googleapis.com/maps/api/js?key=YOURAPI"></script>
```

#### Second Website Part
1. Install dependencies: npm install
2. Create local MongoDB database called react-tweets (configured in server.js). Replace credentials for Twitter API (configured in config.js)
3. Start the app: node server.js
4. View in browser at: http://localhost:8080

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Please make sure to update tests as appropriate.
