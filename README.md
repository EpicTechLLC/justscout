# Just Scout

Just Scout is an FRC (FIRST Robotics Competition) scouting platform designed to streamline team collaboration, strategy development, and data-driven decision-making. The platform provides detailed robot profiles, statistics integration, and future-ready features like custom profiles and scouting tools.

---

## Features

- **Robot Profiles**: View detailed information about teams and their robots, including statistics from Statbotics.
- **Team Search**: Easily search for teams by number or name.
- **Custom Profiles** _(Coming Soon)_: Create and share personalized robot profiles with other teams.
- **Scouting Tools** _(Coming Soon)_: Enhance your scouting experience with robust and integrated tools.

---

## Installation

### Prerequisites

- **Node.js** (version 18.x or later)
- **npm** or **pnpm** (preferred)
- Firebase account and configuration file (for authentication and Firestore contact us for dev access)
- **Blue Alliance API Key**: Register for an API key at [The Blue Alliance API Key Registration](https://www.thebluealliance.com/apidocs).

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/just-scout.git
   cd just-scout
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up your Firebase configuration:

   - Create a `.env.local` file in the root of your project and add the following:

   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   NEXT_BLUE_ALLIANCE_API_KEY=your-blue-alliance-api-key
   ```

4. Run the development server:

   ```bash
   pnpm dev
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## Technology Stack

- **Frontend**: [Next.js](https://nextjs.org/) (React Framework)
- **UI Components**: [Material-UI](https://mui.com/)
- **Database**: Firebase Firestore
- **Styling**: Material-UI Theming
- **Third-Party Integration**: [Statbotics](https://www.statbotics.io/) for robot statistics, [The Blue Alliance API](https://www.thebluealliance.com/) for team data.

---

## Roadmap

- [x] Basic robot profiles with search functionality.
- [x] Google-based authentication.
- [ ] Custom profile creation and sharing.
- [ ] Scouting tools for match tracking and strategy.

---

## Contributing

We welcome contributions! To get started:

1. Fork the repository.
2. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request on the main repository.

---

## Issues

If you encounter any issues or have feature requests, please open an issue on our GitHub repository:

- [Open an Issue](https://github.com/EpicTechLLC/justscout/issues)
