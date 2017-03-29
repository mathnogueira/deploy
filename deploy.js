global.config = require('konfig')();
var ncp = require('ncp').ncp;

function deploy() {
	var source = config.deploy;
	for (var item in source) {
		upload(item);
	}
}

function upload(item) {
	ncp(config.deploy[item].origem, config.deploy[item].destino, (err) => {
 		console.log(err);
	});
}

deploy();