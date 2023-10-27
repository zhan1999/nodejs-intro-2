#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import { getWeather, getIcon } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const saveToken = async (token) => {
		
	if (!token.length){
		printError("Token not provided");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token saved');
	} catch (e) {
		printError(e.message);
	}
};

const saveCity = async (city) => {

	if (!city.length) {
		printError("City not specified");
		return;
	}
	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City saved');
	} catch (e) {
		printError(e.message);
	}
};


const getForecast = async () => {

	// console.log(process.env);

	try{
		const weather = await getWeather();

		// const columns = ['lon','lat','temp', 'temp_min', 'temp_max', 'pressure', 'humidity', 'speed', 'deg', 'country', 'Values'];
		// console.table(weather,columns);

		printWeather (weather, getIcon(weather.weather[0].icon));

		// console.log(weather);
	}
	catch (e) {
		if (e?.response?.status == 404) {
			printError('Wrong city');
		}
		else if (e?.response?.status == 401)
		{
			printError('Wrong token');
		}
		else {
			printError(e.message);
		}
	}
};


const initCLI = () => {
	const args = getArgs(process.argv)

	// console.log(process.env);

	if (args.h) {
		//help
		return printHelp();

	}
	if (args.s) {
		// save city
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
		// save token
	}
	//show weather
	return getForecast();
};

initCLI();
 
