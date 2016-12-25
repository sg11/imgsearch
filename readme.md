#Image Search Abstraction Layer Microservice API 
Created by sg11

Image Search is a microservice API that accepts a query term and page offset and returns a set of images with URLs to the thumbnails and pages as well as a brief description about the image. You can also search for the latest queries and the app will return the 10 latest queries. 

This app is a project for the Back End Certification on FreeCodeCamp.

##User Stories:
 1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.

 2. I can paginate through the responses by adding a ?offset=2 parameter to the URL

 3. I can get a list of the most recently submitted search strings.

##Example Usage:
```url
https://image-sng11.c9users.io/search/dogs?offset=3
https://image-sng11.c9users.io/latest
```
##Example Output for Search Term:
```json
[{"thumbnail-url":"http://cache3.asset-cache.net/xt/874209-003.jpg?v=1&g=fs1|0|ICO|42|093&s=1&b=RUM5","snippet":"Latin name: Canis familiaris. The modern great dane breed was developed in Germany where it is known as 'Deutsche Dogge'. The origins of the chihuahua are unknown but it appears it was named after the Miexican state of Chihuahua.","page-url":"https://www.gettyimages.com/photos/874209-003"},
{"thumbnail-url":"http://cache4.asset-cache.net/xt/507832859.jpg?v=1&g=fs1|0|MIR|32|859&s=1&b=RjI4","snippet":null,"page-url":"https://www.gettyimages.com/photos/507832859"},
{"thumbnail-url":"http://cache2.asset-cache.net/xt/141520741.jpg?v=1&g=fs1|0|TSIR|20|741&s=1&b=NDJC","snippet":null,"page-url":"https://www.gettyimages.com/photos/141520741"},
{"thumbnail-url":"http://cache2.asset-cache.net/xt/87139098.jpg?v=1&g=fs1|0|FKS|39|098&s=1&b=RTRE","snippet":"This is a Havanese dog riding in a car with its head out the window. ","page-url":"https://www.gettyimages.com/photos/87139098"},
{"thumbnail-url":"http://cache3.asset-cache.net/xt/174335218.jpg?v=1&g=fs1|0|EPL|35|218&s=1&b=RjI4","snippet":"Young woman walking her dogs on a city street. She is being pulled down the street by the dog.","page-url":"https://www.gettyimages.com/photos/174335218"},
{"thumbnail-url":"http://cache3.asset-cache.net/xt/594054515.jpg?v=1&g=fs1|0|FKF|54|515&s=1&b=RjI4","snippet":null,"page-url":"https://www.gettyimages.com/photos/594054515"},
{"thumbnail-url":"http://cache2.asset-cache.net/xt/82548950.jpg?v=1&g=fs1|0|DV|48|950&s=1&b=MkUw","snippet":null,"page-url":"https://www.gettyimages.com/photos/82548950"},
{"thumbnail-url":"http://cache1.asset-cache.net/xt/120523074.jpg?v=1&g=fs1|0|ICO|23|074&s=1&b=RjI4","snippet":"Dog, Weimaraner Yawning","page-url":"https://www.gettyimages.com/photos/120523074"},
{"thumbnail-url":"http://cache4.asset-cache.net/xt/514280768.jpg?v=1&g=fs1|0|EPL|80|768&s=1&b=RjI4","snippet":"Elderly couple enjoy their golden years living by the sea with their pet dog ","page-url":"https://www.gettyimages.com/photos/514280768"},
{"thumbnail-url":"http://cache1.asset-cache.net/xt/482662389.jpg?v=1&g=fs1|0|EPL|62|389&s=1&b=RjI4","snippet":"Happy girl holding labrador puppy lying on grass","page-url":"https://www.gettyimages.com/photos/482662389"}]
```

##Example Output for Latest Queries:
```json
[{"term":"dog","when":"2016-12-15T13:32:25.074Z"},
{"term":"cat","when":"2016-12-15T13:33:46.436Z"},
{"term":"dog","when":"2016-12-15T13:52:15.676Z"},
{"term":"dog funny","when":"2016-12-15T13:52:18.062Z"},
{"term":"funny","when":"2016-12-15T13:53:21.740Z"},
{"term":"animals","when":"2016-12-15T13:53:27.843Z"},
{"term":"animals funny","when":"2016-12-15T13:53:35.603Z"},
{"term":"school","when":"2016-12-15T13:53:46.314Z"},
{"term":"dog","when":"2016-12-15T14:01:36.474Z"},
{"term":"dogs","when":"2016-12-15T14:01:41.650Z"}]
```