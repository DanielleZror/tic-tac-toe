curl -X POST http://localhost:8000/api/games/create 

curl -X POST http://localhost:8000/api/games/1/join -H "Content-Type: application/json" -d "{\"user\": \"danielle\"}"
curl -X POST http://localhost:8000/api/games/1/join -H "Content-Type: application/json" -d "{\"user\": \"amit\"}"

curl http://localhost:8000/api/games/1/status
curl http://localhost:8000/api/games/1/status/users/1
curl http://localhost:8000/api/games/1/status/users/2

//Tie - if user 1 start
curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 0}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 2}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 1}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 0}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 2}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 1}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 0}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 1}"

//user 1 won - if user 1 start
curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 0}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 1}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 1, \"y\": 1}"
curl -X POST http://localhost:8000/api/games/1/play/users/2 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 0}"

curl -X POST http://localhost:8000/api/games/1/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 2, \"y\": 2}"

// errors 

game not found
curl http://localhost:8000/api/games/6/status

user not found 
curl http://localhost:8000/api/games/1/status/users/5

After start playing - 
curl -X POST http://localhost:8000/api/games/create 

curl -X POST http://localhost:8000/api/games/2/join -H "Content-Type: application/json" -d "{\"user\": \"danielle\"}"
curl -X POST http://localhost:8000/api/games/2/join -H "Content-Type: application/json" -d "{\"user\": \"amit\"}"

out of range-
curl -X POST http://localhost:8000/api/games/2/play/users/1 -H "Content-Type: application/json" -d "{\"x\": 0, \"y\": 4}"

not your turn - if someone try to play two turns in a row

cell not empty
