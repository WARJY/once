const bodyParser = require('body-parser')
const { writeFile } = require('./once/server/index.js') 

module.exports = {
	devServer: {
		port: 8080,
	},
	configureWebpack: config => {
		config.devServer = {
			setup: function (app, server) {
				app.use(bodyParser.json())
				app.use(bodyParser.urlencoded({extended: false}))
				app.post('/generate/cases', async function (req, res) {
					let json = req.body
					await writeFile(json)
					res.send(true)
				})
			},
		}
	},
}
