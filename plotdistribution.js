// Just a lazy script to plot distribution

"use strict";

let __fs = require("fs");

function GetPlot(fileName)
{
	let file = __fs.readFileSync(fileName, "utf8").toString().split("\n");
	
	for(let i = 0; i < file.length; i++)
	{
		file[i] = file[i] - 0;
	}
	
	return file;
}

function Distribution(plot)
{
	plot.sort(
		function(a, b)
		{
			return b - a;
		}
	);
	
	let highest = plot[0];
	let lowest = plot[plot.length - 1];
	
	let distribution = [];
	let distributionLookup = [];
	
	for(let i = lowest; i <= highest; i++)
	{
		distributionLookup["_"+ i] = distribution.length;
		
		distribution.push(
			{
				score: i,
				count: 0
			}
		);
	}
	
	for(let p = 0; p < plot.length; p++)
	{
		distribution[distributionLookup["_"+ plot[p]]].count++;
	}
	
	return distribution;
}

let distribution = Distribution(GetPlot("plot.txt"));

let file = "score\tcount";

for(let i = 0; i < distribution.length; i++)
{
	file +="\n"+ distribution[i].score +"\t"+ distribution[i].count;
}

__fs.writeFileSync("distribution.txt", file, "utf8");