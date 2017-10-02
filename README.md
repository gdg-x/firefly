Firefly
=======
[![Build Status](https://travis-ci.org/gdg-x/firefly.png)](https://travis-ci.org/gdg-x/firefly)

This project is to help organizers to better promote their events.

It relies on the data stored in the GDG[x] Hub.

**List of events**
Organizers can use URLs like [gdg.events/devfest/events](https://gdg.events/devfest/events) to promote DevFest events.

There is no need for organizers to clone this repo or host this project on their servers.

Contribute
=================

Get involved: [![Join the chat at https://gitter.im/gdg-x/firefly](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/gdg-x/firefly?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Discuss [issues](https://github.com/gdg-x/firefly/issues) and [pull requests](https://github.com/gdg-x/firefly/pulls).


Local Development
=================
1. Clone the git repository.
1. Create and customize `local.env.js` based on `local.env.sample.js`.
1. Define the **GOOGLE_API_KEY**: The API key for your project, available from the [Cloud Console](https://cloud.google.com/console)
  1. Create a new project then go to APIs & Auth->APIs, activate Google+ and Google Maps JavaScript v3 APIs.
  1. Go to APIs & Auth->Credentials. Add Credentials->API key->Browser key->Create (keep `Any referrer allowed` set).
1. `cd firefly`
1. `npm install`
1. `npm start`

Prod Deployment
===============
1. `cd firefly`
1. `npm install -g firebase-tools`
1. `firebase login`
1. `grunt`
1. `firebase deploy`
1. Check the server at https://gdg.events

###Contributors
See [list of contributors](https://github.com/gdg-x/firefly/graphs/contributors)

Maintainer: None.

######GDG Apps, GDG[x] is not endorsed and/or supported by Google, the corporation.

License
--------

    © 2013-2017 GDG[x]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
