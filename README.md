#Summary
In this visualization I wanted to show the overall trend in the amount of people using the internet across the world. I would also like to show that the United States, although much higher than the average, is not at the top of the list. There are many countries that have a higher percentage of people that use the internet over the United States. It is also interesting to see the leveling out of the curve for the United States, and the temporary decreases after around 2006.

#Design
The data involves a time series, so I decided to plot the data using a line chart. There are many countries included in the dataset, each representing a separate line. In order to focus the reader, I added 3 buttons to narrow the focus to a few points of comparison. I wanted to compare the trend of the United States (the place where the internet started), to the world average and to the top of the list. I did this by adding buttons to highlight these particular lines in the chart and allow for an easy comparison. I also added the ability to mouse-over any line to get the country name and most recent user data as a popup. 

#Feedback
Feedback #1:
I first plotted all the data using dimple.js and the result was a large number of lines in many different colors. The feedback here was that the lines looked a bit overwhelming and it was hard to focus on any particular trend within the plot. I decided to initially plot each line in a neutral color, and have the ability to scroll over each line to highlight the line and associated country. 

Feedback #2:
I then placed a few buttons for different regions: North America, Asia, Africa, etc... and before I put the functionality to selectively plot these regions I got feedback on the layout. The feedback received was that it lacked an interesting relationship. The test plots showed a relationship that was expected between the different regions. And with color-coded regions, the plot lacked focus and the colors were distracting. I decided to focus on the United States and show this trend in relation to the average, and to the country with the highest user percentage. I think many would expect the United States to be at or near the top of this list. Although the US is much higher than the average, there are many more countries that have a higher percentage of people that use the internet.

Feedback #3:
I replaced the buttons at the top to focus on the United States and sought feedback on this version. The feedback received was that the user data needed to be displayed somewhere on the plot. I decided to add this information to the pop-up text box that would appear when scrolling over a particular line.  

#Project:
https://jsfiddle.net/aehsaei/c91dzhn9/

#Files
Internet.js : (Submission) Javascript file containing D3 code <br>
Internet.html : (Submission) HTML file <br>
Internet.css : (Submission) CSS file <br>
InternetUsersDataDimple.html : First chart using Dimple <br>
DimpleGraph.png : Dimple chart <br>
InternetUsersDataFixedSmall.csv : Fixed format small set for testing <br>
InternetUsersDataFixed.csv : Fixed format set <br>
InternetUsersData.csv : Full dataset downloaded from World Bank <br>
P6_Make_An_Effective_Visualization.Rmd : R code + tidy data code <br>
P6_Make_An_Effective_Visualization.html : HTML report for Rmd

#Resources
https://bl.ocks.org/d3noob <br>
http://learnjsdata.com/group_data.html <br>
http://jsfiddle.net/maniator/Bvmgm/6/ <br>
https://apandre.files.wordpress.com/2011/02/ chartchooserincolor.jpg <br>
http://www.nikhil-nathwani.com/projects/saviors/saviors.html <br>
