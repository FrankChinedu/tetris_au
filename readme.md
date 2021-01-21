# Scope of the project

- ## About the Game
  - Bascially a multpiplayer tetris game where users from 2 to at least a 1000 can engage in a game of tetris and have fun. 

___ 

## Project work through


 ### Game Setting
  - a user can create a game and share the game code with friends
  - > TIME 
    - time base 
  - > mode
      - `championShip mode`: This is a multiplayer version where players are knocked out till the final winner is gotten. 
      - `straight mode`: Normal multiplayer version where a minimum of two players starts a game the first player the meet the game critaria wins. 
      - `last man standing mode` - a certain number of defined users is defined to enter this game
      - certain number of users for example would be 20 and then and elimination method occurs where players with the lowest score are removed from the game until the last man standing wins the game.

Tetris settings 
  - quick start 
  - score based or time based

Score based the user creates a game and sets the winning condition score based is the user sets an upper bound time at which the first player to get to that score wins of a player loses before the other player gets to that point the other player wins. User can set the minimum score and speed of the game.   
### GAME PROGRESS
   Game progress: Here we would have a real time display of people playing the game just scores and user name is displayed for the first iteration. Later other user can see other users game play real time.

  # NOTE:::
   -  user must be authenticated to create a join
   - any user can join without authentication (provide a username)


  # SOCKET LISTENERS - :::CLIENT:::
   > NEW GAME
   - after creating a new game emit `NEW_TETRIS_GAME_SESSION` pass the roomName and userName
   - create a listener for `TETRIS_GAME_SESSION_DATA` this would return the info for the game session
   - listen on `START_TETRIS_GAME_SESSION`

   > Joining a existing game session
   - emit an event `JOIN_TETRIS_GAME_SESSION` pass the roomName and userName
   - listen on `TETRIS_GAME_SESSION_DATA` to get game data
   - listen on `START_TETRIS_GAME_SESSION` 
   

  # GAME:::
   ### continue.