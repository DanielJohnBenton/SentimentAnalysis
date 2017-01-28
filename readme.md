# Goals
- Score sentences in a source text by _POSITIVE_ or _NEGATIVE_ sentiment
- Find _best_ (most _POSITIVE_) and _worst_ (most _NEGATIVE_) sentences from the source text
- Plot sentence sentiment over time through the source text
- Plot sentence scores sorted from _best_ to _worst_ on a graph for distribution

# Method
## Scoring sentences
Sentences were split using common punctuation delimiters and double spaces. A sentence is scored as the total of the scores of its words, e.g.:

_We were happy(**+3** :+1:) with the excellent(**+3** :+1:) service, but the boring(**-3** :-1:) music made us uncomfortable(**-2** :-1:)._

**Sentence score: +1 :+1:**

## Scoring words
I used a file called [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) ([paper](https://arxiv.org/pdf/1103.2903v1.pdf)) which contains a list of words with a _POSITIVE_ or _NEGATIVE_ score.

Sentiment words have different scores to distinguish intensity - for example:

| :point_right: | Word | Score |
| ---- | ---- | ----- |
| :+1:  | outstanding | **+5** |
| :+1:  | fantastic | **+4** |
| :+1:  | delight | **+3** |
| :+1:  | advantage | **+2** |
| :+1:  | adequate | **+1** |
| :-1:  | alas | **-1** |
| :-1:  | upset | **-2** |
| :-1:  | violence | **-3** |
| :-1:  | catastrophic | **-4** |
| :-1:  | (expletives and racism) | **-5** |

It was made for analysing informal modern text (e.g. [Tweets](https://en.wikipedia.org/wiki/Twitter)) and contains slang, but I have mostly used it for old, public-domain texts and found it to be very reliable.

Unlisted words are scored **0**.

# Analysis
I mostly ran the analysis on public domain books from [Project Gutenberg] (https://www.gutenberg.org/). I also tried it out on movie scripts and a couple news articles.

### King James Bible
#### Most positive sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :+1:  | 12:43 Also that day they offered great sacrifices, and rejoiced: for<br>God had made them rejoice with great joy: the wives also and the<br>children rejoiced: so that the joy of Jerusalem was heard even afar<br>off. | **+25** |

#### Most negative sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :-1:  | 5:21 Ye have heard that it was said by them of old time, Thou shalt<br>not kill; and whosoever shall kill shall be in danger of the judgment:<br>5:22 But I say unto you, That whosoever is angry with his brother<br>without a cause shall be in danger of the judgment: and whosoever<br>shall say to his brother, Raca, shall be in danger of the council: but<br>whosoever shall say, Thou fool, shall be in danger of hell fire. | **-25** |

# Technologies used
* Word/sentiment list: [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) ([paper](https://arxiv.org/pdf/1103.2903v1.pdf))
* Language: Javascript
* Environment: Node.js
* Graphs: Microsoft Excel
* Libraries: None

# Acknowledgements
* [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) word-sentiment list ([paper](https://arxiv.org/pdf/1103.2903v1.pdf)) - Finn Årup Nielsen
* [Project Gutenberg] (https://www.gutenberg.org/)
* [Emoji cheat sheet] (http://www.webpagefx.com/tools/emoji-cheat-sheet/) - WebpageFX