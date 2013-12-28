angular.module('panelApp').controller('DebugCtrl', function DebugCtrl($scope, appDeps) {
  $scope.$on('poll', function () {
    appDeps.get(function (deps) {
      $scope.$apply(function () {
        $scope.deps = deps;
      });
    });
  });
});
