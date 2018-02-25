angular.module('app', ['ngRoute', 'monospaced.qrcode'])

  .service('Tickets', function($http) {
      var self = this;
      this.fetch = function (orderUUID) {
        return $http
          .get("https://devternity-22e74.firebaseio.com/applications/" + orderUUID + "/tickets.json")
          .then(function(it) { 
            return it.data;
          });
      };
})

.config(function($routeProvider) {
  var fetchTickets = {
    tickets: function (Tickets, $route, $location) {
      return Tickets
        .fetch($route.current.params.orderUUID)
        .then(function(it) {
          if (!it) {
            $location.path("/")
          }
          return it;
          // return [
          //   {
          //     id: "865a12fb-b598-492f-9c04-4da28ede448a",
          //     title: "DevTernity 2018",
          //     event: "Main Day Pass",
          //     startsAt: "Friday 30th 2018",
          //     startsAtHint: "Registration starts at 8:00",
          //     location: "National Library of Latvia",
          //     locationHint: "Mūkusalas iela 3, Riga, Latvia",
          //     holder: {
          //       name: "Eduards Sizovs",
          //       email: "eduards@sizovs.net"
          //     }
          //   },
          //   {
          //     id: "865a12fb-b598-492f-9c04-33328ede448a",              
          //     title: "DevTernity 2018",
          //     event: "Crafting Code workshop apdp ad akd",
          //     startsAt: "Friday 30th 2018",
          //     startsAtHint: "Registration starts at 8:00",
          //     location: "National Library of Latvia",
          //     locationHint: "Mūkusalas iela 3, Riga, Latvia",
          //     holder: {
          //       name: "Eduards Sizovs",
          //       email: "eduards@sizovs.net"
          //     }
          //   },
          //   {
          //     id: "865a12fb-b598-492f-9c04-4da28ede448a",              
          //     title: "DevTernity 2018",
          //     event: "Main Day Pass",
          //     startsAt: "Friday 30th 2018",
          //     startsAtHint: "Registration starts at 8:00",
          //     location: "National Library of Latvia",
          //     locationHint: "Mūkusalas iela 3, Riga, Latvia",
          //     holder: {
          //       name: "Eduards Sizovs",
          //       email: "eduards@sizovs.net"
          //     }
          //   },
          //   {
          //     id: "865a12fb-b598-492f-9c04-4da28ede448a",              
          //     title: "DevTernity 2018",
          //     event: "Main Day Pass",
          //     startsAt: "Friday 30th 2018",
          //     startsAtHint: "Registration starts at 8:00",
          //     location: "National Library of Latvia",
          //     locationHint: "Mūkusalas iela 3, Riga, Latvia",
          //     holder: {
          //       name: "Eduards Sizovs",
          //       email: "eduards@sizovs.net"
          //     }
          //   },
          //   {
          //     id: "865a12fb-b598-492f-9c04-4da28ede448a",              
          //     title: "DevTernity 2018",
          //     event: "Main Day Pass",
          //     startsAt: "Friday 30th 2018",
          //     startsAtHint: "Registration starts at 8:00",
          //     location: "National Library of Latvia",
          //     locationHint: "Mūkusalas iela 3, Riga, Latvia",
          //     holder: {
          //       name: "Eduards Sizovs",
          //       email: "eduards@sizovs.net"
          //     }
          //   }                         
          // ]
        })
    }
  };

  $routeProvider
    .when('/', {
      templateUrl: 'missing.html'
    })
    .when('/:orderUUID', {
      controller:'ViewTickets as self',
      templateUrl: 'render.html',
      resolve: fetchTickets
    })
    .otherwise({
      redirectTo:'/'
    });
})

.controller('ViewTickets', function($location, $routeParams, tickets) {    
    if (!tickets) {
      return;
    }

    this.print = function() {
      window.print()
    }

    this.tickets = tickets;
});