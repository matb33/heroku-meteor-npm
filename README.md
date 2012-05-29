# Heroku Meteor npm example

This repo contains a working example of a meteor application deployable to Heroku with npm dependencies (compiled).

This is accomplished by leveraging an [existing buildpack by Jordan Sissel](https://github.com/jordansissel/heroku-buildpack-meteor), but with some modifications. I've forked his repository and concatenated his compile script with the one from the nodejs buildpack. This was necessary since we're treating our Meteor project as an npm package (via package.json). This is best practice with Heroku.

Also, a specially tailored `package.json` is used to install our dependencies. In this example, I used bcrypt because its build process is unlike most other node modules -- this one has to be compiled:

## package.json

```
{
	"name": "heroku-meteor-npm",
	"version": "0.0.1",
	"engines": {
		"node": "0.6.x"
	},
	"dependencies": {
		"bcrypt": "0.5.0"
	},
	"scripts": {
		"install": "mv node_modules public/node_modules"
	}
}
```

The `name` and `version` properties are specific to your application. This is a regular package.json file, so all typical configuration options available are possible.

The `engines`.`node` property are required for this particular example due to `bcrypt` requirements (it needs 0.6 or greater).

The `scripts`.`install` is used to move installed node modules into the strange location that Meteor prefers: `public/`.

## Local installation

```
git clone git@github.com:matb33/heroku-meteor-npm.git
cd heroku-meteor-npm
npm install
meteor
```

## Heroku installation

Assuming you've installed locally already:

```
heroku create myappname --stack cedar
heroku config:add BUILDPACK_URL=https://github.com/matb33/heroku-buildpack-meteor.git
```

*I don't use the `--buildpack` option because I get a `! Resource not found` error with Jordan's (and my) buildpack.*

```
git push heroku master
```