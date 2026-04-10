# Frontend Development Guidelines (React Application)

This document outlines best practices and rules for developing the React frontend application.

## 1. General Principles

-   **Component-Based Architecture:** Develop features as reusable, modular components.
-   **Unidirectional Data Flow:** Adhere to React's unidirectional data flow (props down, events up).
-   **Separation of Concerns:** Keep components focused on a single responsibility (e.g., presentational vs. container components).
-   **Readability & Maintainability:** Write clear, concise, and well-structured code.

## 2. Component Structure

-   **File Naming:** Use PascalCase for component files (e.g., `HomePage.jsx`, `RestaurantCard.jsx`).
-   **Folder Structure:** Organize components logically, typically by feature or type:
    -   `src/pages/`: Top-level components representing a full page/view (e.g., `HomePage.jsx`, `LoginPage.jsx`).
    -   `src/components/`: Reusable, smaller components (e.g., `RestaurantCard.jsx`, `Button.jsx`).
    -   `src/components/common/`: Very generic components used across the app (e.g., `Header.jsx`, `Footer.jsx`).
-   **Prop Types/TypeScript:** For better type checking and documentation, use PropTypes or TypeScript. (Currently, PropTypes are implicitly expected if not using TypeScript).
-   **Functional Components & Hooks:** Prefer functional components with React Hooks over class components for new development.

## 3. State Management

-   **Local Component State:** Use `useState` for state local to a single component.
-   **Side Effects:** Use `useEffect` for handling side effects like data fetching, subscriptions, or manually changing the DOM.
-   **Context API:** For sharing state across multiple components without prop drilling, use React's Context API (e.g., for authentication status, shopping cart).
-   **Global State Libraries (Optional):** For very complex applications, consider libraries like Redux, Zustand, or Recoil.

## 4. Routing (React Router DOM)

-   **Installation:** Ensure `react-router-dom` is installed.
-   **Setup:** Wrap the main `App` component with `BrowserRouter` (usually in `main.jsx`).
-   **Route Definition:** Define all routes using `<Routes>` and `<Route>` components in `App.jsx`.
-   **Navigation:** Use `Link` component for declarative navigation and `useNavigate` hook for programmatic navigation.
-   **Protected Routes:** Implement mechanisms for protecting routes based on authentication status and user roles (e.g., creating a `PrivateRoute` wrapper component or conditional rendering within `Route` elements).

## 5. API Interaction (Axios)

-   **Installation:** Ensure `axios` is installed.
-   **Centralized API Calls:** Consider creating a `src/services/api.js` or feature-specific service files (e.g., `src/services/restaurantService.js`) to centralize API request logic.
-   **Error Handling:** Implement robust error handling for API requests (e.g., `try-catch` blocks, displaying user-friendly error messages).
-   **Authentication:** Include authentication tokens (e.g., JWT from `localStorage`) in request headers for protected endpoints.

## 6. Styling

-   **CSS Framework:** **Bootstrap 5 is the standard for this project.** All new components and pages should use Bootstrap classes for styling, layout, and components.
-   **Utility-First:** Prioritize using Bootstrap utility classes (e.g., `mt-3`, `p-2`, `d-flex`) to minimize custom CSS.
-   **No Inline Styles:** Avoid using the `style` attribute in JSX. Refactor existing inline styles to use Bootstrap classes.
-   **Custom CSS:** If custom CSS is absolutely necessary, use CSS Modules (`[ComponentName].module.css`) to scope styles to a specific component and prevent conflicts.

## 7. Forms

-   **Controlled Components:** Use controlled components for form inputs where React state manages the input values.
-   **Validation:** Implement client-side form validation for immediate user feedback.
-   **Submission:** Handle form submission asynchronously, showing loading states and feedback messages.

## 8. Code Quality

-   **Linter:** Use ESLint for consistent code style and to catch potential errors.
-   **Formatter:** Use Prettier for automatic code formatting.
-   **Meaningful Naming:** Use clear and descriptive names for components, variables, and functions.
-   **Comments:** Add comments for complex logic or non-obvious functionality.
