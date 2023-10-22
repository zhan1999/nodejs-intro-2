import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
	console.log(chalk.bgRed(` ERROR + ${error}`));
}
const printSuccess = (message) => {
	console.log(chalk.bgGreen(` SUCCEESS + ${message}`));
}

const printHelp = () => {
	console.log(dedent(
		`
		${chalk.bgCyan(' HELP ')}
		Without parameters - show weather
		-s [CITY] - set city
		-h - show help
		-t [API_KEY] - save token
		`
	));
}

export {printError, printSuccess, printHelp};

