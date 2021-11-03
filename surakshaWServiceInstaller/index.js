var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Z_count App Node Service',
  description: 'Webscoket service for Count APK',
  script: 'E:\\05computerprograming\\websockets\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

// Listen for the "start" event and let us know when the
// process has actually started working.
svc.on('start',function(){
  console.log(svc.name+' started!\nVisit http://192.168.0.6:3000 to see it in action.');
});

// Install the script as a service.
svc.install();