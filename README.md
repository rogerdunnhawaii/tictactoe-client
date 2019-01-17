# This is a game of Tic-Tac-toe

## A) You will be able to do the following:

    1) Create a login
    2) Play a game of Tic-tac-toe
    3) Be able to see the past games you played (and possibly continue playing)
    4) Be able to sign out

## B) Pin your repository on GitHub as a Popular Repository - check

## C) Complete the repository Description field and Website field with a meaningful sentence description of the application and link to the live URL github image - check

## D) List technologies used: HTML, CSS, JavaScript, AJAX, JQuery - check

## E) Document your planning and tell a story about your development process and problem-solving strategy.

    1) wireframes
    2) user stories
    3) complete the Authorization steps
    4) complete the Games steps
    5) complete the Game logic
    6) figure out how to update/patch to api
    7) figure out how to hide/show things
    8) figure out how to make boxes clickable/non-clickable

## F) List unsolved problems which would be fixed in future iterations.

    1) unable to do multiplayer
    2) unable to login via fb or google

## G) Link to wireframes and user stories.

    1)  [Wireframes:](https://drive.google.com/open?id=1IErditU_ZYstidhZvdSClMKqOFDm9_xC "Wireframes")
      a) Register Page -
      ![alt text] (https://drive.google.com/file/d/1iDaQRpe7UKCHHrQHymIzUhiGuM6yXglc/view?usp=sharing "Register")
      b) Login Page -
      ![alt text] (https://drive.google.com/file/d/1qMIJmrukQlSVAcxScO4_96xFQGOaVo9y/view?usp=sharing "Login Page")
      c) Start Game Page -
      ![alt text] (https://drive.google.com/file/d/19bQWusGRMiyuG2wu4hwFYwQIeaXI2NEW/view?usp=sharing "Start Game Page")
      d) Coin Flip to decide who goes first Page -
      ![alt text] (https://drive.google.com/file/d/1PDDUZ4PEB1bwHB2DMMcqUxzgyCnbdyn1/view?usp=sharing "Coin Flip Page")
      e) TicTacToe grid page -
      ![alt text] (https://drive.google.com/file/d/15XZ-V0m9AM9iFvg4MZWjNk_nawNqENkc/view?usp=sharing "TicTacToe Grid")
      f) Winner Page -
      ![alt text] (https://drive.google.com/file/d/1qT16Ja_mSyY8ieW_YwNND87f6WXrmhtG/view?usp=sharing "Winner Page")

    2) User Stories:

    * As a player, I want to keep track of my games using my login
    + As a player, I want to choose a username to protect my email address and/or phone number
    - As a player, I want to be able to play as many games as I want
    + As a player, I want to see my past games I have vs others

## H) Technical Specifications

     1. Use a custom game engine written by you. - check
     2. Be a single-page application, no browser refresh. - check
     3. Render a game board in the browser. - check
     3. Switch turns between X and O (or whichever markers you select). 4. Tip: Assume player X is the first player to start the game. - check
     5. Visually display which side won if a player gets three in a row or show a draw if neither wins. - check
     6. Support playing multiple games, one at a time. - not sure
     7. Use jQuery for DOM manipulation and event handling.  - check
     8. Use AJAX for interacting with a provided API. - check

## I) API Specifications

 1. Create new games on the server. (CREATE)  - check
 2. Update a game by storing new moves. (UPDATE)  - check
 3. Visually display the results of retrieving game statistics, such as total games won by a user. (READ)  - check
 4. Give feedback to the user after each action.  - check

## J) Auth Specifications

 1. Signup with email, password, and password confirmation.  - check
 2. Login with email and password. - check
 3. Logout when logged in. - check
 4. Change password with current and new password. - check
 5. Signup and Signin must only be available to not signed in users. - check
 6. Logout and Change password must only be available to signed in users. - check
 7. Give feedback to the user after each action's success or failure. - check
 8. All forms must clear after submit success or failure - check

### K) DO NOT!!
  Your app must not:

     1. Delete your repository at any time or start over. - check
     2. Rely on refreshing the page for any functionality. - check
     3. Have any user-facing bugs. - check
     4. Display non-functional buttons, nor buttons that do not successfully complete a task. - check
     5. Show actions at inappropriate times (example: sign out button when not signed in). - check
     6. Forms not clearing at appropriate times (example: sign up form not clearing after success). - check
     7. Allow the same game to be played after a player has won or tied.-check
     8. Allow players to move in the same square more than once. -check
     9. Change players when an invalid move is made.
     10. Use alerts for anything.  - check
     11. Display errors or warnings in the console. - check
     12. Display debugging messages in the console. - check
