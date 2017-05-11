var fs=require('fs');
fs.readdir(process.cwd(), function(err, files){
	console.log(' ');
	if(!file.length){
		return console.log('	\033[31m No files to show!\033[39m\n')
	}

	console.log('		Select which file or directory you want to see\n');
	function file(i){
		var fileName = files[i];

		fs.stat(__dirname+'/'+fileName, function(err, stat){
			if(stat.isDirectory()){
				console.log('		'+i+'	\033[36m'+fileName+'	/\033[39m');
			}else{
				console.log('		'+i+'	\033[90m'+fileName+'	\033[39m');
			}

			i++;
			if(i==files.length){
				console.log(' ');
				process.stdout.write('	\033[33mEnter your choice: \033[39m');
				process.stdin.resume();
				process.stdin.setEncoding('utf8');
			}else{
				file(i);
			}
		})
	}
	file(0)
})