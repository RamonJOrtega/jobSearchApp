# Job Search App
View this app [live on Heroku!](https://job-search-app-edda6d82414c.herokuapp.com/).
Search for 4-day-workweek careers by company name, job keyword, or by browsing!

This mobile-first, web-based application makes calls to the free API at [4dayweek.io](https://4dayweek.io/).
The app lists all current companies offering positions with 4 day work weeks. (Usually over 100 jobs listed).
The home page fetches all companies with job openings to show a table of all company links sorted by most openings to least openings.
The dynamic route pages fetch the respective company icon and job title to show tables of all job titles links available at that company.
The app uses node, express, ejs, and axios dpendencies listed in the [package.json file](https://github.com/RamonJOrtega/jobSearchApp/blob/main/package.json).


## To Run the App on your local machine
1. Make sure node and npm are installed.
2. Clone the repository to your machine, and navigate to that directory.
3. Install dependencies by running `npm install` in the terminal.
4. Run `node index.js` in the terminal.
5. Open a browser and navigate to http://localhost:3000/.


### Home Page Shown Below
![alt text](https://github.com/RamonJOrtega/jobSearchApp/blob/main/public/img/appHome1.png)


### Home Page Instant Search Box Shown Below
![alt text](https://github.com/RamonJOrtega/jobSearchApp/blob/main/public/img/appHome.png)


### Company Result Page ShownBelow
![alt text](https://github.com/RamonJOrtega/jobSearchApp/blob/main/public/img/appHome3.png)
