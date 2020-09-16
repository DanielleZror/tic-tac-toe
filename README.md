# Description
This is a node js server with api to tic tac toe game.
You can try the api with curl (like the examples) or your preffered http request alternative (postman for example)

The examples below are Window's oriented.

## How to run
```
git clone https://github.com/DanielleZror/tic-tac-toe.git
cd tic-tac-toe
npm install
npm start
```

After you run the server, it serves on port 8000


## Gameplay simulation -
1. Create a game
    ```
    curl -X POST http://localhost:8000/api/games/create 
    ```

2. Join a game - with user name in the body
    ```
    curl -X POST http://localhost:8000/api/games/1/join -H "Content-Type: application/json" -d "{\"user\":  \"danielle\"}"
    ```
    join second user
    ```
    curl -X POST http://localhost:8000/api/games/1/join -H "Content-Type: application/json" -d "{\"user\": \"amit\"}"
    ```
3. You can check the status of the game or the status of the user in the game. (every time you what)
    ```
    curl http://localhost:8000/api/games/1/status
    curl http://localhost:8000/api/games/1/status/users/1
    curl http://localhost:8000/api/games/1/status/users/2
    ```
4. After 2 players joind the game - you can start playing

    4.1 Case to Tie - if user 1 start
    ```
    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 0}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 2}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 1}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 0}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 2}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 1}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 0}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 2}"
    ```
    4.2 Case of user 1 won - if user 1 start
    ```
    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 0}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 1}"
    curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 0}"

    curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 2}"
    ```
## Errors (if you want to simulate)
### game not found
```
curl http://localhost:8000/api/games/6/status
```

### user not found 
```
curl http://localhost:8000/api/games/1/status/users/5
```

### After start playing - 
```
curl -X POST http://localhost:8000/api/games/create 

curl -X POST http://localhost:8000/api/games/2/join -H "Content-Type: application/json" -d "{\"user\": \"danielle\"}"
curl -X POST http://localhost:8000/api/games/2/join -H "Content-Type: application/json" -d "{\"user\": \"amit\"}"
```
#### out of bounds-
```
curl -X POST http://localhost:8000/api/games/2/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 4}"
```
#### not your turn - if someone try to play two turns in a row(if player 1 started)
```
curl -X POST http://localhost:8000/api/games/2/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"
```

#### cell not empty
```
curl -X POST http://localhost:8000/api/games/2/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"
curl -X POST http://localhost:8000/api/games/2/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"
```
