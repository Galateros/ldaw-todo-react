// Imports
const express = require('express');
const webRoutes = require('./routes/web');

// Express app creation
const app = express();

// Configurations
const appConfig = require('./configs/app');

// View engine configs
const exphbs = require('express-handlebars');
const hbshelpers = require("handlebars-helpers");
const multihelpers = hbshelpers();
const extNameHbs = 'hbs';
const hbs = exphbs.create({
  extname: extNameHbs,
  helpers: multihelpers
});
app.engine(extNameHbs, hbs.engine);
app.set('view engine', extNameHbs);
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', '*');
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods','*');
		return res.status(200).json({})
	}
	next();
})
// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/', webRoutes);

// App init
app.listen(appConfig.expressPort, () => {
  console.log(`Server is listenning on ${appConfig.expressPort}! (http://localhost:${appConfig.expressPort})`);
});
