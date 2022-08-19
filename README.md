# Vidmantas Valskis WeatherTop web application

Web Development II WeatherTop V2 assignment



## Description

A Web companion application for modular weather station WeatherTop 1000, V2 JavaScript edition.


## Dependencies

* Java 11
* Play 1.6


## Running app on local machine

* Open controllers/station.js and add your API key from openweathermap.org 
```
const apiKey = "API_KEY"
```


## Executing program

```
cd project-folder/
npm install
npm start
```


## Authors

* Name : Vidmantas Valskis
* Student Number: 20099690


## Version History

* Weather Top JS - Release 4 v1.1
    * This version includes all features in the previous release with few changes:
        * Updated map functionality:
            * Left click on marker to see stations info
            * Right click on map to quickly create a new station.
        * Added new pressure chart
        * Combined temperature and wind speed charts into one.
        * Code clean-up
        
* Weather Top JS - Release 4 v1.0
    * This version includes all features in the previous release with few extra features:
        * Auto generate reading from OpenWeaher using API
        * Station Map view
        * Graphical chart of temperature forecast
        * Code clean-up

* Weather Top JS - Release 3 v1.0
    * Reworked app from Java with working features:
        * Trends
        * Date/Time stamp on each reading
        * All Stations Summary
        * Station/Reading delete support
        * Members can edit their personal details
    * Fully functional app with all methods in station analytic utility.


## Acknowledgments

Sources referred to during the development of the assignment:
* [submbit post form](https://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit)
* [leaflet map events](https://leafletjs.com/reference.html#mouseevent)
* [handlebars](https://handlebarsjs.com/api-reference/)
