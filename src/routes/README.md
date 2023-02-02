# Finance Tracker App Routes

## Public Routes

Public routes are public facing routes — they are not protected by authentication.

These are routes that users who aren't signed in are able to see.

**Examples:**

- `/` - the home page
- `/about` - the about page
- `/signup` - the signup page

## Private Routes

Private routes are protected by authentication. Only logged in users will be able to see these routes.

For greater user clarity, these routes are also prefixed with `/app`.

**Examples:**

- `/app/dashboard` - the dashboard page
- `/app/transactions` - the transactions page
- `/app/settings` - the account settings page
