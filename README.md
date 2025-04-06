#Folder Structure

```
Task
 |
 |--.github/workflows/main.yml
 |
 |--frontend/
 |    |
 |    |--public/
 |    |
 |    |--src/
 |    |   |
 |    |   |--assets/
 |    |   |
 |    |   |--components/
 |    |   |    |
 |    |   |    |--auth/
 |    |   |    |   |--AuthLayout.jsx
 |    |   |    |   |--Login.jsx
 |    |   |    |   |--Register.jsx
 |    |   |    |
 |    |   |    |--user/
 |    |   |    |   |--Layout.jsx
 |    |   |    |   |--Navbar.jsx
 |    |   |    |   |--Home.jsx
 |    |   |    |   |--Profile.jsx
 |    |   |    |   |--About.jsx
 |    |   |    |   |--Settings.jsx
 |    |   |    |
 |    |   |    |--Welcome.jsx
 |    |   |
 |    |   |--App.jsx
 |    |   |--App.css
 |    |   |--main.jsx
 |    |   |--output.css
 |    |   |--index.css
 |    |
 |    |--.gitignore
 |    |--eslint.config.js
 |    |--index.html
 |    |--package*.json
 |    |--vite.config.js
 |
 |--backend/
      |
      |--middleware/authMiddleware.js
      |
      |--models/User.js
      |
      |--routes/
      |   |--auth.js
      |   |--home.js
      |
      |--.gitignore
      |--package*.json
      |
      |--server.js
```

