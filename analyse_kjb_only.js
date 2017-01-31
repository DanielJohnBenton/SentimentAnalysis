// A one-use adaptation of (a version of) 'analyse.js' to analyse the books of the King James Bible separately

"use strict";

let _fs = require("fs");

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
	text = text.split(" Jan.").join(" Jan");
	
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
		else if(character != " " && character != "\t")
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
	
	return sentences;
}

let books = ReadFile("kjb/kjb.txt").split("<BOOK>");
let sentencesPerBook = [];
let averagesPerBook = [];

for(let iBooks = 1, nBooks = books.length; iBooks < nBooks; iBooks++)
{
	let sentences = Analyse(books[iBooks]);
	let nSentences = sentences.length;
	
	let total = 0;
	let cSentimentSentences = 0;
	
	for(let iSentences = 0; iSentences < nSentences; iSentences++)
	{
		if(sentences[iSentences].score != 0) // only consider non-neutral/non-balanced sentences
		{
			total += sentences[iSentences].score;
			cSentimentSentences++;
		}
	}
	
	averagesPerBook.push(total / cSentimentSentences);
}

let bookNames = ["The First Book of Moses: Called Genesis", "The Second Book of Moses: Called Exodus", "The Third Book of Moses: Called Leviticus", "The Fourth Book of Moses: Called Numbers", "The Fifth Book of Moses: Called Deuteronomy", "The Book of Joshua", "The Book of Judges", "The Book of Ruth", "The First Book of Samuel", "The Second Book of Samuel", "The First Book of the Kings", "The Second Book of the Kings", "The First Book of the Chronicles", "The Second Book of the Chronicles", "Ezra", "The Book of Nehemiah", "The Book of Esther", "The Book of Job", "The Book of Psalms", "The Proverbs", "Ecclesiastes", "The Song of Solomon", "The Book of the Prophet Isaiah", "The Book of the Prophet Jeremiah", "The Lamentations of Jeremiah", "The Book of the Prophet Ezekiel", "The Book of Daniel", "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi", "The Gospel According to Saint Matthew", "The Gospel According to Saint Mark", "The Gospel According to Saint Luke", "The Gospel According to Saint John", "The Acts of the Apostles", "The Epistle of Paul the Apostle to the Romans", "The First Epistle of Paul the Apostle to the Corinthians", "The Second Epistle of Paul the Apostle to the Corinthians", "The Epistle of Paul the Apostle to the Galatians", "The Epistle of Paul the Apostle to the Ephesians", "The Epistle of Paul the Apostle to the Philippians", "The Epistle of Paul the Apostle to the Colossians", "The First Epistle of Paul the Apostle to the Thessalonians", "The Second Epistle of Paul the Apostle to the Thessalonians", "The First Epistle of Paul the Apostle to Timothy", "The Second Epistle of Paul the Apostle to Timothy", "The Epistle of Paul the Apostle to Titus", "The Epistle of Paul the Apostle to Philemon", "The Epistle of Paul the Apostle to the Hebrews", "The General Epistle of James", "The First Epistle General of Peter", "The Second General Epistle of Peter", "The First Epistle General of John", "The Second Epistle General of John", "The Third Epistle General of John", "The General Epistle of Jude", "The Revelation of Saint John the Devine"];

let output = "Book\tAverage score";

for(let iBooks = 0, nBooks = bookNames.length; iBooks < nBooks; iBooks++)
{
	output +="\n"+ bookNames[iBooks] +"\t"+ averagesPerBook[iBooks];
}

WriteFile("kjb_output.txt", output);











//Analyse(ReadFile(_config.inputFile));


























