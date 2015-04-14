Installation
------------

The web application and tests should work equally well on Windows and Mac/Linux
with the following tools:

* [Java](https://java.com)
* [Git](http://git-scm.com)
* [Node.js / NPM](http://nodejs.org/)
* A (fairly) modern web browser. IE9+ on Windows. We recommend
  [Chrome](http://www.google.com/chrome/).

### Tools Installation

#### Java

Java is needed for Selenium integration tests and can be downloaded from
[java.com/download](https://java.com/download).

After download and installation, you should be able to run the following:

```
$ java -version
```

#### Git

The `git` version control client can be downloaded from
[git-scm.com/downloads](http://git-scm.com/downloads).

***Windows Note***: On Windows, make sure to select the following options
from the installer:

* "Select Components" &rarr; **Defaults**
* "Adjusting your PATH environment" &rarr; **"Run Git from the Windows Command Prompt"**
* "Configuring the line ending conversions" &rarr; **"Checkout as-is, commit Unix-style line endings"**

After download and installation, you should be able to run the following:

```
$ git --version
```

#### Node

The `node` JavaScript engine and `npm` package manager can be downloaded and
installed from [nodejs.org/download/](http://nodejs.org/download/).

After download and installation, you should be able to run the following:

```
$ node --version
$ npm --version
```


### Project Setup

After you have `git` and `node`/`npm`, you are ready to clone, install and run
this project!

#### Clone the Repo

Use `git` from the command line to clone this repository.

```
$ cd PATH_TO_REPOSITORIES
$ git clone https://github.com/FormidableLabs/full-stack-testing.git
```

which will create a `full-stack-testing` directory in `PATH_TO_REPOSITORIES`.

#### Install Dependencies

Now, install the `node` dependencies with `npm`:

```
$ cd full-stack-testing
$ npm install
```


### Verify!

If the above steps completed without any errors, you should be able to run the
internal `gulp` task runner checks to verify everything works:

```sh
# Mac/Linux/Windows
$ npm run-script check
```


### Browser Compatibility

The application and test samples should work for modern versions of Chrome,
Safari, and Firefox and Internet Explorer 9+. Earlier versions of IE could
be readily supported with a few underlying library changes, but for simplicity,
we've kept with a modern stack in this repository.
