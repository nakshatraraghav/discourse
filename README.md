# Discourse

## Fullstack Chat Application: Next 14 (App Router), React, Shadcn UI, Pusher, Prisma, Tailwind

A robust full-stack application, developed with Next.js 14, React, Pusher, Prisma, Tailwind, and PostgreSQL, the DiscordClone excels in real-time messaging and dynamic features like attachments and call channels. It offers advanced member management, invite generation, and optimized message loading using tanstack/query. TailwindCSS and Shadcn UI ensure an appealing and responsive UI, supporting light/dark modes. Seamless WebSocket fallbacks enhance the user experience. Prisma ORM manages MySQL databases via Planetscale, and authentication is handled through next-auth. Integrating nanoid, axios, and various libraries, the Discord clone prioritizes efficient development, establishing itself as a powerful and scalable communication platform.

## Deployment

This project has been deployed on [vercel](https://discourse-mauve.vercel.app/)

## Features

- **Real-time Messaging:**
  Utilizing Socket.io, the application ensures seamless and instantaneous communication between users.

- **Attachment Handling:**
  Employing UploadThing, users can send and receive attachments as messages within the platform.

- **Message Editing and Deletion:**
  Users have the ability to edit and delete messages in real-time, enhancing the overall interaction experience.

- **Multi-Channel Support:**
  The platform allows users to create Text, Audio, and Video call channels, providing diverse communication options.

- **One-on-One Conversations:**
  Facilitating direct interactions, the application supports private 1:1 text conversations between members.

- **Video Calls:**
  Enabling richer communication, the platform supports 1:1 video calls between members.

- **Member Management:**
  Offering control, administrators can kick members and change roles between Guest and Moderator.

- **Invite System:**
  The application incorporates a unique invite link generation system, ensuring a fully functional invitation mechanism.

- **Message Loading Optimization:**
  Implementing tanstack/query, messages load efficiently in batches of 10, optimizing user experience.

- **Server Customization:**
  Users can create and customize servers based on their preferences and needs.

- **UI Design:**
  Crafted with TailwindCSS and ShadcnUI, the platform boasts a visually appealing and user-friendly interface.

- **Responsiveness:**
  Ensuring a seamless experience, the UI is fully responsive, adapting to various screen sizes.

- **Light/Dark Mode:**
  Providing user choice, the platform supports both light and dark modes for personalized viewing.

- **WebSocket Fallback:**
  In case of WebSocket unavailability, the system seamlessly falls back to polling with alert notifications.

- **ORM Integration:**
  Prisma is integrated as the Object-Relational Mapping (ORM) tool, streamlining database interactions.

- **Database Management:**
  Leveraging Vercel Storage, the application manages its Postgres database efficiently.

- **Authentication System:**
  Secure user authentication is ensured through the integration of next-auth, enhancing platform security.

## Prerequisites

Node version `18.x.x` and above

## Package Manager:

Pnpm has been chosen as the package installer. This decision was made due to its efficient package linking and faster installation compared to other package managers

## Installation

To install and locally run this app, follow these steps

1. Clone the repository

```bash
git clone https://github.com/nakshatraraghav/discourse
```

2. Install dependencies: pnpm install

```bash
pnpm install
```

### Set Up Database

This app requires a PostgreSQL database. You can use Docker to run a PostgreSQL container or use a managed Postgres instance

You have the flexibility to modify the Prisma schema, enabling the utilization of alternative databases according to your preferences.

1. Install Docker: [Docker Installation Guide](https://docs.docker.com/get-docker/).
2. Run the PostgreSQL container:

```bash
docker run --name postgres-container -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres
```

3. Add the database link to the .env file

### Run Database Migrations

To sync the postgres database with the current prisma schema run the command

```bash
pnpm migrate
```

### Populate the .env File

populate the environment file with the required variables for the project to work

## Design Choices

- **OAuth Providers**
  This project integrates authentication through next-auth and utilizes OAuth Clients via a credentials provider for authentication implementation.

- **Pusher.io**
  For socket implementation, this project utilizes Pusher Channels because Vercel runs Next.js on lambdas, which do not support long-running sockets. Visit the Pusher Console and generate the necessary credentials for this project.

- **Uploadthing**
  This project incorporates the UploadThing library from Ping Labs, optimizing file uploads for improved user interactions. The streamlined process ensures a seamless and user-friendly experience within the project. To proceed, visit the UploadThing console and generate tokens tailored for this application.

- **Livekit**
  Underlying this project is the integration of Livekit to facilitate video and audio chats, leveraging the power of WebRTC technology. Livekit serves as the engine driving the seamless implementation of video and audio communication features, enhancing the overall interactive experience within the project. The utilization of WebRTC, supported by Livekit, ensures robust and real-time communication capabilities, contributing to the project's comprehensive and immersive functionality.

## Setup the .env file

```bash
# env sample file

DATABASE_URL=""

NEXTAUTH_SECRET=""
NEXTAUTH_URL=""

DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""

UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""

NEXT_PUBLIC_PUSHER_APP_ID=""
NEXT_PUBLIC_PUSHER_KEY=""
PUSHER_SECRET_KEY=""
NEXT_PUBLIC_PUSHER_CLUSTER=""
PUSHER_CLUSTER=""

LIVEKIT_API_KEY=""
LIVEKIT_API_SECRET=""
NEXT_PUBLIC_LIVEKIT_URL=""
```

## Available Commands

| command   | description                                 |
| :-------- | :------------------------------------------ |
| `dev`     | Starts a development instance of the app    |
| `build`   | Generate a production ready optimized build |
| `lint`    | Run ESLint for code linting                 |
| `studio`  | Open Prisma Studio for database management  |
| `migrate` | Push database changes and regenerate Prisma |

## Available Makefile Commands

| command          | description                                     |
| :--------------- | :---------------------------------------------- |
| `start_database` | Starts a local docker-compose postgres instance |
| `start_database` | Stops the docker-compose postgres instance      |

## Project Dependencies

### Dependencies

- **@auth/prisma-adapter:** A Prisma adapter for authentication, providing a secure and efficient way to manage user authentication in the project.

- **@hookform/resolvers:** Resolvers for React Hook Form, enhancing form validation capabilities within the application.

- **@livekit/components-react:** React components for integrating with LiveKit, enabling real-time audio and video functionalities in the Discord clone.

- **@prisma/client:** Prisma's client library, facilitating database access and manipulation through a TypeScript-friendly interface.

- **@radix-ui/react-avatar:** A set of React components for avatars, used to enhance user profile representations in the UI.

- **@radix-ui/react-dialog:** A React dialog component, employed for creating interactive and responsive dialogs in the application.

- **@radix-ui/react-dropdown-menu:** A versatile dropdown menu component for React, enhancing user interaction and navigation within the project.

- **@radix-ui/react-icons:** A collection of React icons for common UI elements, contributing to a consistent and visually appealing design.

- **@radix-ui/react-label:** A React label component, utilized for improved form accessibility and structure in the user interface.

- **@radix-ui/react-scroll-area:** A customizable and performant scroll area component for React, enhancing the handling of scrollable content.

- **@radix-ui/react-select:** A flexible and accessible select component for React, enhancing user interaction in dropdown menus and selection fields.

- **@radix-ui/react-separator:** A React separator component, used for structuring and visually organizing content within the application.

- **@radix-ui/react-slot:** A React component for slotting content, providing a flexible and powerful mechanism for composing UI elements.

- **@radix-ui/react-toast:** A toast notification component for React, enhancing user feedback and interaction with asynchronous actions.

- **@radix-ui/react-tooltip:** A React tooltip component, employed for displaying informative and contextual tooltips in the user interface.

- **@t3-oss/env-nextjs:** A Next.js environment utility, assisting in the management of environment variables and configuration.

- **@tanstack/react-query:** A powerful data fetching and state management library for React, optimizing the handling of API calls and data caching.

- **@tanstack/react-query-devtools:** Devtools extension for React Query, offering enhanced debugging capabilities during development.

- **@uploadthing/react:** A React component for handling file uploads, utilized for sending attachments as messages within the Discord clone.

- **argon2:** A password hashing library utilizing the Argon2 algorithm, ensuring secure password storage and authentication.

- **axios:** A popular HTTP client for making API requests, utilized for efficient communication between the front-end and back-end of the application.

- **class-variance-authority:** A library for managing class variance, contributing to the organization and structure of the project's codebase.

- **clsx:** A utility for composing class names, simplifying the generation of dynamic and conditional class names in React components.

- **cmdk:** A utility library for creating and managing commands, enhancing the command-driven functionality of the application.

- **date-fns:** A comprehensive library for handling dates and times in JavaScript, contributing to date-related functionalities within the project.

- **livekit-client:** A client library for interacting with LiveKit, enabling seamless integration with real-time audio and video features.

- **livekit-server-sdk:** A server-side SDK for LiveKit, facilitating the development of server-related functionalities in the project.

- **lucide-react:** A collection of React components for Lucide icons, enhancing the visual representation of icons in the user interface.

- **nanoid:** A library for generating unique IDs, utilized for creating unique identifiers within the Discord clone.

- **next:** The Next.js framework, providing a powerful and flexible environment for building React applications.

- **next-auth:** A library for handling authentication in Next.js applications, simplifying the implementation of user authentication features.

- **next-themes:** A utility for handling themes in Next.js applications, contributing to the implementation of light and dark mode in the project.

- **pusher:** A library for real-time communication through WebSockets, employed for implementing real-time messaging features in the Discord clone.

- **pusher-js:** The JavaScript library for Pusher, used for client-side communication with the Pusher service.

- **query-string:** A library for parsing and formatting URL query strings, enhancing the handling of query parameters in the application.

- **react:** The React library, serving as the foundation for building the user interface of the Discord clone.

- **react-dom:** The ReactDOM library, providing the necessary tools for rendering React components in the browser.

- **react-dropzone:** A React component for handling file drops, used in the Discord clone for file upload functionality.

- **react-hook-form:** A library for managing forms in React, optimizing form validation and state management.

- **tailwind-merge:** A utility for merging Tailwind CSS classes, simplifying the composition of dynamic class names in the project.

- **tailwindcss-animate:** A Tailwind CSS plugin for adding animation utilities, contributing to the creation of animated UI elements.

- **uploadthing:** A library for handling file uploads in React, used for implementing attachment functionality in messages.

- **zod:** A TypeScript-first schema declaration and validation library, enhancing data validation and consistency in the project.

- **zustand:** A lightweight state management library for React, optimizing the management of application state and global variables.

## Contributing

Contributions are welcome! Here are the steps to contribute to the Sentrimetric API project:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/your-bug-fix-name`.
3. Commit your changes: `git commit -m 'Add some feature'` or `git commit -m 'Fix some bug'`.
4. Push to the branch: `git push origin feature/your-feature-name` or `git push origin bugfix/your-bug-fix-name`.
5. Submit a pull request to the `main` branch of the original repository.

Please make sure to update tests, if applicable, and adhere to the existing code style and guidelines.

## License

This project is licensed under the [MIT License](LICENSE).

Feel free to modify this README.md file to fit your project's specific details and requirements.
