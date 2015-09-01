'use strict';

angular.module('fireflyApp')
  .controller('ShorturlEventCtrl', function ($scope, $http, $routeParams, config) {
    var processEventData = function (data) {
      if (data.geo) {
        data.geo.latitude = data.geo.lat;
        data.geo.longitude = data.geo.lng;
        data.geo.zoom = 11;
        data.geo.options = {
          scrollwheel: false
        };
        data.geo.center = {
          latitude: data.geo.latitude,
          longitude: data.geo.longitude
        };
        delete data.geo.lat;
        delete data.geo.lng;
      }
      $scope.event = data;
      $scope.hubIp = config.HUB_IP;

      var chapterUrl = 'https://www.googleapis.com/plus/v1/people/' + $scope.event.chapter +
        '?fields=image&key=' + config.GOOGLE_API_KEY;
      $http.get(chapterUrl)
              .success(function (data) {
                $scope.image = data.image.url.replace('sz=50', 'sz=70');
              }
            );

      $http.jsonp(config.HUB_IP + 'api/v1/chapters/' + $scope.event.chapter + '?callback=JSON_CALLBACK')
              .success(function (data) {
                if (data.geo) {
                  data.geo.latitude = data.geo.lat;
                  data.geo.longitude = data.geo.lng;
                  delete data.geo.lat;
                  delete data.geo.lng;
                }
                $scope.chapter = data;
              }
            );
    };
    $http.get('/api/shorturl/' + $routeParams.hash).success(function(data) {
      $scope.shorturl = data;
      $scope.gdgeventsshorturl = 'http://' + config.DOMAIN + '/' + data.hash;
      $http.jsonp(config.HUB_IP + 'api/v1/events/' +
        data.event_id + '?callback=JSON_CALLBACK').success(processEventData); // jshint ignore:line
    });
  })
  .controller('ShorturlAnalyticsCtrl', function ($scope, $http, $routeParams, config) {
    $scope.referrers = {
      type: 'PieChart',
      options: {
        pieHole: 0.4
      },
      data: {
        'cols': [
    {id: 't', label: 'Referrer', type: 'string'},
    {id: 's', label: 'Hits', type: 'number'}
        ],
        'rows': []
      }
    };

    $scope.browsers = {
      type: 'BarChart',
      options: {
        animation: {
          duration: 300
        },
        legend: {
          numberFormat: '#'
        }
      },
      data: {
        'cols': [
    {id: 't', label: 'Browser', type: 'string'},
    {id: 's', label: 'Hits', type: 'number'}
        ],
        'rows': []
      }
    };

    $scope.countries = {
      type: 'GeoChart',
      options: {
        domain: 'IN'
      },
      data: {
        'cols': [
    {id: 't', label: 'Country', type: 'string'},
    {id: 's', label: 'Hits', type: 'number'}
        ],
        'rows': []
      }
    };

    $scope.platforms = {
      type: 'BarChart',
      data: {
        'cols': [
    {id: 't', label: 'Platform', type: 'string'},
    {id: 's', label: 'Hits', type: 'number'}
        ],
        'rows': []
      }
    };

    $http.get('/api/shorturl/' + $routeParams.hash).success(function(data) {
      var i, j, k, l;
      $scope.shorturl = data;
      $scope.shorturlBase = 'http://' + config.DOMAIN + '/';

      for (i = 0; i < $scope.shorturl.referrers.length; i++) {
        var ref = $scope.shorturl.referrers[i];
        $scope.referrers.data.rows.push({
          c: [
                      {v: ref.name },
                      {v: ref.hits }
                  ]
        });
      }

      for (j = 0; j < $scope.shorturl.browsers.length; j++) {
        var browser = $scope.shorturl.browsers[j];
        $scope.browsers.data.rows.push({
          c: [
                      {v: browser.name },
                      {v: browser.hits }
                  ]
        });
      }

      for (k = 0; k < $scope.shorturl.countries.length; k++) {
        var country = $scope.shorturl.countries[k];
        $scope.countries.data.rows.push({
          c: [
                      {v: country.name },
                      {v: country.hits }
                  ]
        });
      }

      for (l = 0; l < $scope.shorturl.platforms.length; l++) {
        var platform = $scope.shorturl.platforms[l];
        $scope.platforms.data.rows.push({
          c: [
                      {v: platform.name },
                      {v: platform.hits }
                  ]
        });
      }
    });
  });
