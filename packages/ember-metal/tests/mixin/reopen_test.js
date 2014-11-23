import Mixin from 'ember-metal/mixin';

QUnit.module('Ember.Mixin#reopen');

test('using reopen() to add more properties to a simple', function() {
  var MixinA = Mixin.create({ foo: 'FOO', baz: 'BAZ' });
  MixinA.reopen({ bar: 'BAR', foo: 'FOO2' });
  var obj = {};
  MixinA.apply(obj);

  equal(Ember.get(obj, 'foo'), 'FOO2', 'mixin() should override');
  equal(Ember.get(obj, 'baz'), 'BAZ', 'preserve MixinA props');
  equal(Ember.get(obj, 'bar'), 'BAR', 'include MixinB props');
});

test('using reopen() and calling _super does not cause infinite recursion', function(){

  var Taco = Ember.Object.extend({
    createBreakfast: function(){
      this._super.apply(this, arguments);
      return "Breakfast";
    }
  });


  Taco.reopen({
    createBreakfast: function(){
      return this._super.apply(this, arguments);
    }
  });

  var taco = Taco.create();

  var result;
  Ember.run(function(){
    try {
    result = taco.createBreakfast();
    } catch (e) {
      result = "Oatmeal :( This should not error.";
    }
  });

  equal(result, "Breakfast!");
});

