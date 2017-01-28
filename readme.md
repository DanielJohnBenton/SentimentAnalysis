# Goals
- Score sentences in a source text by _POSITIVE_ or _NEGATIVE_ sentimentality
- Find _best_ (most _POSITIVE_) and _worst_ (most _NEGATIVE_) sentences from the source text
- Plot sentence sentiments over time through the source text
- Plot sentence scores sorted from _best_ to _worst_ on a graph for distribution

# Method
I used a file called [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) ([paper](https://arxiv.org/pdf/1103.2903v1.pdf)) which contains a list of words with a _POSITIVE_ or _NEGATIVE_ score.
It was made for analysing informal modern text (e.g. [Tweets](https://en.wikipedia.org/wiki/Twitter)) and contains slang, but I have mostly used it for old, public-domain texts and found it to be very reliable.

# Technologies used
* Word/sentiment list: [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) ([paper](https://arxiv.org/pdf/1103.2903v1.pdf))
* Language: Javascript
* Environment: Node.js
* Graphs: Microsoft Excel
* Libraries: None