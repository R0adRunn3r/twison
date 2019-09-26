# Twivan

Twivan is a story format for [Twine 2](http://twinery.org/2) that exports stories to JSON format to be used with alexa story engine. Forked and inspired from Twison story format

## Output

Here's an example of its output:

```json
{
    "passages": {
      "1": {
        "text": "Inizio storia tutto in ordine. [[Avanti->prossimo1]] o [[Indietro->prossimo1]]",
        "links": [
          {
            "link": "prossimo1",
            "set": "var1",
            "name": "Avanti",
            "pid": "2"
          },
          {
            "link": "prossimo1",
            "name": "Indietro",
            "pid": "2"
          }
        ],
        "name": "Inizio",
        "pid": "1"
      },
      "2": {
        "text": "Adesso c'è la variabile impostata. [[Prova if->condizione]] o [[vai avanti->fine1]]",
        "links": [
          {
            "link": "condizione",
            "name": "Prova if",
            "pid": "3"
          },
          {
            "link": "fine1",
            "name": "vai avanti",
            "pid": "4"
          }
        ],
        "name": "prossimo1",
        "pid": "2"
      },
      "3": {
        "text": "%IFPASSAGE% [[var1->fineok]] [[default->fine no]]",
        "links": [
          {
            "link": "fineok",
            "unset": "var1",
            "name": "var1",
            "pid": "5"
          },
          {
            "link": "fine no",
            "name": "default",
            "pid": "6"
          }
        ],
        "ifpassage": true,
        "name": "condizione",
        "pid": "3"
      },
      "4": {
        "text": "Fine nulla di fatto",
        "name": "fine1",
        "pid": "4"
      },
      "5": {
        "text": "hai la variabile ma ti è stata tolta",
        "name": "fineok",
        "pid": "5"
      },
      "6": {
        "text": "non ce l'hai",
        "name": "fine no",
        "pid": "6"
      }
    },
    "name": "Testiamo Engine",
    "startnode": "1",
    "creator-version": "2.2.1",
  }
```


## Usage of variables and ifpassages
If you need to set a variable (es: var1) on a link just use `%%var1%%` on the link text like `[[%%var1%% Go south->south]]`. If you want to unset a variable just use a esclamation mark in front of it like `[[%%!var1%% Go south->south]]`. Attention: never use the variable `default` as this is used ad a default path for the if passages. As variables name use only alfanumerical characters and `_ -`.

If you want to create a if passages (a passages used to put a condition based on setted variables) just create a normal passage in twine and insert in the passage text `%IFPASSAGE%` and as many link as you need, every link is a check on a variable. For esample this if passage:

```
%IFPASSAGE% [[var1->passage_3]] [[var2->passage_5]] [[default->end_game]]
```

if `var1` is setted the game next passage will be `passage_3`, if none of the variables is set the default path is taken to the passage `end_game`. Pay attenction, if both var1 and var2 are setted you can not predict exactly whitch path will be followed so if something like this can happen just use more consecutives if passages.

You can also unset variables in if passages links just like this:

```
%IFPASSAGE% [[%%!var1%%var1->passage_3]] [[var2->passage_5]] [[default->end_game]]
```

in this way if var1 is setted the passage_3 will follow and the var1 will be unsetted


## Development

If you want to modify or test Twivan:

1. Clone this repo and run `npm install` to install dependencies.
2. Make your changes to the unminified code in the `src` folder
3. Run `node build.js` to compile your source into a `format.js` file that Twine 2 can understand. Alternatively, you can run `node watch.js` to watch the `src` directory for changes and auto-recompile every time you save.


### Testing your changes locally

Running `npm start` will start the `watch.js` auto-compile behavior, and also start a local web server that serves the compiled `format.js` file. By default, this will be available at `http://localhost:3000/format.js`. Add that URL as a story format to your copy of Twine 2; every time you save a source file and then re-generate the "Play" view of your story in Twine, it should use the latest version of your code.

This is easier to do with the browser-based version of Twine 2 than with the downloadable copy, as you can just refresh your output page and it'll use the latest version of Twison.


All contributions are welcome! If making code changes, please be sure to run the test suite (`npm test`) before opening a pull request. -----TEST SUITE NEEDS TO BE REWORKED------

## TODO:
- Make some kind of check for presence of default link on if passages
- Other correctiness check on used variables (Warnings)

## License

Twivan is licensed under the MIT license. See the LICENSE file for more information.
