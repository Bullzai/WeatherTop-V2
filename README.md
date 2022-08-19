# Vidmantas Valskis WeatherTop web application

A joint Web Development & Programming assigment.


## Description

A Web companion application for modular weather station WeatherTop 1000


## Dependencies

* Java 11
* Play 1.6


## Running app on local machine

* Edit file conf/application.conf and change from 
```
application.mode=prod
db=${catflower}
```
to 
```
application.mode=dev
db.default=mem
```
* Or you can set Environment Variables on your PC:
```
key = catflower
value = postgres://user:pwd@host/database
```


## Executing program

```
cd web-app/
play run
```


## Authors

* Name : Vidmantas Valskis
* Student Number: 20099690


## Version History

* Weather Top - Release 3 v1.1
    * This version includes all features in the previous release with few changes:
        * Adjusted front-end
        * Created Util class and moved all methods into it from Station model class
        * Added additional input requirements and checks
        * Code clean-up

* Weather Top - Release 3 v1.0
    * This version includes all features in the previous release, plus 5 new capabilities:
        * Trends
        * Date/Time stamp on each reading
        * All Stations Summary
        * Station/Reading delete support
        * Members can edit their personal details
    * Fully functional app with all methods in station model class.

* Weather Top - Release 2
    * This version includes all features in the previous release, plus 4 new capabilities:
        * User Accounts
        * Location of Station
        * Current Weather Icon
        * Max/Min values

* Weather Top - Release 1
    * This version includes all features in baseline, with one additional piece of data in the reading for each station - Wind Direction
    * For each station, the wind summary is expanded to include:
        * Wind Compass
        * Wind Chill
    * The application has 2 additional features:
        * Add Station
        * Add Reading

* Weather Top - Baseline
    * This version includes all features in Starter and the dashboard presents, for each station, the Latest Weather. The latest weather is derived from the most recent (last) reading for the station and contains:
        * Station Name
        * Weather conditions
        * Temp in both C & F
        * Wind in Beaufort
        * Pressure
* Weather Top - Starter
    * Initial Release
    * The application launches and reads a YAML file (.yml) of readings for a small number of weather stations. Each reading consists of:
        * Weather Code (number in range 100-800), integer
        * Temp (C) decimal
        * Wind Speed (kM/hr) decimal


## Acknowledgments

Sources referred to during the development of the assignment:
* [submbit post form](https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit)
* [leaflet map events](https://leafletjs.com/reference.html#mouseevent)
* [handlebars](https://handlebarsjs.com/api-reference/)
