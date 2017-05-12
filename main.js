var fs=require('fs'),
	stdin=process.stdin,
	stdout=process.stdout;
var stats=[];
var files;
function file(i){
	var fileName = files[i];

	fs.stat(__dirname+'/'+fileName, function(err, stat){
		stats[i]=stat;
		if(stat.isDirectory()){
			console.log('		'+i+'	\033[36m'+fileName+'/\033[39m');
		}else{
			console.log('		'+i+'	\033[90m'+fileName+'\033[39m');
		}

		if(++i==files.length){
			// console.log(' ');
			// process.stdout.write('	\033[33mEnter your choice: \033[39m');
			// process.stdin.resume();
			// process.stdin.setEncoding('utf8');
			read();
		}else{
			file(i);
		}
	})
}
function read(){
	console.log(' ');
	stdout.write('	\033[33mEnter your choice: \033[39m');
	stdin.resume();
	stdin.setEncoding('utf8');
	stdin.on('data', option);
}
function option(data){
	if(!files[Number(data)]){
		stdout.write('	\033[31mEnter your choice!: \033[39m');
	}else {
		stdin.pause();
		if(stats[Number(data)].isDirectory()){
			fs.readdir(__dirname+'/'+files[Number(data)], function(err, files){
				console.log(' ');
				console.log('		('+files.length+' files)');
				files.forEach(function(file){
					console.log('		-    '+file);
					console.log(' ');
				})
			})
		}else {
			fs.readFile(__dirname+'/'+files[Number(data)],'utf8', function(err,data){
				console.log(' ');
				console.log('\033[90m'+data+'\033[39m');
			})
		}
	}
}
fs.readdir(process.cwd(), function(err, _files){
	console.log(' ');
	if(!file.length){
		return console.log('	\033[31m No files to show!\033[39m\n')
	}
	files=_files;
	console.log('		Select which file or directory you want to see\n');

	file(0,files);
});

