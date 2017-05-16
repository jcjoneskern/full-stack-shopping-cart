var app = angular.module("shoppingCart");
app.controller("cartController", function($scope, cartService) {
    // Start the form off empty on page load.
    $scope.formItem = {};

    // made this a function bc it was getting reused so often
    function updateCart() {
      cartService.getAllItems().then(function(items) {
          $scope.items = items;
          $scope.total = cartService.getTotal($scope.items);
      });
    }

    // Load the cart data on page load.
    updateCart();

    // Function on scope called when form is submitted.
    $scope.addItem = function(item) {
        cartService.addItem(item).then(function() {
            // Clear the form.
            $scope.formItem = {};

            // Update the list with the new set of items.
            updateCart();
        });
    };

    // Function on scope called when clicking Delete for an item.
    $scope.deleteItem = function(item) {
        cartService.deleteItem(item.id).then(function() {
            // Update the list with the new set of items.
            updateCart();
        });
    };

    $scope.switchStatus = function(item) {
      item.fields = (item.fields === "istable") ? "isform" : "istable";
    };

    // BONUS
    $scope.updateItem = function(item) {
      if (item.product == undefined || item.price == (undefined || 0) || item.quantity == (undefined || 0) ) {
        return false;
      } else {
        cartService.updateItem(item).then(function() {
          updateCart();
        });
      }
    };

});
