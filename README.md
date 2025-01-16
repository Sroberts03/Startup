# Pong Remade
CS260 website startup

## Specification Deliverable

### Elevator Pitch

Experience the classic adventure of Oregon Trail reimagined for the web, combining nostalgic gameplay with modern enhancements. Challenge your skills as you lead your wagon party through treacherous terrain, resource shortages, and unexpected events, all while competing with players worldwide. With an integrated leaderboard, you can track your progress and see how you stack up against others in your quest to conquer the frontier. It's a fresh take on a timeless journey—strategic, educational, and endlessly replayable!

### Design

Login:
![Mock](Login.jpeg)

Start Button:
![Mock](StartGame.jpeg)

Game Play:
![Mock](PongGame.jpeg)

About:
![Mock](About.jpeg)

Leader Board:
![Mock](Scores.jpeg)

### Key Features

- Secure login over HTTPS
- Ability to store high scores and display them
- Ability to take mouse input and move pong board
- Ability for CPU to see the ball and hit it back

### Technologies

I am going to use the required technologies in the following ways:

- **HTML** - Uses correct HTML structure for application. 4 HTML pages. One for login, one for game play, one for about page, one for high scores.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login and game play interaction from user.
- **Service** - Backend service with endpoints for:
  - login
- **DB/Login** - stores users and scores.
- **WebSocket** - High scores are broadcast to all other users.
