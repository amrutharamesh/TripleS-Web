#!/usr/bin/env python

import socket
from urllib2 import *
import urllib
import json
import sys

def send_push():
    MY_API_KEY="AIzaSyAr6UZ6R9fT0RwDera7adrtSpzgRyYq4CM"

    messageTitle = 'TripleS'
    messageBody = 'Odor detected!'

    data={
        "to" : "/topics/my_little_topic",
        "notification" : {
            "body" : messageBody,
            "title" : messageTitle,
            "icon" : "ic_cloud_white_48dp"
        }
    }

    dataAsJSON = json.dumps(data)

    request = Request(
        "https://gcm-http.googleapis.com/gcm/send",
        dataAsJSON,
        { "Authorization" : "key="+MY_API_KEY,
          "Content-type" : "application/json"
        }
    )

    print urlopen(request).read()

send_push()