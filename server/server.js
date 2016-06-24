var swig = require('swig')
var http = require('http')
var path = require('path')
var fs = require('fs')

codeDirBase = path.join(__dirname, 'code')
templateDirBase = path.join(__dirname, 'template')

http.createServer(function (req, res) {
	codeDir = path.join(codeDirBase, req.url + '.js')
	templateDir = path.join(templateDirBase, req.url + '.html')
	if (!fs.existsSync(codeDir)) {
		console.log(codeDir + ' does not exist')
		res.end()
		return
	}
	if (!fs.existsSync(templateDir)) {
		console.log(templateDir + ' does not exist')
		res.end()
		return
	}
	console.log('Executing ' + codeDir)
	console.log('Using template ' + templateDir)
	var result = require(codeDir).run()
	console.log(result)
	templ = swig.compileFile(templateDir)
	console.log(templ)
	res.end(templ(result))
}).listen(8080)