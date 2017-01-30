# :golf: Aims
- Score sentences in a source text by _POSITIVE_ or _NEGATIVE_ sentiment
- Find _best_ (most _POSITIVE_) and _worst_ (most _NEGATIVE_) sentences from the source text
- Plot sentence sentiment over time through the source text
- Plot sentence scores sorted from _best_ to _worst_ on a graph for distribution

# :telescope: Method
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

# :books: Analysis case studies
I mostly ran the analysis on public domain books from [Project Gutenberg] (https://www.gutenberg.org/). I also tried it out on movie scripts and a couple news articles. I am still adding to this section. :^)

<hr>
## :european_castle: Case study: The Complete Works of Shakespeare
### Most positive sentences
| :point_right: | Sentence | Score | Source |
| ---- | ---- | ----- | ----- |
| :+1:  | None here, he hopes,<br>In all this noble bevy, has brought with her<br>One care abroad; he would have all as merry<br>As, first, good company, good wine, good welcome,<br>Can make good people. | **+23** | _Henry VIII_ |
| :+1:  | O wonderful, wonderful, most wonderful wonderful, and yet<br>again wonderful, and after that, out of all whooping! | **+20** | _As You Like It_ |
| :+1:  | Tranio, since for the great desire I had<br>To see fair Padua, nursery of arts,<br>I am arriv'd for fruitful Lombardy,<br>The pleasant garden of great Italy,<br>And by my father's love and leave am arm'd<br>With his good will and thy good company,<br>My trusty servant well approv'd in all,<br>Here let us breathe, and haply institute<br>A course of learning and ingenious studies. | **+20** | _The Taming of the Shrew_ |

### Most negative sentences
| :point_right: | Sentence | Score | Source |
| ---- | ---- | ----- | ----- |
| :-1:  | Fear and be slain-no worse can come to fight;<br>And fight and die is death destroying death,<br>Where fearing dying pays death servile breath. | **-21** | _Richard II_ |
| :-1:  | Come down and welcome me to this world's light;<br>Confer with me of murder and of death;<br>There's not a hollow cave or lurking-place,<br>No vast obscurity or misty vale,<br>Where bloody murder or detested rape<br>Can couch for fear but I will find them out;<br>And in their ears tell them my dreadful name-<br>Revenge, which makes the foul offender quake. | **-21** | _Titus Andronicus_ |
| :-1:  |  I'll put't in proof,<br> And when I have stol'n upon these sons-in-law,<br> Then kill, kill, kill, kill, kill, kill! | **-20** | _King Lear_ |

### :bar_chart: Chart: Sentiment score distribution
![A chart showing sentence sentiment score distribution in Shakespeare's complete works](graphs/shakespeare_distribution_no_0.png)

<hr>
## :pray: Case study: King James Bible
### Most positive sentence
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :+1:  | 12:43 Also that day they offered great sacrifices, and rejoiced: for<br>God had made them rejoice with great joy: the wives also and the<br>children rejoiced: so that the joy of Jerusalem was heard even afar<br>off. | **+25** |

### Most negative sentence
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :-1:  | 5:21 Ye have heard that it was said by them of old time, Thou shalt<br>not kill; and whosoever shall kill shall be in danger of the judgment:<br>5:22 But I say unto you, That whosoever is angry with his brother<br>without a cause shall be in danger of the judgment: and whosoever<br>shall say to his brother, Raca, shall be in danger of the council: but<br>whosoever shall say, Thou fool, shall be in danger of hell fire. | **-25** |

### :bar_chart: Graph: Sentiment throughout the King James Bible
![A graph showing sentence sentiment throughout the King James Bible](graphs/kjb_over_time.png)

Graphing sentiment over the sentences of the text does not seem to reveal anything interesting.
A couple reasons this might be the case:
* The graph is at the wrong level - there are so many sentences that there is too much detail - in this specific case, getting the average per book might be a better idea. In other cases, per-chapter or similar division could fulfill the same purpose
* The text is too varied - covering many topics in a somewhat haphazard manner
* Not enough information is present - sentiment is there, but there is no context, so some kind of interactive graph might be useful, in which you can mouse-over various spikes to see the analysed sentence(s)

### :bar_chart: Chart: Sentiment score distribution
![A chart showing sentence sentiment score distribution in the King James Bible](graphs/kjb_distribution.png)
<hr>

## :christmas_tree: Case study: A Christmas Carol by Charles Dickens
### Most positive sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :+1:  | He became as good a friend, as good a<br>master, and as good a man, as the good old city knew, or<br>any other good old city, town, or borough, in the good old<br>world. | **+18** |
| :+1:  | And perhaps it was the pleasure the good Spirit had in<br>showing off this power of his, or else it was his own kind,<br>generous, hearty nature, and his sympathy with all poor<br>men, that led him straight to Scrooge's clerk's; for there he<br>went, and took Scrooge with him, holding to his robe; and<br>on the threshold of the door the Spirit smiled, and stopped<br>to bless Bob Cratchit's dwelling with the sprinkling of his<br>torch. | **+16** |
| :+1:  | Wonderful party, wonderful<br>games, wonderful unanimity, won-der-ful happiness! | **+15** |

### Most negative sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :-1:  | Not a latent echo in the house, not a squeak and scuffle<br>from the mice behind the panelling, not a drip from the<br>half-thawed water-spout in the dull yard behind, not a sigh among<br>the leafless boughs of one despondent poplar, not the idle<br>swinging of an empty store-house door, no, not a clicking in<br>the fire, but fell upon the heart of Scrooge with a softening<br>influence, and gave a freer passage to his tears. | **-13** |
| :-1:  | At one of these a lonely<br>boy was reading near a feeble fire; and Scrooge sat down<br>upon a form, and wept to see his poor forgotten self as he<br>used to be. | **-9** |
| :-1:  | He recoiled in terror, for the scene had changed, and now<br>he almost touched a bed: a bare, uncurtained bed: on which,<br>beneath a ragged sheet, there lay a something covered up,<br>which, though it was dumb, announced itself in awful<br>language. | **-9** |

### :bar_chart: Chart: Sentiment score distribution
![A chart showing sentence sentiment score distribution in A Christmas Carol](graphs/acc_distribution.png)
<hr>

## :hocho: Case study: War and Peace by Leo Tolstoy
### Most positive sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :+1:  | Every young man who came to the house—seeing those<br>impressionable, smiling young faces (smiling probably at their own<br>happiness), feeling the eager bustle around him, and hearing the fitful<br>bursts of song and music and the inconsequent but friendly prattle of<br>young girls ready for anything and full of hope—experienced the same<br>feeling; sharing with the young folk of the Rostóvs’ household a<br>readiness to fall in love and an expectation of happiness. | **+19** |
| :+1:  | Only it seems to me that Christian<br>love, love of one’s neighbor, love of one’s enemy, is worthier,<br>sweeter, and better than the feelings which the beautiful eyes of a<br>young man can inspire in a romantic and loving young girl like yourself. | **+18** |

### Most negative sentences
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :-1:  | Before partisan warfare had been officially recognized by the<br>government, thousands of enemy stragglers, marauders, and foragers had<br>been destroyed by the Cossacks and the peasants, who killed them off<br>as instinctively as dogs worry a stray mad dog to death. | **-18** |
| :-1:  | It was not Napoleon alone who had experienced that nightmare feeling<br>of the mighty arm being stricken powerless, but all the generals and<br>soldiers of his army whether they had taken part in the battle or not,<br>after all their experience of previous battles—when after one tenth of<br>such efforts the enemy had fled—experienced a similar feeling of terror<br>before an enemy who, after losing HALF his men, stood as threateningly<br>at the end as at the beginning of the battle. | **-16** |

### :bar_chart: Chart: Sentiment score distribution
![A chart showing sentence sentiment score distribution in War and Peace](graphs/wap_distribution.png)
<hr>

# :scissors: Technologies used
* Word/sentiment list: [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) ([paper](https://arxiv.org/pdf/1103.2903v1.pdf))
* Language: Javascript
* Environment: Node.js
* Graphs: Microsoft Excel
* Libraries: None

# :eggplant: Acknowledgements
* [AFINN](http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010) word-sentiment list ([paper](https://arxiv.org/pdf/1103.2903v1.pdf)) - Finn Årup Nielsen
* [Project Gutenberg] (https://www.gutenberg.org/)
* [Emoji cheat sheet] (http://www.webpagefx.com/tools/emoji-cheat-sheet/) - WebpageFX