# CS349 W25 Demo Code

Code relating to lecture slides and in-class demos.

Most folders correspond with a set of slides posted on the course website. For example, code for the "Drawing" lecture is in the `drawing/` demo folder. Lecture demo slides will reference specific "sets" of demos, for example the "Drawing" lecture has demo slides with "drawable" in the title, these correspond to `drawing/src/drawable`. In some cases a specific function will be noted in the demo slides as well.

Demo code will be posted (or updated) shortly before each lecture.

**The course uses 🧰 SimpleKit, a simple imperative-style toolkit that runs in the browser.** We use it to show examples of UI toolkit architecture and it's used in the first two assignments.

See lecture demos for examples how to use SimpleKit, and see assignment write-ups for details how to setup SimpleKit for assignments.

## Setup

### Initialize SimpleKit Submodule 

You'll need to do this once after cloning the demo repo:

  1. Open a terminal and cd to the simplekit folder in the root of this repo (since it's a submodule, it initially appears empty)
  2. Initialize the git submodule using terminal command: `git submodule init`
  3. Perform the first update of the git submodule using: `git submodule update`
  
Now the simplekit folder will be populated to match the simplekit repo on GitHub, and you'll see the simplekit repo listed in the VS Code source control tab.

> 🛑 **DO NOT run `npm install simplekit` in demo code directories.** They're setup to use a local submodule. In your assignments you'll install the simplekit module from npm.

### Initialize Demo Directory

Each demo directory is a Node project that needs its packages installed after cloning. 

1. Execute `npm install` in the lecture demo folder you want to run (e.g. in `drawing/`). 
 
This installs Vite and other packages needed for that set of demos.

## Keeping Up to Date

During the term frequently "pull" the latest code from the public code repo. You call pull the main repo easily, but to also pull the SimpleKit submodule requires some setup and then using a terminal command. 

**Setup**: add a "pullall" command to your git config with this:

```sh
git config --global alias.pullall '!git pull && git submodule update --init --recursive'
```

**Updating**: pull the main repo and the simplekit submodule easily with one git command in the terminal:

```sh
git pullall
```

(Read this [Git documentation page](https://git-scm.com/book/en/v2/Git-Tools-Submodules) and this [StackOverflow post](https://stackoverflow.com/questions/4611512/is-there-a-way-to-make-git-pull-automatically-update-submodules) for more background.)

> 🟠 **You can pull the main repo using the VS Code Git user interface, but not the SimpleKit submodule.** Depending how you use the VS Code Git interface, you might pull SimpleKit changes that are out of sync with the main demo code repo. We recommend always using the "pullall" terminal command above.

> 🛑 **Avoid using VS Code git "autofetch" for the SimpleKit submodule.** For same reason as above.

