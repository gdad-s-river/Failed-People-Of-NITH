Package.describe({
  name: 'nith-peeps',
});

Package.onUse(function (api) {

  api.use([

    // vulcan core
    'vulcan:core',

    // vulcan packages
    'vulcan:forms',
    'vulcan:accounts',
    'vulcan:forms-upload'

  ]);

  // api.addFiles('lib/stylesheets/style.scss');

  api.addAssets([
    'lib/static/nith.jpg'
  ], ['client']);

  api.mainModule('lib/server/main.js', 'server');
  api.mainModule('lib/client/main.js', 'client');

});
