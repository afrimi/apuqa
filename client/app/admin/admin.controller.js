'use strict';

(function() {

  class AdminController {
    user = {};
    submitted = false;
    constructor(User, $scope, $state, ngDialog) {
      // Use the User $resource to fetch all users
      this.users = User.query();
      this.ngDialog = ngDialog;
      this.User = User;
      this.$state = $state;
      this.newScope = $scope.$new();
    }

    openEdit = function(user) {
            this.ngDialog.open({ template: 'app/admin/admin.editUser.html', scope: this.newScope, className: 'ngdialog-theme-default', controller: this, data: user });
        }
        
        create(form) {
            this.submitted = true;

            if (form.$valid) {
                this.User.save(this.user)
                    .$promise.then(() => {
                        // Account created, reload the page
                        this.ngDialog.close();
                        this.$state.go(this.$state.current, {}, { reload: true });


                    }).catch(err => {
                        err = err.data;
                        this.errors = {};

                        // Update validity of form fields that match the mongoose errors
                        angular.forEach(err.errors, (error, field) => {
                            form[field].$setValidity('mongoose', false);
                            this.errors[field] = error.message;
                        });
                    });

                //});
            }
        }

        editUser(user) {
            this.User.edit({ id: user._id }, user)
                .$promise.then(() => {
                    // Account created, reload the page
                    this.ngDialog.close();
                    this.$state.go(this.$state.current, {}, { reload: true });

                });

        }

    delete(user) {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    }
  }

  angular.module('apuqaApp.admin')
    .controller('AdminController', AdminController);
})();
