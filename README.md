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
1. Clone the git repository.
1. Create and customize `server/config/local.env.js` based on `server/config/local.env.sample.js`.
1. Define the **GOOGLE_API_KEY**: The API key for your project, available from the [Cloud Console](https://cloud.google.com/console)
  1. Create a new project then go to APIs & Auth->APIs, activate Google+ API.
  1. Go to APIs & Auth->Credentials. Add Credentials->API key->Browser key->Create (keep `Any referrer allowed` set).
1. Define the **SESSION_SECRET**: The Client secret for your project, available from the [Cloud Console](https://cloud.google.com/console)
  1. Go to APIs & Auth->Credentials. Add Credentials->API key->OAuth 2.0 client ID->Web Application->Create.
1. `bower install`
1. `npm install`
1. `mongod` or `mongostart` (configured [here](https://github.com/gdg-x/hub/wiki/MongoDB-Config)).
1. `grunt serve`

* `client` contains the AngularJS app
* `server` contains the logic for the url shortener

Prod Deployment
===============
1. `git fetch`
1. `git pull`
1. `grunt build`
1. `npm runScript configProd`
1. `nohup npm start &`
1. Check the server at http://gdgroups.org





