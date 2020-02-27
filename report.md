# Report for assignment 4

This is a template for your report. You are free to modify it as needed.
It is not required to use markdown for your report either, but the report
has to be delivered in a standard, cross-platform format.

## Project

Name: Mattermost

URL: https://github.com/mattermost/mattermost-server

Mattermost is an open source, private cloud, Slack-alternative.

## Onboarding experience

Did it build and run as documented?

See the assignment for details; if everything works out of the box,
there is no need to write much here. If the first project(s) you picked
ended up being unsuitable, you can describe the "onboarding experience"
for each project, along with reason(s) why you changed to a different one.

TODO: add more description

The first project we chose was Strongbox https://github.com/strongbox/strongbox, Strongbox is an OSS artifact repository manager with clear instructions (https://strongbox.github.io/developer-guide/building-the-code.html) on how to build the project. The project uses maven and all one had to do to build the project was to clone the repository and run ´´´mvn clean install´´´ in the local clone. The project has an active community and we were in touch with the developers whom were ready to assist us. In the end the issue proved a bit too complicated and we decided to change project.

The project we ended up working on was Mattermost, an open source and self hosted alternative to the messaging platform Slack. Mattermost has well documented information on how to run their project (https://developers.mattermost.com/contribute/webapp/developer-setup/). There were no trouble in building the project.

## UML class diagram and its description

Optional (point 1): Architectural overview.

Optional (point 2): relation to design pattern(s).

## Selected issue(s)

Title: Migrate 'components/user_settings/notifications' module and associated tests to TypeScript

URL: https://github.com/mattermost/mattermost-server/issues/13690

Migrate the code from Javascript to TypeScript for the files.

### Requirements affected by functionality being refactored

Optional (point 3): trace tests to requirements.

### Existing test cases relating to refactored code

### Test results

Overall results with link to a copy or excerpt of the logs (before/after
refactoring).

### Patch/fix

The fix can be copied or linked to (git diff).

Optional (point 4): the patch is clean.

Optional (point 5): considered for acceptance (passes all automated checks).

## Effort spent for discarded project 5.5h per person
 ( https://github.com/strongbox/strongbox/issues/1398 )
For each team member, how much time was spent in

1. plenary discussions/meetings;

Everyone: 1 hour

We found a project and issue that looked promising and proceeded to read documentation and set up.

3. reading documentation;
    
Everyone: 45 min

4. configuration and setup;
    
Everyone: 45 min

The project is rather large and took some time to set-up and some members had some issues that we had to figure out.

5. analyzing code/output;

Everyone: 3 hour
We all went through the documentation and tried to understand the code. We realized the issue was a bit too complex for us and decided to find a new issue.

## Effort spent for project 2

For each team member, how much time was spent in

1. plenary discussions/meetings;

Everyone: 2.5 hours

Took a while to find another project, which we looked for by going through different github repositories that had a lot of issues, good documentation and the 'good first issue' label. Once mattermost was found we started to read up on documentation and set it up.

2. discussions within parts of the group;

Gabriel: 2.5 hours

Discussed report writing with Kasper and typescript conventions in repository with Robin and Adam.

Kasper: 4.5 hours

Looking for new projects with Johan, discussed report writing with Gabriel and to find the actual issue to work on with Robin. 

3. reading documentation;

Gabriel: 3 hours

First off I looked through the mattermost [documentation](https://developers.mattermost.com/contribute/webapp/) to learn more about how the project is set up and how components and testing is done in the project which they described quite nicely. After this, I had to take a closer look at how typescript worked, to learn it basically, and related issues to see what the convention was when refactoring.

Kasper: 3 hours

I went through the same process as Gabriel.

4. configuration and setup;

To setup the Mattermost server:
- Docker CE was installed and configured
- Go was installed and added to PATH
- The repository was forked and cloned locally.

To setup the development environment, these dependencies were needed:
- node.js
- libpng

Gabriel: 1.5 hours

Kasper: 1.5 hours

It went quite smoothly for the most part, but we had some issues with getting the Docker environment to work properly. After reinstalling it and its dependencies it magically started working.

5. analyzing code/output;

Gabriel: 1.5 hours

Kasper: 1.5 hours

Analyzing relevant tests and code in order to add documentation for them and to figure out types to use for variables that require them.

6. writing documentation;

Gabriel: 4 hours

Kasper: 2 hours

Writing code documentation and report

7. writing code;

Gabriel: 5 hours

Not a lot of code had to be changed in my assigned file, just took a little bit for me to figure out how typescript properly worked. Most of my time was spent pair-programming with Kasper on the manage_auto_responder file.

Kasper: 6 hours

Mainly worked on manage_auto_responder file and manage_auto_responder.test file. Had to change proptypes to Props in manage_auto_responder file and move them outside of the function and update some parameters. There was some issue with some of the props and I had to get in touch with the developers whom gave me premission to add the props in autosize_textarea. Gabrial pair-programmed with me on manage_auto_responder.

8. running code?


For setting up tools and libraries (step 4), enumerate all dependencies
you took care of and where you spent your time, if that time exceeds
30 minutes.

## Overall experience

What are your main take-aways from this project? What did you learn?

Optional (point 6): How would you put your work in context with best software engineering practice?

Optional (point 7): Is there something special you want to mention here?