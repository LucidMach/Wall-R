<div align="center">

# Hey! 👋

![wall-r](/public/LoGo.png)

<div>

[![forthebadge](https://forthebadge.com/images/badges/made-with-typescript.svg)](https://forthebadge.com)

</div>

</div>

This is the home for source code of **Project--Wall-R**, an _IoT_ based _smart dustbin_ that has the following features

1. **live** update on _trash-level_ in a **Web DashBoard UI**
2. **auto travel** to **collection point** for _dumping/further waste management_

> this project is designed to be scalable

## Project Anatomy

this project is divided in 3 components

1. **UI**: the dashboard that a user
2. **Cloud**: the backend APIs that deal with user auth, data upload and modulation
3. **Thing**: the actual smart dustbin hardware and software

## Project File Structure

> if you'd love to dig through the code but have no idea where to start

the project structure is pretty much the nextjs-typescript template... with lot of boiler-plate/config files for various tools we used in the development process including:

1. **tailwindCSS** - for faster and more modular styling in components
2. **typescript** - for a javascript with a strict type system that catches a lot of common errors (undefined properties/wrongly typed inputs/etc )
3. **nextjs** - for production ready optimization (file sizes, etc) for react applications
4. **firebase-auth** - for the simplest way to implement google signin
5. **graphql** - for optimised HTTP APIs(no over/under-fetching)
6. **prisma** - for a modern way to interact with SQL database (typed auto-complete, live - browser preview )

**File Structure w/o Boilerplate/Template Code**

```
|--prisma							// database schema design
|  |--schema.prisma
|
|--graphql							// API code
|  |--schema.ts
|  |--resolvers.ts
|
|--pages							// JSON/rendered routes(URLs)
|  |--api
|  |  |--graphql.ts
|  |--index.tsx
|
|--components							// reusable parts of the UI
|   |--*.tsx
|   |--[*]Context.ts
|
|--ino							// arduino code
|  |--bots
|  |--nodemcu
|
|--public								// assets used in the project
```

## Part-1: Prisma

### Intro

The most vital function of any server/cloud application is the ability to efficiently store/retrieve data on a central record. (decentral systems don't make logical sense interms of efficiency)

This can be done using

1. SQL databases
2. NoSQL databases

for this project we decided to stick to SQL databases, despite prototyping our MVP on firebase, a NoSQL database due to the following reasons

1. NoSQL is schema-less, meaning the data we push can be of any format and we won't be prompted with any errors
2. generally NoSQL database design requires a lot more planning
3. SQL databases are relational databases
4. SQL databases are easier to maintain

while generally NoSQL databases are way more scalable than SQL databases, PostgreSQL is an SQL database that's just as scalable and hence the SQL database we're going with on this project

since manually writing SQL queries is a thing of the past(maybe except for learning SQL and writing some custom queries in super rare cases), we're using [Prisma](https://www.prisma.io/), an **ORM** that generates SQL queries from typescript dot notation code

### Database Design

considering the goal of the projects, we'd need 2 tables `bins/bots` and `users`. There are a few key points to keep in mind tho...

1. Each `user` can have multiple `bots`
2. Each `bot` can have multiplr `users`

hence the tables have a many-many relation ship and so a suitable data model would be:

<div align="center">

![prisma schema](/public/dbschema.png)

</div>

where `user_bots` table is a table that just keeps track of connections between `users` and `bots`

## Part-2: GraphQL

so now we have a database where we can persist data... but how do we access this data on a client like a web UI / mobile app

that's where an API comes into the picture. API is a piece of code that lets a server (which is connected/hosts a database) communicate with an client application

there are various approaches to building APIs for IoT applications especially as they require an event-based architecture

1. HTTP
   1. Short-Polling
   2. Long-Polling
   3. Server Sent Events
   4. WebHooks
2. MQTT
3. WebSockets

[for a deeper understanding on the topic, consider checking out this well written document by the wall-r team](https://www.notion.so/lucidmach/WALL-R-Waste-Allocation-Load-Lifter-Real-a99120e1aa8c410faf455ecd6cd3bd31)

while, MQTT is the most popular protocol for IoT application we aren't using it for the following reasons

1. poor developer experience (tools, documentation, etc)
2. built on a different architecure from web and the database, so requires work on integration with current arch

WebSockets are great for bi-directional communication (popularly used in chat applications, etc) and use HTTP in initial statges but

1. not very power efficient (client side)
2. currently slightly commplex to integrate with graphQL

HTTP is the simplest and most effective way to build APIs and with the introduction of SSE(Server Sent Events) it's better than most alternatives for building event-driven APIs

there are 2 HTTP API design approaches

1. **REST**: we manually write HTTP post/get/update/patch/delete requests to manipulate data on a database
2. **GraphQL**: uses a query language to request data over HTTP post requests

for this project we choose to go with graphQL, as we see it to the future of every API development... it's that good (developer experience & user experience)

here are our graphQL resolvers

1. **getUser Query**:

   1. finds user_id of user in our database from google account of the user (firebase-auth)
   2. creates a user in the database if gmail-id not present in the table

2. **updateBotFill Mutation**:

   1. updates ultrasonic sensor values to the appropriate bot table
   2. creates new bot in the table if specified bot doesn't exist in the table

3. **linkBotWithUser Mutation**: finds specified user and specified bot and creates a relation between both the bots by adding an entry in the user_bots table

4. **subUser Subscription**: tracks every change to a user’s dustbin state and updates UI 

## Part-3: NextJS Pages & Components

To build frontend of any web UI / dashboard, we only really need HTML, CSS, JavaScript, but the only problem is

1. gets really long really fast
2. tough to maintain
3. can't be reused effectively

so we're using reactjs(nextjs flavour) with tailwind-css to build fully reusable/modular components that can be used not only in multiple part of this project but also in multiple projects.

> this project is a SPA (single page application)

here're the list of components in the project

1. **SignIn**: the component that deals with "continue with google". interacts with firebase-auth for authenticating a user with google
2. **NavBar**: the components that displays user's google display picture(just indicates that authentication was successful)
3. **Dash**: the part of UI that displays corresponding bots from `Switcher`
4. **Switcher**: the part of UI that controls the bot being displayed and triggers **addBotForm**
5. **addBotForm**: a form that collects data for `linkUserWithBot GraphQL Mutation` and deals with making required API calls
6. **Bot**: the part of UI that styles data from bots into an SVG with a varying color
7. **Spinner**: the animation that is displayed whenever there is some loading

here's the list pages

1. **index**: renders `SignIn` if no user is signed in, `Spinner` if app is talking to firebase-auth to get user data, `Dash` when everthing is ready
