# CIRCLE

CIRCLE is a social media web application built with React, TypeScript, and Vite. It provides authentication, a personalized feed, post management, comments, likes, bookmarks, sharing, following, profile features, and post details.

## Features

- User registration and sign in
- Protected routes for authenticated users
- Feed with posts from the API
- Create, edit, and delete posts
- Like and bookmark posts
- Share posts
- Follow and unfollow users
- Who to Follow suggestions
- Create, edit, and delete comments
- View post details
- User profile and user posts
- Update profile photo
- Change password
- Form validation with Zod and React Hook Form
- Loading and error states
- Responsive dark UI

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- TanStack React Query
- HeroUI
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React

## API

CIRCLE uses the Route Posts API for authentication, posts, comments, users, and profile operations.

API base URL:

https://route-posts.routemisr.com

The application stores the authentication token in localStorage and sends it with authenticated API requests.

## Project Structure

```text
src/
├── assets/
├── components/
│   ├── Post/
│   ├── Comment.tsx
│   ├── CommentFooter.tsx
│   ├── LoadingScreen.tsx
│   └── Navbar.tsx
├── contexts/
├── hooks/
├── interfaces/
├── layouts/
├── pages/
│   ├── profile/
│   ├── Feed.tsx
│   ├── SignIn.tsx
│   ├── SignUp.tsx
│   ├── WhoToFollow.tsx
│   └── NotFound.tsx
├── protectedRoutes/
├── routes/
├── schemas/
├── services/
├── types/
└── utils/
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Abdelrahmanrefaat20/Cricle.git
cd Cricle
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed by Vite.

## Available Scripts

### Development

```bash
npm run dev
```

Starts the Vite development server.

### Production Build

```bash
npm run build
```

Runs the TypeScript build and creates the production bundle.

### Lint

```bash
npm run lint
```

Runs ESLint across the project.

### Preview

```bash
npm run preview
```

Serves the production build locally.

## Routing

CIRCLE uses React Router with a hash router.

Main routes include:

```text
/signin
/signup
/
/profile
/posts/:postId
```

Authentication pages use protected authentication routes.

Application pages use protected routes so authenticated users have access to the main application.

## Authentication

The authentication system provides:

- Account registration
- User sign in
- Authentication state management
- Protected routes
- User profile data

After successful sign in, the API token is stored in localStorage:

```ts
localStorage.setItem("token", token);
```

The token is then included in authenticated API requests.

## Posts

Users can interact with posts through the feed.

Supported actions include:

- Create posts
- Edit posts
- Delete posts
- Like posts
- Bookmark posts
- Share posts
- Open individual post details

Post operations use Axios services connected to the Route Posts API.

## Comments

Users can interact with comments on posts.

Supported actions include:

- Create comments
- Edit comments
- Delete comments
- Load post comments

After comment mutations, React Query refetches the relevant post data.

## Following

CIRCLE provides user discovery and follow functionality through the Who to Follow section.

Users can:

- View suggested users
- Follow users
- Unfollow users

## Profile

The profile section provides:

- User profile information
- User posts
- Profile photo updates
- Password changes

## Data Fetching

TanStack React Query manages server state throughout the application.

The feed uses React Query to load posts and refetch data after mutations such as:

- Creating a post
- Editing a post
- Deleting a post
- Liking a post
- Bookmarking a post
- Sharing a post
- Creating a comment
- Editing a comment
- Deleting a comment

The Who to Follow section uses a separate query to retrieve user suggestions.

## Form Validation

Authentication forms use:

- React Hook Form for form management
- Zod for validation
- HeroUI components for the interface

This keeps validation logic separate from the UI components.

## UI

The application uses a dark interface with a teal accent color.

Main UI technologies:

- Tailwind CSS
- HeroUI
- Lucide React
- Framer Motion

The layout is responsive and adapts to different screen sizes.

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Author

Abdelrahman Refaat

GitHub:

https://github.com/Abdelrahmanrefaat20

Repository:

https://github.com/Abdelrahmanrefaat20/Cricle

