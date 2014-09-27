Firefly
=======
This project is to help organizers to better promote their events.

It relies on the data stored on the GDG[x] Hub.

Organizers can use short urls like devfest.gdg.events to promote devfests, or brussels.gdg.events to 
promote events for GDG Brussels.

Furthermore, it can be uses as url shortner like gdg.events/ag62fd to direct to the events page.

There is no need for organizers to clone this repo or host this project on their servers.

Local Development
=================
Clone the git repository, then
```
bower install
grunt install
monogd
grunt serve
```

`client` contains an angular.js app to show event maps
`server` contains the logic for the url shortener


