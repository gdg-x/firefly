'use strict';

angular.module('fireflyApp')
  .controller('ShorturlAnalyticsCtrl', function ($http, $routeParams, config) {
    var vm = this;

    vm.referrers = {
      type: 'PieChart',
      options: {
        pieHole: 0.4
      },
      data: {
        'cols': [
          {
            id: 't',
            label: 'Referrer',
            type: 'string'
          },
          {
            id: 's',
            label: 'Hits',
            type: 'number'
          }
        ],
        'rows': []
      }
    };

    vm.browsers = {
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

    vm.countries = {
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

    vm.platforms = {
      type: 'BarChart',
      data: {
        'cols': [
          {id: 't', label: 'Platform', type: 'string'},
          {id: 's', label: 'Hits', type: 'number'}
        ],
        'rows': []
      }
    };

    $http.get('/api/shorturl/' + $routeParams.hash).success(function (data) {
      var i, j, k, l;
      vm.shorturl = data;
      vm.shorturlBase = 'http://' + config.DOMAIN + '/';

      for (i = 0; i < vm.shorturl.referrers.length; i++) {
        var ref = vm.shorturl.referrers[i];
        vm.referrers.data.rows.push({
          c: [
            {v: ref.name},
            {v: ref.hits}
          ]
        });
      }

      for (j = 0; j < vm.shorturl.browsers.length; j++) {
        var browser = vm.shorturl.browsers[j];
        vm.browsers.data.rows.push({
          c: [
            {v: browser.name},
            {v: browser.hits}
          ]
        });
      }

      for (k = 0; k < vm.shorturl.countries.length; k++) {
        var country = vm.shorturl.countries[k];
        vm.countries.data.rows.push({
          c: [
            {v: country.name},
            {v: country.hits}
          ]
        });
      }

      for (l = 0; l < vm.shorturl.platforms.length; l++) {
        var platform = vm.shorturl.platforms[l];
        vm.platforms.data.rows.push({
          c: [
            {v: platform.name},
            {v: platform.hits}
          ]
        });
      }
    });
  });
