Firefly
=======

This project is to help organizers to better promote their events.

It relies on the data stored on the GDG[x] Hub.

**List of events**
Organizers can use short urls like http://devfest.gdg.events to promote devfests, or http://brussels.gdg.events (to be implemented) to 
promote events for GDG Brussels.

**Url shortener**
Furthermore, it can be uses as url shortner like http://gdg.events/ag62fd to direct to the events page.
The statistics are shown at http://gdg.events/ag62fd/analytics

There is no need for organizers to clone this repo or host this project on their servers.

Contribute
=================

Get involved: [![Join the chat at https://gitter.im/gdg-x/firefly](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gdg-x/firefly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Discuss [issues](https://github.com/gdg-x/firefly/issues) and [pull requests](https://github.com/gdg-x/firefly/pulls).


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





