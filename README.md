## Description

This service will run an API for managing library resources and users. The library catalog is visible to anyone, but users can also register and login to check out and return resources. Admin users can create, edit, or delete library resources as well.

## Starting the API

Run the following code in the command line to start the API:

```bash
$ npm run start
```

## Using the API

RESTful Routes:

The API is set to run on 'localhost:4000', unless a port is otherwise specified in process.env

I supposed a truly "RESTful" API would use the route "items" or "library-items" instead of "catalog", but this seemed more fitting in the context.

Unless otherwise specified, any data submitted in a POST, PATCH, or PUT request should be sent as raw JSON in the request body. Library item parameters should follow the format below:

{
  title: string,
  description: string,
  type: string,
  isAvailable: boolean (optional - defaults to true)
}

Request Type | Route | Action | Used For
-------------|-------|--------|---------
GET | '/catalog' | index action | index page to display all library items
POST | '/catalog' | create action | creates a new library item (restricted to admin)
GET | '/catalog/:id' | show action | displays one library item based on the ID in the url
PATCH | '/catalog/:id' | update action | modifies an existing library item based on the ID in the url (restricted to admin)
DELETE | '/catalog/:id' | delete action | deletes one article based on the ID in the url (restricted to admin)

Other catalog actions:

Request Type | Route | Used For
-------------|-------|---------
GET | '/catalog/search' | Search for library items based on matching properties. Search parameters should be sent as queries in the url. Use the key "by" to indicate which fields to search by (comma-separated if using multiple fields), and "value" to enter a comma-separated list of corrosponding values. Ex. '/catalog/search?by=id,title,description,isAvailable&value=idValue,titleValue,descriptionValue,isAvailableValue'. Id and isAvailable ("true" or "false") must match exactly. Title and description queries will find any item for which the matching string appears somewhere in it's title or description properties (not case-sensitive)
POST | '/catalog/:id/checkout' | User must be logged in. If the item matching the ID in the url is available, the item property "isAvailable" will be updated to false, and the item id will be added to the property "checkedOutItems" on the current user, and a confirmation message will be returned
POST | '/catalog/:id/return' | User must be logged in. If the item id is found in the "checkedOutItems" property of the current user, it will be removed, and the "isAvailable" property of the library item matching that id will be set to true

User routes:

Request Type | Route | Used For
-------------|-------|---------
POST | '/auth/register' | register new user. Send JSON in the body, matching the following format: { username: string, password: string, admin_code: string }  The admin_code property is optional, and will register the new user as an admin if it matches the string "makemeanadmin" (if deploying this app, update the property in users.service.ts to compare to a string found in the environment variables). Returns the id of the newly created user.
POST | '/auth/login' | Send JSON in the body matching the following format: { username: string, password: string } This will return a JWT access_key. To use the access key for user authentication, add a header key "Authorization" with value "Bearer &lt;access_key&gt;" (replace &lt;access_key&gt; with the value of the returned JWT access_key). Returns a confirmation message.
GET | '/profile' | User must be logged in. Displays the profile of the logged in user, including id, username, whether the user is an admin, and a list of ids of checked out items



## Goals for the future

- Add a "checkedOutTo" property on resources to track which user currently has the checked out item
- Expand the various types of resources to include videos and games. Each type would have it's own class as an extension of the basic LibraryItem model, with custom variables such as length, rating, and min and max players
  - Use a LibraryItemTypes enum to restrict the available options for item types upon creation
  - Restrict the ability to edit an item type once it is created. If you wanted to edit a video to be a book instead, you would have to delete the video and then create a book

<br><br><br><br>



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest
  
  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

  Nest is [MIT licensed](LICENSE).
