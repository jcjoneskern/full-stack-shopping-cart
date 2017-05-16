var app = angular.module("shoppingCart");
app.service("cartService", function($http) {
    // Call the Node Server API to get all the items. Return a promise that
    // resolves to an array of products. (The promise should NOT resolve to the
    // entire response object.)
    this.getAllItems = function() {
        // GET /api/items

        // TODO Make the HTTP request to the server and return a promise.
      var promise = $http({
        method: 'GET',
        url: 'api/items'
      }).then(function(response) {
        items = response.data;

        items.forEach(function(item) {
          item.fields = "istable"
        });
        return items;
      }, function(error) {
        console.log(error);
      });
      return promise;
    };

    // BONUS
    this.getTotal = function(items) {
      var total = 0;
      items.forEach(function(item) {
        total += item.price * item.quantity;
      });
      return total;
    }
    // Call the Node Server API to add an item.
    // The item parameter will be an object, for example:
    // { product: "Apples", price: 1.89 }
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.addItem = function(item) {
        // POST /api/items
        // body -> { product: "...", price: ... }
        // TODO Make the HTTP request to the server and return a promise.


        var promise = $http({
          method: 'POST',
          url: '/api/items',
          data: {product: item.product, price: item.price, quantity: item.quantity}
        });
        return promise;
    };

    // Call the Node Server API to delete an item.
    // The itemId parameter will be the ID of the item to delete.
    // Return a promise that resolves when the request finishes. It doesn't
    // matter what the value of the promise is.
    this.deleteItem = function(itemId) {
        // DELETE /api/items/{ID}

        // TODO Make the HTTP request to the server and return a promise.
        var promise = $http({
          method: 'DELETE',
          url: 'api/items/' + itemId
        });
        return promise;
        //check syntax ofc
    };

    this.updateItem = function(item) {
        // DELETE /api/items/{ID}

        // TODO Make the HTTP request to the server and return a promise.
        var promise = $http({
          method: 'PUT',
          url: 'api/items/' + item.id,
          data: {product: item.product, price: item.price, quantity: item.quantity}
        });
        return promise;
        //check syntax ofc
    };

});
