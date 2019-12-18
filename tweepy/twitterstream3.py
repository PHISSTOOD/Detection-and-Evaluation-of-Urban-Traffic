
from tweepy import Stream
from tweepy import OAuthHandler
from tweepy.streaming import StreamListener
import time

consumerkey='****'
consumersecret='****'
accesstoken='****'
accesssecret='****'


class listener(StreamListener):

    def on_data(self,data):
        try:
    
            if 'virginia' in data:
                print (data)
                saveFile=open('twitDB3.csv','a')
                saveFile.write(data)
                saveFile.write('\n')   
                saveFile.close()
        
                return True
        
        except BaseException (e):
            print ('failed ondata,') ,str(e)
            time.sleep(5)
        
        
    def on_error(self,status):
        print (status)
        
auth=OAuthHandler(consumerkey,consumersecret)
auth.set_access_token(accesstoken,accesssecret)

twitterstream=Stream(auth,listener())
twitterstream.filter(track=["car"])
