
# Dont Forget Your Recipe


Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


## 🚀 About The Team

Team 70: dont-forget-ur-password

**Contributors**

<a href="https://github.com/Harry-Guanqin-Wang/IT-Project/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Harry-Guanqin-Wang/IT-Project" />
</a>


| Name      | Email                             |
| :-------- | :-------------------------------- |
| [Terrance, Tianqi Wang](https://github.com/terrance2630) |  tww2@student.unimelb.edu.au |
| [Kevin, Bowen Fan](https://github.com/bowenfan-unimelb) |    bffa@student.unimelb.edu.au  |
| [Yung, Yung-Ching Lin](https://github.com/joycekyery) |   yungchingl@student.unimelb.edu.au |
| [Jerry, Ngoc Bao Luong](https://github.com/Jerry2108) |  ngocbaol@student.unimelb.edu.au |
| [Harry, Guanqin Wang](https://github.com/Harry-Guanqin-Wang) |   guanqinw@student.unimelb.edu.au |





## Product Requirement
> University of Melbourne: COMP30022 IT Capstone Project 
>
> Semester2, 2022

Personal Item Register


## Product Description
A website based application to track and share your recipes. You can create your own recipes here, label them into your own categories. You can also view and share recipes in our food-lover community, where users can rate and comment each other's favourite dishes. Last, don't forget to put on a red heart for recipes you like, so that they are tracked in your _personal kitchen_.  


## Documentation

We use Confluence 
[Confluence Team Space](https://dontforgeturpword.atlassian.net/wiki/spaces/TEAM70/overview)


## Architecture

![Architecture diagram](./resource/architecture.png)
## Usage

**Installtion**

The project us `yarn` as front-end package management tool, 
`npm` as back-end package management tool. Install dependecies independently

Install dependecies for front-end

```bash
  cd front-end
  yarn install
```
    

Install dependecies for back-end

```bash
  cd front-end
  npm install
```

To run the project, go to root folder and run:
```bash
  npm run dev
```
_This will start both frontend and backend concurrently_

**Build**

**Testing**
```bash
  npm test
```
## Configuration

**Environment Variable**

To run this project, you will need to add the following environment variables to your .env file

```bash
PORT=8000
DATABASE="mongodb+srv://Team70:<password>@cluster0.jebag76.mongodb.net/?retryWrites=true&w=majority"
DATABASE_COMPASS="mongodb+srv://<username>:<password>@cluster0.jebag76.mongodb.net/test"
ENVIRONMENT="dev"
COOKIE_SECRET="JHTKY"
EMAIL_USER="dontforgeturpassit@gmail.com"
EMAIL_USER_2="dontforgeturpassitproject@gmail.com"
EMAIL_PASS="cjgftypbhbsztldq"
EMAIL_PASS_2="123456ITPROJECT"
BASE_URL="https://localhost:8000/"
BASE_URL_FRONT_END = "http://localhost:3000/"
HOST=""
SERVICE="gmail"
GOOGLE_CLIENT_ID= "914962736427-uu26bqggursbbfg8kc381fpn60hu211b.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET= "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"
```

**HTTPS & CA**

add ... to your computer


## Deployment

To deploy this project run

```bash
  npm run deploy
```



## Contributing

_branches & ci cd_

