# Case study: King James Bible
## Most positive sentence
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :+1:  | 12:43 Also that day they offered great sacrifices, and rejoiced: for<br>God had made them rejoice with great joy: the wives also and the<br>children rejoiced: so that the joy of Jerusalem was heard even afar<br>off. | **+25** |

## Most negative sentence
| :point_right: | Sentence | Score |
| ---- | ---- | ----- |
| :-1:  | 5:21 Ye have heard that it was said by them of old time, Thou shalt<br>not kill; and whosoever shall kill shall be in danger of the judgment:<br>5:22 But I say unto you, That whosoever is angry with his brother<br>without a cause shall be in danger of the judgment: and whosoever<br>shall say to his brother, Raca, shall be in danger of the council: but<br>whosoever shall say, Thou fool, shall be in danger of hell fire. | **-25** |

## Graph: Sentiment throughout the King James Bible
![A graph showing sentence sentiment throughout the King James Bible](graphs/kjb_over_time.png)

Graphing sentiment over the sentences of the text does not seem to reveal anything interesting.
A couple reasons this might be the case:
* The graph is at the wrong level - there are so many sentences that there is too much detail - in this specific case, getting the average per book might be a better idea. In other cases, per-chapter or similar division could fulfill the same purpose
* The text is too varied - covering many topics in a somewhat haphazard manner
* Not enough information is present - sentiment is there, but there is no context, so some kind of interactive graph might be useful, in which you can mouse-over various spikes to see the analysed sentence(s)

## Graph: Sentiment score distribution
![A graph showing sentence sentiment score distribution in the King James Bible](graphs/kjb_distribution.png)