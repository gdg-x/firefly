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
npm install
mongod
grunt serve
```

`client` contains an angular.js app to show event maps
`server` contains the logic for the url shortener

Prod Deployment
===============
1. Create `dist` directory in the root folder of the project
2. Clone the deploy repo of the server into dist
3. Execute `grunt build`
4. change into `dist` and add, commit, push the server to deploy repo
5. check the server at http://gdg.events





