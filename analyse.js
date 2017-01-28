"use strict";

let _fs = require("fs");

/*
	Configurations:
	
	=== inputFile ===
	Source text e.g. a novel or movie script.
	Some sources will not work if they do not use the expected sentence separators (certain punctuation and line breaks).
	Some pre-sanitisation is advised on the source text - for example if it came from Project Gutenberg, remove the
	Project Gutenberg related text at the bottom. Also any introductions and other text that isn't part of the
	actual novel.
	
	=== outputFile ===
	This file will just contain sentiment scores in the desired order, and nothing else. Pasted into Excel to make
	a graph. Lazy. :^)
	WARNING - this will overwrite existing files of the same name!
	
	=== sort ===
	Use "ASC" or "DESC" or "NONE" - the console/file output will be sorted by sentiment score ascending or descending.
	Case insensitive.
*/
let _config = {
	inputFile: "kjb.txt",
	outputFile: "plot.txt",
	sort: "asc"
};

_config.sort = _config.sort.toUpperCase();

/*
	Defined (
		STRING type
	): BOOLEAN
	
	Returns 'TRUE' is the type is not "undefined", otherwise FALSE
*/
function Defined(type)
{
	return (type !== "undefined");
}

/*
	String.Contains (
		STRING str
	): BOOLEAN
	
	Returns 'TRUE' is String contains 'str' as a substring, otherwise FALSE
*/
String.prototype.Contains = function(str)
{
	return (this.indexOf(str) != -1);
}

/*
	ReadFile (
		STRING name
	): STRING
	
	Read a named file into a string
*/
function ReadFile(name)
{
	return _fs.readFileSync(name, "utf8").toString();
}

/*
	WriteFile (
		STRING name,
		STRING text
	): VOID
	
	Write 'text' to a file
*/
function WriteFile(name, text)
{
	_fs.writeFileSync(name, text, "utf8");
}

/*
	Words (
		STRING text
	): ARRAY [INTEGER index] = STRING
	
	Split (preferably sanitised) text by space into words
*/
function Words(text)
{
	return text.split(" ");
}

/*
	Sanitise (
		STRING text
	): STRING
	
	Sanitise text for optimal processing - only allowing certain characters, removing double-spaces, etc.
*/
function Sanitise(text)
{
	text = text.toLowerCase();
	
	text = text.split("\r").join(" ");
	text = text.split("\n").join(" ");
	
	text = text.split("--").join(" ");
	text = text.split(" st.").join(" ");
	
	let sanitised = "";
	
	let validNonSpace = "abcdefghijklmnopqrstuvwxyz-é";
	let lValidNonSpace = validNonSpace.length;
	let onSpace = true;
	
	for(let i = 0, l = text.length; i < l; i++)
	{
		let character = text.charAt(i);
		
		let isValid = false;
		
		for(let iValid = 0; iValid < lValidNonSpace; iValid++)
		{
			if(character == validNonSpace.charAt(iValid))
			{
				isValid = true;
				break;
			}
		}
		
		if(isValid)
		{
			sanitised += character;
			onSpace = false;
		}
		else if(!onSpace && character == " ")
		{
			sanitised +=" ";
			onSpace = true;
		}
	}
	
	return sanitised;
}

/*
	AfinnLookupArray (
	): ARRAY [STRING "_"+ word] = INTEGER
	
	Reads AFINN-111 file to return lookup array used to get the sentiment score of a given word
*/
function AfinnLookupArray()
{
	let afinnFile = ReadFile("AFINN-111.txt").split("\n");
	
	let lookup = [];
	
	for(let iAfinn = 0, cAfinn = afinnFile.length; iAfinn < cAfinn; iAfinn++)
	{
		if(afinnFile[iAfinn].split(" ").length == 1)
		{
			let parts = afinnFile[iAfinn].split("\t");
			
			lookup["_"+ parts[0]] = parts[1] - 0;
		}
	}
	
	return lookup;
}

/*
	Sentences (
		STRING text
	): ARRAY [INTEGER index] = STRING
	
	Split text into sentences using
		1. punctuation
		2. repeated new lines
*/
function Sentences(text)
{
	let sentenceEnds = ".?!",
		alphabet = "abcdefghijklmnopqrstuvwxyzé";
	
	text = text.split(" St.").join(" St");
	
	let sentences = [];
	
	let sentence = "";
	
	let newlinePileup = "";
	
	for(let iText = 0, lText = text.length; iText < lText; iText++)
	{
		let character = text.charAt(iText);
		
		sentence += character;
		
		/*
			Just consider any gap of more than one new line to indicate new sentence, as it
			shall otherwise annoyingly group a sentence with a title. Obviously this code
			will cause major issues with any text that is double spaced.
		*/
		let doubleNewline = false;
		
		if(character == "\n" || character == "\r")
		{
			newlinePileup += character;
			
			if(newlinePileup == "\r\n\r\n" || newlinePileup == "\n\n" || newlinePileup == "\r\r")
			{
				doubleNewline = true;
				
				newlinePileup = "";
			}
		}
		else
		{
			newlinePileup = "";
		}
		
		if(doubleNewline || sentenceEnds.Contains(character))
		{
			let sanitised = Sanitise(sentence);
			let containsLetter = false;
			
			for(let iAlphabet = 0, lAlphabet = alphabet.length; iAlphabet < lAlphabet; iAlphabet++)
			{
				if(sanitised.Contains(alphabet.charAt(iAlphabet)))
				{
					containsLetter = true;
					break;
				}
			}
			
			if(containsLetter)
			{
				sentences.push(
					{
						sentence: sentence,
						sanitised: sanitised
					}
				);
			}
			
			sentence = "";
		}
	}
	
	return sentences;
}

/*
	Analyse (
		STRING text
	): VOID
*/
function Analyse(text)
{
	let afinn = AfinnLookupArray();
	
	let sentences = Sentences(text);
	
	for(let iSentences = 0, nSentences = sentences.length; iSentences < nSentences; iSentences++)
	{
		let score = 0;
		
		let words = Words(sentences[iSentences].sanitised);
		
		for(let iWords = 0, nWords = words.length; iWords < nWords; iWords++)
		{
			if(Defined(typeof(afinn["_"+ words[iWords]])))
			{
				score += afinn["_"+ words[iWords]];
			}
		}
		
		sentences[iSentences].score = score;
	}
	
	if(_config.sort != "NONE")
	{
		sentences.sort(
			function(a, b)
			{
				let scoreDifference = ((_config.sort == "ASC") ? (b.score - a.score) : (a.score - b.score));
				
				return (scoreDifference || b.sanitised.length - a.sanitised.length);
			}
		);
	}
	
	let scores = "";
	for(let i = 0; i < sentences.length; i++)
	{
		scores += sentences[i].score +"\n";
		console.log("=====");
		console.log(sentences[i].sentence);
		console.log(sentences[i].score);
	}
	
	WriteFile(_config.outputFile, scores);
}

Analyse(ReadFile(_config.inputFile));