angular.module('app').factory('$auth', function($http, $talk, $state){
  return {
    storeToken: function(token){
      localStorage.token = token;
    },
    token: function(){
      return localStorage.token;
    },
    attempt: function(){
      var self = this;
      if(self.token()){
        console.log("attempting to login");
        self.me();
      }
    },
    logout: function(){
      this.user = null;
      localStorage.removeItem('token');
    },
    user: null,
    list: function(page){
      return $talk.get('listing');
    },
    me: function(id){
      var self = this;
      return $talk.get('auth/me').then(function(user){
        self.user = user;
      });
    },
    register: function(user){
      return $talk.post('auth/register', user);
    },
    login: function(username, password){
      var self = this;

      return $talk.post('auth/login', {username: username, password: password}).then(function(user){
        if(user._id && user.token){
          self.user = user;
          self.storeToken(user.token);
          console.log(user);
          $state.go('home')
        }else{
          throw user;
        }
      });
    }
  };
});
