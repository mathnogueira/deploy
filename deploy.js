global.config = require('konfig')();
var ncp = require('ncp').ncp;
var git = require('git-rev');
var gitconfig = require('git-config');
var fs = require('fs');
var moment = require('moment');

function deploy() {
	var source = config.deploy.pastas;
	for (var item in source) {
		upload(item);
	}
	gerarLog();
}

function upload(item) {0
	ncp(config.deploy.pastas[item].origem, config.deploy.pastas[item].destino, (err) => {
		if (!err) {
			console.log(item + ' foi publicado com sucesso!');
		} else {
 			console.log('Erro ao publicar ' + item);
		}
	});
}

function gerarLog() {
	gitconfig((err, config) => {
		git.short((commit) => {
			config.commit = commit;

			git.branch((branch) => {
				config.branch = branch;
				log(config);
			});
		});
	});
	
}

function log(gitConfig) {
	var data = moment().format('DD/MM/YYYY HH:mm');
	var user = gitConfig.user.name;
	var commit = gitConfig.commit;
	var branch = gitConfig.branch;
	var entry = "[" + data + "] " + user + " publicou o commit #"+ commit +" da branch " + branch + " \r\n";
	console.log(git);
	fs.appendFile(config.deploy.log, entry, function(err) {
		if (err) {
			console.log('Erro ao gerar log!', err);
		}
	});
}

deploy();