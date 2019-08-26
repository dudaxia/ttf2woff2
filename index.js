var fs = require('fs');
var ttf2woff2 = require('ttf2woff2');
var path = require("path");

//解析需要遍历的文件夹
var filePath = path.resolve('./css/');

var distPath = filePath.replace("css",'dist');

var files = fs.readdirSync(filePath).filter(function (file) {
    return file.match(/.ttf/); // 排除非 ttf 文件，如 Vim 临时文件
});

console.log("需转换为woff2的文件数量为：",files.length);

// 同步方式
files.forEach(function(file,index){
	var fileName = file.replace(".ttf","");
	var fileItem = fs.readFileSync(filePath +'/'+ fileName+'.ttf');
	fs.writeFileSync(distPath +'/'+ fileName+'.woff2', ttf2woff2(fileItem));
	console.log("第"+(index+1) +"个转换完成")
})

// 异步还有问题
// files.forEach(function(file,index){
// 	(function(file,index){
// 		var fileName = file.replace(".ttf","");
// 		var fileItem = fs.readFile(filePath +'/'+ fileName+'.ttf',function(err,data){
// 			if(err){
// 				throw err;
// 			}else{
// 				console.log("index:",(index+1),data)
// 				// fs.writeFile(distPath +'/'+ fileName+'.woff2', ttf2woff2(fileItem));
// 			}
// 		});
// 		// fs.writeFile(distPath +'/'+ fileName+'.woff2', ttf2woff2(fileItem));
// 		// console.log("第"+(index+1) +"个转换完成")
// 	})(file,index);
// })
