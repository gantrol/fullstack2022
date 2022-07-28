# example-submission-repository


You may submit all the exercises of this course into the same repository, or use multiple repositories. If you submit exercises of different parts into the same repository, please use a sensible naming scheme for the directories.

One very functional file structure for the submission repository is as follows:

<pre>
part0
part1
  courseinfo
  unicafe
  anecdotes
part2
  phonebook
  countries
</pre>

Put the whole react repository of the project to each folder except the folder <i>node_modules</i>

## part1

- unicafe: a feadback app with simple state
- [anecdotes](https://www.comp.nus.edu.sg/~damithch/pages/SE-quotes.htm)

## part2

### tools

#### json-server

`npm install -g json-server`

```sh
npx json-server --port 3001 --watch db.json
```

### homework

- phonebook
- courseinfo

