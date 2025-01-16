# Oregon Trail Online
CS260 website startup

## Specification Deliverable

### Elevator Pitch

Experience the classic adventure of Oregon Trail reimagined for the web, combining nostalgic gameplay with modern enhancements. Challenge your skills as you lead your wagon party through treacherous terrain, resource shortages, and unexpected events, all while competing with players worldwide. With an integrated leaderboard, you can track your progress and see how you stack up against others in your quest to conquer the frontier. It's a fresh take on a timeless journey—strategic, educational, and endlessly replayable!

### Design

Login:
![Mock](login.jpeg)

Start Button:
![Mock](startGame.jpeg)

Game Play:
![Mock](gamPlay.jpeg)

About:
![Mock](about.jpeg)

Leader Board:
![Mock](leaderBoard.jpeg)

### Key Features

- Secure login over HTTPS
- Ability to store high scores and display them
- Simple animation

### Technologies

I am going to use the required technologies in the following ways:

- **HTML** - Uses correct HTML structure for application. 4 HTML pages. One for login, one for game play, one for about page, one for high scores.
- **CSS** - Application styling that looks good on different screen sizes, uses good whitespace, color choice and contrast.
- **React** - Provides login and game play interaction from user.
- **Service** - Backend service with endpoints for:
  - login
- **DB/Login** - stores users and scores.
- **WebSocket** - High scores are broadcast to all other users.
