Firefly
=======
[![Build Status](https://travis-ci.org/gdg-x/firefly.png)](https://travis-ci.org/gdg-x/firefly)

This project is to help organizers to better promote their events.

It relies on the data stored on the GDG[x] Hub.

**List of events**
Organizers can use short urls like http://devfest.gdgroups.org to promote devfests, or 
http://brussels.gdgroups.org (to be implemented) to promote events for GDG Brussels.

**Url shortener**
Furthermore, it can be used as url shortener like http://gdgroups.org/4363aa to direct to a specific event's page.
The statistics are shown at http://gdgroups.org/4363aa/analytics

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

`client` contains the AngularJS app
`server` contains the logic for the url shortener

Prod Deployment
===============
1. `git fetch`
2. `git pull`
3. `grunt build`
4. `nohup npm start &`
5. Check the server at http://gdgroups.org





